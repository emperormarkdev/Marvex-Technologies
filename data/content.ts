/* ------------------------------------------------------------------ */
/*  Marvex Technologies content                                        */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: "Marvex Technologies",
  tagline: "Software, AI systems, and digital platforms built to last.",
  email: "engage@marvextechnologies.com",
  emailRecipient: "emperormarktech@gmail.com",
  phoneDisplay: "+234 904 044 7548",
  phoneHref: "+2349040447548",
  whatsapp: "2349040447548",
  location: "Nde Street, Rumukwurushi Pipeline, Port Harcourt",
};

export type Client = {
  name: string;
  file: string;
};

export const clients: Client[] = [
  { name: "Zenda", file: "/clients/zenda.svg" },
  { name: "Klarix", file: "/clients/klarix.svg" },
  { name: "Veridian", file: "/clients/veridian.svg" },
  { name: "Corvex", file: "/clients/corvex.svg" },
  { name: "Crestguard", file: "/clients/crestguard.svg" },
  { name: "Tango Farms", file: "/clients/tango-farms.svg" },
  { name: "Shopmax", file: "/clients/shopmax.svg" },
  { name: "Ventra", file: "/clients/ventra.svg" },
];

export type Service = {
  slug: string;
  category: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "digital-platforms",
    category: "Web platforms",
    title: "Digital Platforms & Corporate Websites",
    short:
      "Fast, structured corporate websites built for clarity, search visibility, and easy publishing.",
    description:
      "Your website is often the first place partners, investors, and customers evaluate your company. We design and build fast web platforms with clean structure, technical SEO, and a content setup your team can manage independently.",
    deliverables: [
      "Custom visual design and component system",
      "Fast page loads and Core Web Vitals tuning",
      "Technical SEO, structured data, and accessibility",
      "Headless CMS for direct team publishing",
    ],
  },
  {
    slug: "mobile-engineering",
    category: "Mobile",
    title: "Mobile Apps (iOS & Android)",
    short:
      "Reliable iPhone and Android applications designed for everyday speed and real-world use.",
    description:
      "Whether you are launching a customer product, a logistics app, or a financial tool, we handle product architecture, interface design, engineering, and full release on the App Store and Google Play.",
    deliverables: [
      "iOS and Android development from a unified codebase",
      "Secure sign-in, push notifications, and offline sync",
      "Card, bank transfer, and wallet payment integrations",
      "App Store and Google Play review and release",
    ],
  },
  {
    slug: "web-applications",
    category: "Web software",
    title: "Custom SaaS & Web Applications",
    short:
      "Client portals, SaaS products, and internal web software built around complex workflows.",
    description:
      "When off-the-shelf tools stop fitting how you work, we build dedicated web applications. Customers, partners, and staff get secure accounts, real-time dashboards, and dependable APIs.",
    deliverables: [
      "Multi-tenant SaaS and role-based portal architecture",
      "Live operational dashboards, exports, and audit trails",
      "Clean REST and GraphQL API development",
      "Cloud deployment with monitoring and backups",
    ],
  },
  {
    slug: "ai-engineering",
    category: "Artificial intelligence",
    title: "AI Systems & Workflow Intelligence",
    short:
      "Practical AI agents, private document search, and automated workflows integrated into your stack.",
    description:
      "We put modern language models to work on real operational problems: searching internal company documents, automating customer support, extracting data from invoices and forms, and assisting staff inside existing software.",
    deliverables: [
      "Private company knowledge search over your documents",
      "AI assistants for customer support and internal teams",
      "Automated document reading and data extraction",
      "Evaluation, guardrails, and response speed tuning",
    ],
  },
  {
    slug: "data-analytics",
    category: "Data & analytics",
    title: "Data Engineering & Business Intelligence",
    short:
      "Clean data pipelines, cloud warehouses, and live reporting dashboards for leadership.",
    description:
      "Instead of waiting days for manual spreadsheet reports, we connect your sales, finance, and operations data into one warehouse with live dashboards leadership can trust.",
    deliverables: [
      "Automated data pipelines and cloud warehousing",
      "Live executive reporting and KPI dashboards",
      "Revenue, margin, and branch performance tracking",
      "Scheduled exports and governed data access",
    ],
  },
  {
    slug: "fintech-payments",
    category: "Financial systems",
    title: "FinTech, Payments & Billing Systems",
    short:
      "Digital wallets, subscription billing, payment routing, and automated reconciliation.",
    description:
      "Financial software leaves no room for guesswork. We build double-entry ledgers, wallet systems, automated billing, KYC onboarding, and payment integrations across Stripe, Paystack, Flutterwave, and bank APIs.",
    deliverables: [
      "Double-entry ledger and digital wallet systems",
      "Stripe, Paystack, Flutterwave, and bank API integrations",
      "Automated invoicing, settlements, and webhook reconciliation",
      "KYC verification flows and full transaction logs",
    ],
  },
  {
    slug: "commerce-retail",
    category: "Commerce & retail",
    title: "Commerce & Multi-Branch Retail Systems",
    short:
      "Online storefronts, marketplaces, and real-time multi-location POS and inventory sync.",
    description:
      "We build commerce platforms that connect online sales with physical locations. Manage catalogs, pricing, online checkout, barcode hardware, and live stock across every branch from one system.",
    deliverables: [
      "Online storefronts and multi-vendor marketplaces",
      "Multi-branch POS with real-time stock synchronization",
      "Shipping rules, pricing controls, and order tracking",
      "Barcode scanner and thermal receipt printer support",
    ],
  },
  {
    slug: "enterprise-erp",
    category: "Enterprise software",
    title: "Internal Operations & ERP Software",
    short:
      "Centralized software for procurement, inventory, HR, approvals, and daily operations.",
    description:
      "We replace scattered spreadsheets and disconnected tools with one internal system modeled directly around your departments, approval chains, and reporting structure.",
    deliverables: [
      "Workflows tailored to your departments and rules",
      "Clean migration of existing company records",
      "Role-based permissions and multi-level approvals",
      "Structured staff onboarding and documentation",
    ],
  },
  {
    slug: "cloud-devops",
    category: "Infrastructure",
    title: "Cloud Architecture, DevOps & Reliability",
    short:
      "Resilient cloud hosting, automated deployments, uptime monitoring, and disaster recovery.",
    description:
      "We design and maintain cloud environments on AWS, Google Cloud, Azure, and modern edge platforms with automated deployment pipelines, alerts, backups, and ongoing engineering support.",
    deliverables: [
      "Cloud infrastructure setup and infrastructure as code",
      "Automated CI/CD pipelines and staging environments",
      "Real-time uptime monitoring, logs, and incident alerts",
      "Automated backups, failover planning, and SLA support",
    ],
  },
  {
    slug: "cybersecurity",
    category: "Security",
    title: "Cybersecurity & Access Governance",
    short:
      "Security reviews, single sign-on, encrypted data handling, and compliance hardening.",
    description:
      "We audit existing applications and build security directly into new systems through identity controls, encryption standards, secret management, and clear activity logs.",
    deliverables: [
      "Application and cloud security reviews",
      "SSO, multi-factor authentication, and role controls",
      "Data encryption and secrets management hardening",
      "Activity audit logs and compliance preparation",
    ],
  },
  {
    slug: "legacy-modernization",
    category: "Modernization",
    title: "Legacy Modernization & Cloud Migration",
    short:
      "Move slow, outdated software onto modern cloud architecture without halting operations.",
    description:
      "Outdated software slows teams down and creates operational risk. We plan and execute phased migrations that modernize your codebase, databases, and APIs while keeping daily work running.",
    deliverables: [
      "Technical audit of legacy code and infrastructure",
      "Phased migration plan with zero operational downtime",
      "Database upgrades and verified data transfer",
      "API wrappers linking older tools to new platforms",
    ],
  },
  {
    slug: "product-design",
    category: "Design",
    title: "Product Design & Design Systems",
    short:
      "Clear interface design, clickable prototypes, and reusable component libraries.",
    description:
      "Before writing code, we map user journeys and design clickable prototypes so your team can test every screen, refine decisions early, and ship with a consistent visual system.",
    deliverables: [
      "User flow mapping and information architecture",
      "Clickable prototypes for stakeholder review",
      "Reusable UI component libraries and design tokens",
      "Clean handoff specifications for engineering",
    ],
  },
];

export const processSteps = [
  {
    no: "01",
    title: "Discovery & Technical Audit",
    summary: "Map your goals, workflows, and technical constraints.",
    duration: "Stage 1",
    text: "We sit with your leadership and technical stakeholders to understand what needs to be built, how your current tools operate, and what success looks like in practice.",
    output: "Written discovery brief and system requirements",
    needs: "Stakeholder input and access to current workflows",
  },
  {
    no: "02",
    title: "Architecture & Fixed Scope",
    summary: "Clear technical blueprint, schedule, and commercial terms.",
    duration: "Stage 2",
    text: "Before engineering starts, we put the system design, milestones, and total investment in writing so there is no ambiguity around scope or delivery dates.",
    output: "Technical blueprint, roadmap, and fixed proposal",
    needs: "Approval on scope and project milestones",
  },
  {
    no: "03",
    title: "Design & Weekly Builds",
    summary: "Working software pushed to a private staging link every week.",
    duration: "Stage 3",
    text: "Design and engineering move in focused weekly sprints. You review real working software on a private staging environment every week instead of waiting until the end.",
    output: "Weekly staging builds and progress reviews",
    needs: "Timely weekly feedback from your project lead",
  },
  {
    no: "04",
    title: "Testing, Migration & Launch",
    summary: "Quality assurance, clean data transfer, and team onboarding.",
    duration: "Stage 4",
    text: "We run thorough testing, migrate historical data cleanly, deploy to production cloud servers, and train your teams with straightforward documentation.",
    output: "Live production release, migrated data, and guides",
    needs: "Final review sign-off and team training time",
  },
  {
    no: "05",
    title: "Support & Continuous Improvement",
    summary: "Monitoring, security updates, and new features after launch.",
    duration: "Ongoing",
    text: "After launch, our engineers stay responsible for uptime monitoring, backups, security patches, and rolling out new capabilities as your business evolves.",
    output: "Reliable uptime, regular updates, and direct support",
    needs: "Periodic roadmap check-ins as priorities change",
  },
];

export const engagementModels = [
  {
    label: "Focused delivery",
    title: "Single Product or Platform",
    text: "A dedicated team to design and ship one corporate website, mobile app, AI workflow, or internal module with fixed scope and clear milestones.",
  },
  {
    label: "Full implementation",
    title: "Organization-Wide Systems",
    text: "Complete architecture, custom software development, legacy data migration, multi-branch rollout, security setup, and team onboarding.",
  },
  {
    label: "Long-term retainer",
    title: "Dedicated Engineering & SLA",
    text: "Ongoing engineering capacity covering cloud operations, security maintenance, priority support, and continuous product development.",
  },
];

export const faqs = [
  {
    q: "How are projects scoped and priced?",
    a: "Every project starts with technical discovery. Once requirements are clear, we provide a fixed-scope proposal or monthly engineering retainer with defined milestones and no hidden charges.",
  },
  {
    q: "How do delivery timelines work?",
    a: "Timelines depend on system complexity, integrations, and compliance needs, and are locked during scoping. Every project ships weekly staging builds so you see steady progress from the first week.",
  },
  {
    q: "Who owns the source code and business data?",
    a: "You own 100% of the custom source code, intellectual property, domains, cloud accounts, and business data upon delivery.",
  },
  {
    q: "Will you train our staff to use the new system?",
    a: "Yes. Every major launch includes structured onboarding sessions for managers and operational staff, along with clear written guides.",
  },
  {
    q: "Do you handle hosting, monitoring, and support after launch?",
    a: "Yes. We offer ongoing SLA support covering uptime monitoring, automated backups, security updates, cloud scaling, and priority bug fixes.",
  },
  {
    q: "Can you migrate data from our old software or spreadsheets?",
    a: "Yes. We handle structured data migrations from spreadsheets or legacy databases and build API integrations with payment gateways, accounting software, and third-party tools.",
  },
];

export const sectors = [
  {
    title: "Commerce & Multi-Branch Retail",
    text: "Online storefronts, unified inventory control, and live sales visibility across multiple locations.",
  },
  {
    title: "Financial Services & FinTech",
    text: "Payment integrations, digital wallets, automated billing, reconciliation, and auditable ledgers.",
  },
  {
    title: "Logistics & Supply Chain",
    text: "Fleet, warehouse, dispatch, and settlement software built for day-to-day operational accuracy.",
  },
  {
    title: "Hospitality & Food Groups",
    text: "Integrated ordering, kitchen routing, supply tracking, and clear revenue reporting.",
  },
  {
    title: "Agribusiness & Production",
    text: "Batch tracking, yield records, procurement workflows, and wholesale order management.",
  },
  {
    title: "Enterprise & High-Growth Companies",
    text: "Corporate web platforms, AI workflows, client portals, and secure internal management software.",
  },
];

export const navLinks = [
  { label: "Capabilities", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Methodology", href: "/process" },
  { label: "Contact", href: "/contact" },
];
