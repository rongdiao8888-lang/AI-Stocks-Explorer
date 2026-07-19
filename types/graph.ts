export type KnowledgeGraphNodeType =
  | "category"
  | "company"
  | "model"
  | "platform"
  | "product"
  | "technology";

export type KnowledgeGraphEdgeConfidence = "high" | "low" | "medium";

export type KnowledgeGraphNode = {
  id: string;
  name: string;
  nodeType: KnowledgeGraphNodeType;
  slug: string;
};

export type KnowledgeGraphEdge = {
  confidence: KnowledgeGraphEdgeConfidence;
  id: string;
  relationshipType: string;
  sourceNodeId: string;
  targetNodeId: string;
};

export type OneHopKnowledgeGraph = {
  edges: KnowledgeGraphEdge[];
  nodes: KnowledgeGraphNode[];
};

export type KnowledgeGraphRelationship = KnowledgeGraphEdge & {
  source: KnowledgeGraphNode;
  target: KnowledgeGraphNode;
};
