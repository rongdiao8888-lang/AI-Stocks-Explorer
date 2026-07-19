import type { ValueChainCategorySlug } from "@/lib/config/site";

export type CompanySeedPriority = "tier-1" | "baseline";

export type CompanySeedRecord = {
  aiFocus: string | null;
  companyName: string;
  primaryCategorySlug: ValueChainCategorySlug;
  priority: CompanySeedPriority;
  ticker: string;
};

export const tierOneCompanyTickers = [
  "NVDA",
  "AMD",
  "MSFT",
  "AMZN",
  "GOOGL",
  "TSM",
  "AVGO",
  "MU",
  "PLTR",
  "SNOW",
  "ANET",
  "TSLA",
] as const;

// Source-derived planning registry. aiFocus is descriptive context, not a category assignment.
export const companySeedUniverse = [
  { companyName: "NVIDIA", ticker: "NVDA", primaryCategorySlug: "ai-infrastructure", aiFocus: "AI Compute & GPU Acceleration", priority: "tier-1" },
  { companyName: "Advanced Micro Devices", ticker: "AMD", primaryCategorySlug: "ai-infrastructure", aiFocus: null, priority: "tier-1" },
  { companyName: "Broadcom", ticker: "AVGO", primaryCategorySlug: "ai-infrastructure", aiFocus: "Networking", priority: "tier-1" },
  { companyName: "Qualcomm", ticker: "QCOM", primaryCategorySlug: "ai-infrastructure", aiFocus: "Edge AI", priority: "baseline" },
  { companyName: "Marvell Technology", ticker: "MRVL", primaryCategorySlug: "ai-infrastructure", aiFocus: "Networking", priority: "baseline" },
  { companyName: "Intel", ticker: "INTC", primaryCategorySlug: "ai-infrastructure", aiFocus: "Semiconductor Manufacturing", priority: "baseline" },
  { companyName: "Arm Holdings", ticker: "ARM", primaryCategorySlug: "ai-infrastructure", aiFocus: "AI Software", priority: "baseline" },
  { companyName: "Astera Labs", ticker: "ALAB", primaryCategorySlug: "ai-infrastructure", aiFocus: "Data Center Connectivity", priority: "baseline" },
  { companyName: "Taiwan Semiconductor", ticker: "TSM", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: null, priority: "tier-1" },
  { companyName: "GlobalFoundries", ticker: "GFS", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: null, priority: "baseline" },
  { companyName: "ASML Holding", ticker: "ASML", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: "Lithography", priority: "baseline" },
  { companyName: "Applied Materials", ticker: "AMAT", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: "Semiconductor Equipment", priority: "baseline" },
  { companyName: "Lam Research", ticker: "LRCX", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: "Semiconductor Equipment", priority: "baseline" },
  { companyName: "KLA Corporation", ticker: "KLAC", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: "Semiconductor Inspection", priority: "baseline" },
  { companyName: "Tokyo Electron", ticker: "TOELY", primaryCategorySlug: "semiconductor-manufacturing-equipment", aiFocus: "Semiconductor Equipment", priority: "baseline" },
  { companyName: "Micron Technology", ticker: "MU", primaryCategorySlug: "memory-storage", aiFocus: null, priority: "tier-1" },
  { companyName: "Western Digital", ticker: "WDC", primaryCategorySlug: "memory-storage", aiFocus: "Storage", priority: "baseline" },
  { companyName: "Seagate Technology", ticker: "STX", primaryCategorySlug: "memory-storage", aiFocus: "Storage", priority: "baseline" },
  { companyName: "Pure Storage", ticker: "PSTG", primaryCategorySlug: "memory-storage", aiFocus: "Enterprise Storage", priority: "baseline" },
  { companyName: "NetApp", ticker: "NTAP", primaryCategorySlug: "memory-storage", aiFocus: "Data Infrastructure", priority: "baseline" },
  { companyName: "Arista Networks", ticker: "ANET", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "AI Infrastructure", priority: "tier-1" },
  { companyName: "Cisco Systems", ticker: "CSCO", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "Cybersecurity", priority: "baseline" },
  { companyName: "Hewlett Packard Enterprise", ticker: "HPE", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "AI-native networking (Juniper portfolio)", priority: "baseline" },
  { companyName: "Ciena", ticker: "CIEN", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "Optical Networking", priority: "baseline" },
  { companyName: "Corning", ticker: "GLW", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "Fiber Infrastructure", priority: "baseline" },
  { companyName: "Lumentum", ticker: "LITE", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "Optical Components", priority: "baseline" },
  { companyName: "Coherent", ticker: "COHR", primaryCategorySlug: "networking-optical-interconnect", aiFocus: "Optical Components", priority: "baseline" },
  { companyName: "Microsoft", ticker: "MSFT", primaryCategorySlug: "cloud-platforms", aiFocus: "AI Software", priority: "tier-1" },
  { companyName: "Amazon", ticker: "AMZN", primaryCategorySlug: "cloud-platforms", aiFocus: "AI Infrastructure", priority: "tier-1" },
  { companyName: "Alphabet", ticker: "GOOGL", primaryCategorySlug: "cloud-platforms", aiFocus: "AI Software", priority: "tier-1" },
  { companyName: "Oracle", ticker: "ORCL", primaryCategorySlug: "cloud-platforms", aiFocus: "Data Infrastructure", priority: "baseline" },
  { companyName: "IBM", ticker: "IBM", primaryCategorySlug: "cloud-platforms", aiFocus: "Enterprise AI", priority: "baseline" },
  { companyName: "Snowflake", ticker: "SNOW", primaryCategorySlug: "data-infrastructure", aiFocus: "AI Software", priority: "tier-1" },
  { companyName: "MongoDB", ticker: "MDB", primaryCategorySlug: "data-infrastructure", aiFocus: "AI Software", priority: "baseline" },
  { companyName: "Datadog", ticker: "DDOG", primaryCategorySlug: "data-infrastructure", aiFocus: "Observability", priority: "baseline" },
  { companyName: "Elastic", ticker: "ESTC", primaryCategorySlug: "data-infrastructure", aiFocus: "Search", priority: "baseline" },
  { companyName: "Confluent", ticker: "CFLT", primaryCategorySlug: "data-infrastructure", aiFocus: "Data Streaming", priority: "baseline" },
  { companyName: "Cloudflare", ticker: "NET", primaryCategorySlug: "data-infrastructure", aiFocus: "Edge Platform", priority: "baseline" },
  { companyName: "Palantir Technologies", ticker: "PLTR", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "Data Infrastructure", priority: "tier-1" },
  { companyName: "C3.ai", ticker: "AI", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "Enterprise AI", priority: "baseline" },
  { companyName: "ServiceNow", ticker: "NOW", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "Workflow AI", priority: "baseline" },
  { companyName: "Adobe", ticker: "ADBE", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "Generative AI", priority: "baseline" },
  { companyName: "Salesforce", ticker: "CRM", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "AI CRM", priority: "baseline" },
  { companyName: "GitLab", ticker: "GTLB", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "AI Developer Tools", priority: "baseline" },
  { companyName: "UiPath", ticker: "PATH", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "AI Automation", priority: "baseline" },
  { companyName: "Pegasystems", ticker: "PEGA", primaryCategorySlug: "ai-software-enterprise-ai", aiFocus: "AI Automation", priority: "baseline" },
  { companyName: "CrowdStrike", ticker: "CRWD", primaryCategorySlug: "cybersecurity", aiFocus: "AI Software", priority: "baseline" },
  { companyName: "Palo Alto Networks", ticker: "PANW", primaryCategorySlug: "cybersecurity", aiFocus: "AI Platform", priority: "baseline" },
  { companyName: "SentinelOne", ticker: "S", primaryCategorySlug: "cybersecurity", aiFocus: "Endpoint AI", priority: "baseline" },
  { companyName: "Zscaler", ticker: "ZS", primaryCategorySlug: "cybersecurity", aiFocus: "Cloud Security", priority: "baseline" },
  { companyName: "Fortinet", ticker: "FTNT", primaryCategorySlug: "cybersecurity", aiFocus: "Network Security", priority: "baseline" },
  { companyName: "CyberArk", ticker: "CYBR", primaryCategorySlug: "cybersecurity", aiFocus: "Identity Security", priority: "baseline" },
  { companyName: "ABB", ticker: "ABB", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Industrial Automation", priority: "baseline" },
  { companyName: "Symbotic", ticker: "SYM", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Warehouse Automation", priority: "baseline" },
  { companyName: "Rockwell Automation", ticker: "ROK", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Factory Automation", priority: "baseline" },
  { companyName: "Teradyne", ticker: "TER", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Robotics", priority: "baseline" },
  { companyName: "Emerson Electric", ticker: "EMR", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Industrial AI", priority: "baseline" },
  { companyName: "Honeywell", ticker: "HON", primaryCategorySlug: "robotics-industrial-ai", aiFocus: "Industrial AI", priority: "baseline" },
  { companyName: "Tesla", ticker: "TSLA", primaryCategorySlug: "autonomous-systems", aiFocus: "Robotics", priority: "tier-1" },
  { companyName: "Mobileye Global", ticker: "MBLY", primaryCategorySlug: "autonomous-systems", aiFocus: "Automotive AI", priority: "baseline" },
  { companyName: "Aurora Innovation", ticker: "AUR", primaryCategorySlug: "autonomous-systems", aiFocus: "Autonomous Driving", priority: "baseline" },
  { companyName: "Uber Technologies", ticker: "UBER", primaryCategorySlug: "autonomous-systems", aiFocus: "Autonomous Mobility", priority: "baseline" },
  { companyName: "Pony AI", ticker: "PONY", primaryCategorySlug: "autonomous-systems", aiFocus: "Robotaxi", priority: "baseline" },
  { companyName: "WeRide", ticker: "WRD", primaryCategorySlug: "autonomous-systems", aiFocus: "Robotaxi", priority: "baseline" },
] as const satisfies readonly CompanySeedRecord[];

export const companySeedCount = companySeedUniverse.length;

export function getCompanySeedByTicker(ticker: string): CompanySeedRecord | undefined {
  const normalizedTicker = ticker.trim().toUpperCase();

  return companySeedUniverse.find((company) => company.ticker === normalizedTicker);
}

export function listRelatedCompanySeeds(ticker: string, limit = 4): CompanySeedRecord[] {
  const company = getCompanySeedByTicker(ticker);

  if (!company) {
    return [];
  }

  const priorityRank: Record<CompanySeedPriority, number> = {
    "tier-1": 0,
    baseline: 1,
  };

  return companySeedUniverse
    .filter((candidate) => candidate.ticker !== company.ticker && candidate.primaryCategorySlug === company.primaryCategorySlug)
    .sort((left, right) => priorityRank[left.priority] - priorityRank[right.priority] || left.companyName.localeCompare(right.companyName))
    .slice(0, Math.max(0, Math.floor(limit)));
}
