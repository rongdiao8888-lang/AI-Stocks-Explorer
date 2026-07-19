import { describe, expect, it } from "vitest";

import { parseResearchPoints } from "./research-content";

describe("parseResearchPoints", () => {
  it("returns a validated, trimmed list of research points", () => {
    expect(parseResearchPoints(["  Durable software ecosystem  ", "Demand depends on capital spending"])).toEqual([
      "Durable software ecosystem",
      "Demand depends on capital spending",
    ]);
  });

  it("rejects malformed or oversized research content", () => {
    expect(parseResearchPoints(["Supported point", 42])).toEqual([]);
    expect(parseResearchPoints(Array.from({ length: 9 }, (_, index) => `Point ${index}`))).toEqual([]);
  });
});
