export type CuratedTechnology = {
  includeInGraph?: boolean;
  name: string;
  slug: string;
  technologyType: string;
};

export type TierOneProductCuration = {
  companyTicker: string;
  productName: string;
  productSlug: string;
  productType: string;
  sourceReference: string;
  technologies: readonly CuratedTechnology[];
  verifiedAt: string;
};

// Each record is limited to an official company product page and technologies
// explicitly represented by that product. Broader ecosystem claims are curated separately.
export const tierOneProductCuration = [
  {
    companyTicker: "NVDA",
    productName: "NVIDIA Blackwell Architecture",
    productSlug: "nvidia-blackwell-architecture",
    productType: "AI accelerator architecture",
    sourceReference: "https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/",
    technologies: [
      { name: "GPU Computing", slug: "gpu-computing", technologyType: "AI compute" },
      { name: "AI Inference", slug: "ai-inference", technologyType: "AI workload" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "NVDA",
    productName: "NVIDIA CUDA-X",
    productSlug: "nvidia-cuda-x",
    productType: "GPU-accelerated software libraries",
    sourceReference: "https://www.nvidia.com/en-us/technologies/cuda-x/",
    technologies: [
      { name: "GPU-Accelerated Software", slug: "gpu-accelerated-software", technologyType: "AI software" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AMD",
    productName: "AMD Instinct MI300 Series",
    productSlug: "amd-instinct-mi300-series",
    productType: "AI accelerator",
    sourceReference: "https://www.amd.com/en/products/accelerators/instinct/mi300.html",
    technologies: [
      { name: "GPU Computing", slug: "gpu-computing", technologyType: "AI compute" },
      { name: "High-Bandwidth Memory", slug: "high-bandwidth-memory", technologyType: "Memory" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AMD",
    productName: "AMD ROCm Software",
    productSlug: "amd-rocm-software",
    productType: "GPU software stack",
    sourceReference: "https://www.amd.com/en/products/software/rocm.html",
    technologies: [
      { name: "GPU Software Stack", slug: "gpu-software-stack", technologyType: "AI software" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "TSM",
    productName: "TSMC CoWoS",
    productSlug: "tsmc-cowos",
    productType: "Advanced packaging technology",
    sourceReference: "https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm",
    technologies: [
      { name: "Advanced Packaging", slug: "advanced-packaging", technologyType: "Semiconductor manufacturing" },
      { name: "Semiconductor Fabrication", slug: "semiconductor-fabrication", technologyType: "Semiconductor manufacturing" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "TSM",
    productName: "TSMC 2nm (N2) Technology",
    productSlug: "tsmc-n2-technology",
    productType: "Semiconductor process technology",
    sourceReference: "https://www.tsmc.com/english/dedicatedfoundry/technology/logic/l_2nm",
    technologies: [
      { name: "Nanosheet Transistors", slug: "nanosheet-transistors", technologyType: "Semiconductor manufacturing" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "MU",
    productName: "Micron HBM3E",
    productSlug: "micron-hbm3e",
    productType: "High-bandwidth memory",
    sourceReference: "https://www.micron.com/products/memory/hbm/hbm3e",
    technologies: [
      { name: "High-Bandwidth Memory", slug: "high-bandwidth-memory", technologyType: "Memory" },
      { name: "AI Training", slug: "ai-training", technologyType: "AI workload" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "MU",
    productName: "Micron 9550 NVMe SSD",
    productSlug: "micron-9550-nvme-ssd",
    productType: "Data center solid-state drive",
    sourceReference: "https://www.micron.com/products/storage/ssd/data-center-ssd/9550-ssd",
    technologies: [
      { name: "NVMe Storage", slug: "nvme-storage", technologyType: "Storage" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AVGO",
    productName: "Broadcom StrataXGS Tomahawk 5",
    productSlug: "broadcom-tomahawk-5",
    productType: "Ethernet switch silicon",
    sourceReference: "https://www.broadcom.com/company/news/product-releases/60456",
    technologies: [
      { name: "Ethernet Switching", slug: "ethernet-switching", technologyType: "Networking" },
      { name: "AI Networking", slug: "ai-networking", technologyType: "Networking" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AVGO",
    productName: "Broadcom Jericho3-AI",
    productSlug: "broadcom-jericho3-ai",
    productType: "AI Ethernet switch router",
    sourceReference: "https://www.broadcom.com/products/ethernet-connectivity/switching/stratadnx/bcm88890",
    technologies: [
      { name: "AI Fabric Routing", slug: "ai-fabric-routing", technologyType: "Networking" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "ANET",
    productName: "Arista Etherlink AI Networking",
    productSlug: "arista-etherlink-ai-networking",
    productType: "AI networking platform",
    sourceReference: "https://www.arista.com/en/solutions/ai-networking",
    technologies: [
      { name: "Ethernet Networking", slug: "ethernet-networking", technologyType: "Networking" },
      { name: "AI Networking", slug: "ai-networking", technologyType: "Networking" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "ANET",
    productName: "Arista EOS",
    productSlug: "arista-eos",
    productType: "Network operating system",
    sourceReference: "https://www.arista.com/en/products/eos",
    technologies: [
      { name: "Network Operating System", slug: "network-operating-system", technologyType: "Networking" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "MSFT",
    productName: "Microsoft Foundry",
    productSlug: "microsoft-foundry",
    productType: "Enterprise AI platform",
    sourceReference: "https://learn.microsoft.com/en-us/azure/foundry/",
    technologies: [
      { name: "Cloud Computing", slug: "cloud-computing", technologyType: "Cloud platform" },
      { includeInGraph: false, name: "Enterprise AI", slug: "enterprise-ai", technologyType: "AI platform" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "MSFT",
    productName: "Microsoft Foundry Agent Service",
    productSlug: "microsoft-foundry-agent-service",
    productType: "Managed AI agent platform",
    sourceReference: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview",
    technologies: [
      { name: "Agent Development Platform", slug: "agent-development-platform", technologyType: "AI application" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AMZN",
    productName: "Amazon Bedrock",
    productSlug: "amazon-bedrock",
    productType: "Managed AI service",
    sourceReference: "https://docs.aws.amazon.com/bedrock/",
    technologies: [
      { name: "Cloud Computing", slug: "cloud-computing", technologyType: "Cloud platform" },
      { name: "Foundation Models", slug: "foundation-models", technologyType: "AI model" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "AMZN",
    productName: "Amazon SageMaker AI",
    productSlug: "amazon-sagemaker-ai",
    productType: "Managed machine learning service",
    sourceReference: "https://aws.amazon.com/sagemaker/ai/",
    technologies: [
      { name: "Machine Learning Lifecycle", slug: "machine-learning-lifecycle", technologyType: "AI platform" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "GOOGL",
    productName: "Google Cloud Vertex AI",
    productSlug: "google-cloud-vertex-ai",
    productType: "Machine learning platform",
    sourceReference: "https://cloud.google.com/ai-platform/docs",
    technologies: [
      { name: "Cloud Computing", slug: "cloud-computing", technologyType: "Cloud platform" },
      { name: "Machine Learning Platform", slug: "machine-learning-platform", technologyType: "AI platform" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "GOOGL",
    productName: "Gemini Enterprise",
    productSlug: "gemini-enterprise",
    productType: "Enterprise AI platform",
    sourceReference: "https://cloud.google.com/gemini/enterprise/docs",
    technologies: [
      { name: "Enterprise Generative AI", slug: "enterprise-generative-ai", technologyType: "AI application" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "PLTR",
    productName: "Palantir Artificial Intelligence Platform (AIP)",
    productSlug: "palantir-aip",
    productType: "Enterprise AI platform",
    sourceReference: "https://www.palantir.com/platforms/aip/",
    technologies: [
      { name: "Enterprise AI", slug: "enterprise-ai", technologyType: "AI platform" },
      { name: "AI Agents", slug: "ai-agents", technologyType: "AI application" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "PLTR",
    productName: "Palantir Foundry",
    productSlug: "palantir-foundry",
    productType: "Data operations platform",
    sourceReference: "https://www.palantir.com/platforms/foundry",
    technologies: [
      { name: "Data Ontology", slug: "data-ontology", technologyType: "Data infrastructure" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "SNOW",
    productName: "Snowflake Cortex AI",
    productSlug: "snowflake-cortex-ai",
    productType: "Enterprise AI platform",
    sourceReference: "https://www.snowflake.com/en/product/features/cortex/",
    technologies: [
      { includeInGraph: false, name: "Enterprise AI", slug: "enterprise-ai", technologyType: "AI platform" },
      { name: "Foundation Models", slug: "foundation-models", technologyType: "AI model" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "SNOW",
    productName: "Snowflake Cortex Analyst",
    productSlug: "snowflake-cortex-analyst",
    productType: "Natural-language data analytics service",
    sourceReference: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst",
    technologies: [
      { name: "Text-to-SQL", slug: "text-to-sql", technologyType: "AI application" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
  {
    companyTicker: "TSLA",
    productName: "Tesla Full Self-Driving (Supervised)",
    productSlug: "tesla-full-self-driving-supervised",
    productType: "Advanced driver assistance system",
    sourceReference: "https://www.tesla.com/support/fsd",
    technologies: [
      { name: "Computer Vision", slug: "computer-vision", technologyType: "Autonomous systems" },
      { name: "Advanced Driver Assistance Systems", slug: "advanced-driver-assistance-systems", technologyType: "Autonomous systems" },
    ],
    verifiedAt: "2026-07-18T00:00:00.000Z",
  },
] as const satisfies readonly TierOneProductCuration[];
