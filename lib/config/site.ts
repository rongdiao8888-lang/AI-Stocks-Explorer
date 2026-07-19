import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Building2,
  Cloud,
  Cpu,
  Database,
  Factory,
  Gauge,
  Network,
  Route,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export type NavigationItem = {
  href: string;
  label: string;
};

export type ValueChainCategorySlug =
  | "ai-infrastructure"
  | "semiconductor-manufacturing-equipment"
  | "memory-storage"
  | "networking-optical-interconnect"
  | "cloud-platforms"
  | "data-infrastructure"
  | "ai-software-enterprise-ai"
  | "cybersecurity"
  | "robotics-industrial-ai"
  | "autonomous-systems";

export type ValueChainCategory = {
  description: string;
  icon: LucideIcon;
  iconName: string;
  name: string;
  slug: ValueChainCategorySlug;
};

export const siteNavigation: NavigationItem[] = [
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/companies", label: "Companies" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/compare", label: "Compare" },
];

export const valueChainCategories: ValueChainCategory[] = [
  {
    name: "AI Infrastructure (Compute & Accelerators)",
    slug: "ai-infrastructure",
    description: "Compute, accelerators, and connectivity hardware that support AI workloads.",
    icon: Cpu,
    iconName: "Cpu",
  },
  {
    name: "Semiconductor Manufacturing & Equipment",
    slug: "semiconductor-manufacturing-equipment",
    description: "Foundries, lithography, inspection, and equipment behind advanced semiconductors.",
    icon: Factory,
    iconName: "Factory",
  },
  {
    name: "Memory & Storage",
    slug: "memory-storage",
    description: "Memory and storage systems used in AI training and inference.",
    icon: Database,
    iconName: "Database",
  },
  {
    name: "Networking & Optical Interconnect",
    slug: "networking-optical-interconnect",
    description: "Networking, optical, and fiber systems that connect AI clusters.",
    icon: Network,
    iconName: "Network",
  },
  {
    name: "Cloud Platforms",
    slug: "cloud-platforms",
    description: "Cloud infrastructure and services for AI adoption.",
    icon: Cloud,
    iconName: "Cloud",
  },
  {
    name: "Data Infrastructure",
    slug: "data-infrastructure",
    description: "Data systems that make AI workloads useful and reliable.",
    icon: Workflow,
    iconName: "Workflow",
  },
  {
    name: "AI Software & Enterprise AI",
    slug: "ai-software-enterprise-ai",
    description: "AI platforms, enterprise applications, and intelligent workflows.",
    icon: BrainCircuit,
    iconName: "BrainCircuit",
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Security platforms protecting AI-era operations.",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
  },
  {
    name: "Robotics & Industrial AI",
    slug: "robotics-industrial-ai",
    description: "Automation systems applying AI in physical environments.",
    icon: Bot,
    iconName: "Bot",
  },
  {
    name: "Autonomous Systems",
    slug: "autonomous-systems",
    description: "Autonomy platforms for mobility and complex operations.",
    icon: Route,
    iconName: "Route",
  },
];

export const applicationSignals = [
  {
    label: "Structured facts",
    description: "Company, market, and financial data remain separate from analysis.",
    icon: Building2,
  },
  {
    label: "Ecosystem relationships",
    description: "Suppliers, customers, products, and technologies will be modeled as data.",
    icon: Network,
  },
  {
    label: "Grounded research",
    description: "AI explanation will be constrained to approved company context.",
    icon: Gauge,
  },
];
