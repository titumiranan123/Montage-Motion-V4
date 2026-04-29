export const caseStudyData = {
  hero: {
    title: {
      normal: "How TechNova Scaled",
      highlight: "3× in 6 Months",
      suffix: "Without Burning Out",
    },
    description:
      "A deep dive into how we helped a mid-stage SaaS startup restructure their growth engine, reduce churn by 42%, and triple ARR — all within two quarters.",
    tags: ["Client Success", "SaaS", "Growth Strategy"],
    stats: [
      { value: "3×", label: "ARR Growth" },
      { value: "−42%", label: "Churn Rate" },
    ],
  },

  metrics: [
    { value: "3×", label: "ARR Growth", sub: "$800K → $2.4M" },
    { value: "42%", label: "Churn Reduction", sub: "8.1% → 4.7% MoM" },
    { value: "6mo", label: "Time to Results", sub: "Q1 → Q2 2025" },
    { value: "98%", label: "Team Retention", sub: "Zero key exits" },
  ],

  client: {
    name: "TechNova Inc.",
    meta: "B2B SaaS · Project Management · 45 employees",
    tags: ["Series A", "Remote-first"],
    description:
      "TechNova is a B2B SaaS company offering AI-powered project management tools for engineering teams. Founded in 2021, they had strong early traction — but hit a growth plateau heading into 2024.",
    sidebar: {
      industry: "Project Mgmt",
      teamSize: "45 employees",
      stage: "Series A",
      location: "Remote",
    },
  },

  challenge: {
    intro:
      "When TechNova approached us, they were facing three compounding problems:",
    items: [
      {
        title: "High churn, unclear reason",
        desc: "Monthly churn had crept from 3.2% to 8.1% over 8 months.",
      },
      {
        title: "Rising CAC with declining conversion",
        desc: "Ad spend had doubled while conversion dropped.",
      },
      {
        title: "Team bandwidth at breaking point",
        desc: "Founder-led sales wasn’t scaling.",
      },
    ],
  },

  solution: {
    intro:
      "We deployed a three-phase intervention over 26 weeks.",
    phases: [
      {
        phase: "Phase 1 — Diagnose",
        time: "Weeks 1–6",
        desc: "Customer interviews and funnel analysis.",
      },
      {
        phase: "Phase 2 — Rebuild",
        time: "Weeks 7–18",
        desc: "Redesigned onboarding and pricing.",
      },
      {
        phase: "Phase 3 — Scale",
        time: "Weeks 19–26",
        desc: "Referral program and paid acquisition.",
      },
    ],
  },

  outcome: {
    description:
      "By Q2 2025, TechNova reached $2.4M ARR with sustainable growth.",
    before: [
      { label: "ARR", value: "$800K" },
      { label: "Monthly churn", value: "8.1%" },
      { label: "Trial conversion", value: "14%" },
      { label: "NPS", value: "21" },
    ],
    after: [
      { label: "ARR", value: "$2.4M" },
      { label: "Monthly churn", value: "4.7%" },
      { label: "Trial conversion", value: "31%" },
      { label: "NPS", value: "58" },
    ],
  },

  testimonial: {
    quote:
      "Working with this team was the single best investment we made.",
    name: "Ayaan Khan",
    role: "CEO, TechNova Inc.",
  },

  more: [
    {
      tag: "Product",
      title: "Redesigning Fintech Onboarding",
      meta: "8 min read · Jan 2025",
    },
    {
      tag: "Research",
      title: "AI Copilots & Developer Workflows",
      meta: "15 min read · Feb 2025",
    },
    {
      tag: "Business",
      title: "Building Ops at Startup",
      meta: "10 min read · Mar 2025",
    },
  ],
};