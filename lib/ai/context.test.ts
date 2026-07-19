import { describe, expect, it } from "vitest";

import { createApprovedCompanyResearchContext } from "./context";

const company = {
  aiRole: "AI Compute & GPU Acceleration",
  coverageTier: "tier_1" as const,
  description: null,
  exchange: null,
  id: "11111111-1111-4111-8111-111111111111",
  name: "NVIDIA",
  primaryCategory: "AI Infrastructure",
  primaryCategorySlug: "ai-infrastructure",
  secondaryCategories: [],
  sourceReference: null,
  ticker: "NVDA",
  website: null,
};

describe("approved company research context", () => {
  it("keeps only structured approved inputs and creates a stable context version", () => {
    const first = createApprovedCompanyResearchContext({
      company,
      graph: {
        edges: [{ confidence: "high", id: "edge-1", relationshipType: "Owns Product", sourceNodeId: "company", targetNodeId: "product" }],
        nodes: [
          { id: "product", name: "CUDA-X", nodeType: "product", slug: "cuda-x" },
          { id: "company", name: "NVIDIA", nodeType: "company", slug: "nvidia" },
        ],
      },
      products: [{ name: "CUDA-X", productType: "GPU software libraries", sourceReference: "https://example.com/cuda-x" }],
    });
    const second = createApprovedCompanyResearchContext({
      company,
      graph: {
        edges: [{ confidence: "high", id: "edge-1", relationshipType: "Owns Product", sourceNodeId: "company", targetNodeId: "product" }],
        nodes: [
          { id: "company", name: "NVIDIA", nodeType: "company", slug: "nvidia" },
          { id: "product", name: "CUDA-X", nodeType: "product", slug: "cuda-x" },
        ],
      },
      products: [{ name: "CUDA-X", productType: "GPU software libraries", sourceReference: "https://example.com/cuda-x" }],
    });

    expect(first.contextVersion).toBe(second.contextVersion);
    expect(first.relationships).toEqual([{
      relationshipType: "Owns Product",
      sourceName: "NVIDIA",
      sourceType: "company",
      targetName: "CUDA-X",
      targetType: "product",
    }]);
    expect(first.dataGaps).toContain("In-app market prices, historical prices, and financial metrics are outside the current hackathon scope.");
  });
});
