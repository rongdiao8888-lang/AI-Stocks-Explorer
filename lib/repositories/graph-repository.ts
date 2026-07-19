import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { KnowledgeGraphEdge, KnowledgeGraphNode, KnowledgeGraphRelationship, OneHopKnowledgeGraph } from "@/types/graph";
import type { Database } from "@/types/database";
import { z } from "zod";

const graphRequestSchema = z.object({
  companyId: z.string().uuid(),
  maxEdges: z.number().int().min(1).max(100).default(50),
});

type GraphNodeRecord = {
  id: string;
  name: string;
  node_type: KnowledgeGraphNode["nodeType"];
  slug: string;
};

type GraphEdgeRecord = {
  confidence_level: KnowledgeGraphEdge["confidence"];
  id: string;
  relationship_type_id: string;
  source_node_id: string;
  target_node_id: string;
};

type DatabaseClient = SupabaseClient<Database>;

function mapNode(node: GraphNodeRecord): KnowledgeGraphNode {
  return {
    id: node.id,
    name: node.name,
    nodeType: node.node_type,
    slug: node.slug,
  };
}

export async function getOneHopGraphForCompany(input: { companyId: string; maxEdges?: number }, client?: DatabaseClient): Promise<OneHopKnowledgeGraph> {
  const { companyId, maxEdges } = graphRequestSchema.parse(input);
  const supabase = (client ?? await createSupabaseServerClient()) as DatabaseClient;
  const { data: companyNode, error: companyNodeError } = await supabase
    .from("knowledge_graph_nodes")
    .select("id, name, node_type, slug")
    .eq("entity_id", companyId)
    .eq("node_type", "company")
    .eq("is_active", true)
    .maybeSingle()
    .overrideTypes<GraphNodeRecord | null, { merge: false }>();

  throwOnRepositoryError(companyNodeError, "Unable to retrieve the company graph node.");

  if (!companyNode) {
    return { edges: [], nodes: [] };
  }

  const [{ data: sourceEdges, error: sourceEdgesError }, { data: targetEdges, error: targetEdgesError }] = await Promise.all([
    supabase
      .from("knowledge_graph_edges")
      .select("id, source_node_id, target_node_id, relationship_type_id, confidence_level")
      .eq("source_node_id", companyNode.id)
      .eq("is_active", true)
      .eq("confidence_level", "high")
      .limit(maxEdges)
      .overrideTypes<GraphEdgeRecord[], { merge: false }>(),
    supabase
      .from("knowledge_graph_edges")
      .select("id, source_node_id, target_node_id, relationship_type_id, confidence_level")
      .eq("target_node_id", companyNode.id)
      .eq("is_active", true)
      .eq("confidence_level", "high")
      .limit(maxEdges)
      .overrideTypes<GraphEdgeRecord[], { merge: false }>(),
  ]);

  throwOnRepositoryError(sourceEdgesError, "Unable to retrieve outgoing graph edges.");
  throwOnRepositoryError(targetEdgesError, "Unable to retrieve incoming graph edges.");

  const graphEdges = [...(sourceEdges ?? []), ...(targetEdges ?? [])];
  const deduplicatedEdges = Array.from(new Map(graphEdges.map((edge) => [edge.id, edge])).values()).slice(0, maxEdges);

  if (deduplicatedEdges.length === 0) {
    return { edges: [], nodes: [mapNode(companyNode)] };
  }

  const nodeIds = Array.from(new Set([companyNode.id, ...deduplicatedEdges.flatMap((edge) => [edge.source_node_id, edge.target_node_id])]));
  const relationshipTypeIds = Array.from(new Set(deduplicatedEdges.map((edge) => edge.relationship_type_id)));
  const [{ data: nodes, error: nodesError }, { data: relationshipTypes, error: relationshipTypesError }] = await Promise.all([
    supabase
      .from("knowledge_graph_nodes")
      .select("id, name, node_type, slug")
      .in("id", nodeIds)
      .eq("is_active", true)
      .overrideTypes<GraphNodeRecord[], { merge: false }>(),
    supabase
      .from("relationship_types")
      .select("id, name")
      .in("id", relationshipTypeIds)
      .eq("is_active", true)
      .overrideTypes<Array<{ id: string; name: string }>, { merge: false }>(),
  ]);

  throwOnRepositoryError(nodesError, "Unable to retrieve graph nodes.");
  throwOnRepositoryError(relationshipTypesError, "Unable to retrieve graph relationship types.");

  const relationshipTypesById = new Map((relationshipTypes ?? []).map((type) => [type.id, type.name]));
  const edges: KnowledgeGraphEdge[] = deduplicatedEdges.map((edge) => ({
    confidence: edge.confidence_level,
    id: edge.id,
    relationshipType: relationshipTypesById.get(edge.relationship_type_id) ?? "Related to",
    sourceNodeId: edge.source_node_id,
    targetNodeId: edge.target_node_id,
  }));

  return {
    edges,
    nodes: (nodes ?? []).map(mapNode),
  };
}

export async function listHighConfidenceGraphRelationships(limit = 24): Promise<KnowledgeGraphRelationship[]> {
  const maxEdges = z.number().int().min(1).max(100).parse(limit);
  const supabase = await createSupabaseServerClient();
  const { data: graphEdges, error: graphEdgesError } = await supabase
    .from("knowledge_graph_edges")
    .select("id, source_node_id, target_node_id, relationship_type_id, confidence_level")
    .eq("is_active", true)
    .eq("confidence_level", "high")
    .order("created_at", { ascending: true })
    .limit(maxEdges)
    .overrideTypes<GraphEdgeRecord[], { merge: false }>();

  throwOnRepositoryError(graphEdgesError, "Unable to retrieve ecosystem relationships.");

  if (!graphEdges?.length) {
    return [];
  }

  const nodeIds = Array.from(new Set(graphEdges.flatMap((edge) => [edge.source_node_id, edge.target_node_id])));
  const relationshipTypeIds = Array.from(new Set(graphEdges.map((edge) => edge.relationship_type_id)));
  const [{ data: nodes, error: nodesError }, { data: relationshipTypes, error: relationshipTypesError }] = await Promise.all([
    supabase
      .from("knowledge_graph_nodes")
      .select("id, name, node_type, slug")
      .in("id", nodeIds)
      .eq("is_active", true)
      .overrideTypes<GraphNodeRecord[], { merge: false }>(),
    supabase
      .from("relationship_types")
      .select("id, name")
      .in("id", relationshipTypeIds)
      .eq("is_active", true)
      .overrideTypes<Array<{ id: string; name: string }>, { merge: false }>(),
  ]);

  throwOnRepositoryError(nodesError, "Unable to retrieve ecosystem nodes.");
  throwOnRepositoryError(relationshipTypesError, "Unable to retrieve ecosystem relationship types.");

  const nodesById = new Map((nodes ?? []).map((node) => [node.id, mapNode(node)]));
  const relationshipTypesById = new Map((relationshipTypes ?? []).map((type) => [type.id, type.name]));

  return graphEdges.flatMap((edge) => {
    const source = nodesById.get(edge.source_node_id);
    const target = nodesById.get(edge.target_node_id);

    if (!source || !target) {
      return [];
    }

    return [{
      confidence: edge.confidence_level,
      id: edge.id,
      relationshipType: relationshipTypesById.get(edge.relationship_type_id) ?? "Related to",
      source,
      sourceNodeId: edge.source_node_id,
      target,
      targetNodeId: edge.target_node_id,
    }];
  });
}
