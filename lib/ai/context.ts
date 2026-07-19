import { createHash } from "node:crypto";

import type { CompanyDetail, CompanyProduct } from "@/types/company";
import type { OneHopKnowledgeGraph } from "@/types/graph";

export type ApprovedCompanyResearchContext = {
  company: {
    aiRole: string | null;
    name: string;
    primaryCategory: string;
    secondaryCategories: string[];
    ticker: string;
  };
  contextVersion: string;
  dataGaps: string[];
  products: Array<{
    name: string;
    sourceReference: string | null;
    type: string;
  }>;
  relationships: Array<{
    relationshipType: string;
    sourceName: string;
    sourceType: string;
    targetName: string;
    targetType: string;
  }>;
};

type ApprovedCompanyResearchContextInput = {
  company: CompanyDetail;
  graph: OneHopKnowledgeGraph;
  products: CompanyProduct[];
};

const dataGaps = [
  "In-app market prices, historical prices, and financial metrics are outside the current hackathon scope.",
  "Only active high-confidence knowledge graph relationships are included.",
] as const;

export function createApprovedCompanyResearchContext({ company, graph, products }: ApprovedCompanyResearchContextInput): ApprovedCompanyResearchContext {
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const relationships = graph.edges
    .flatMap((edge) => {
      const source = nodesById.get(edge.sourceNodeId);
      const target = nodesById.get(edge.targetNodeId);

      return source && target
        ? [{
            relationshipType: edge.relationshipType,
            sourceName: source.name,
            sourceType: source.nodeType,
            targetName: target.name,
            targetType: target.nodeType,
          }]
        : [];
    })
    .sort((left, right) => left.relationshipType.localeCompare(right.relationshipType) || left.sourceName.localeCompare(right.sourceName) || left.targetName.localeCompare(right.targetName));
  const payload = {
    company: {
      aiRole: company.aiRole,
      name: company.name,
      primaryCategory: company.primaryCategory,
      secondaryCategories: company.secondaryCategories.map((category) => category.name).sort(),
      ticker: company.ticker,
    },
    dataGaps: [...dataGaps],
    products: products
      .map((product) => ({ name: product.name, sourceReference: product.sourceReference, type: product.productType }))
      .sort((left, right) => left.name.localeCompare(right.name)),
    relationships,
  };
  const hash = createHash("sha256").update(JSON.stringify(payload)).digest("hex").slice(0, 16);

  return { ...payload, contextVersion: `approved-company-context:${hash}` };
}
