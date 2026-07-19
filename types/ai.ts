export type AIResearchStatus = "approved" | "draft" | "reviewed" | "unavailable";

export type AIResearchProvenance = {
  contextVersion: string;
  generatedAt: string;
  modelName: string;
  promptVersion: string;
};
