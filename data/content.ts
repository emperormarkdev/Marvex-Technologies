/* ------------------------------------------------------------------ */
/*  Marvex Technologies content                                        */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: "Marvex Technologies",
  tagline:
    "Software, platforms, and digital infrastructure engineered for scale.",
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
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "websites",
    title: "Digital Platforms & Web Flagships",
    short:
      "High-performance corporate platforms engineered for authority, speed, and conversion.",
    description:
      "We design and engineer flagship web platforms with modern architectures, clean editorial systems, and structured content management so your organization communicates with clarity and speed.",
    deliverables: [
      "Bespoke visual architecture and design system",
      "Sub-second load times and technical SEO foundation",
      "Responsive engineering across every viewport",
      "Structured CMS for autonomous team publishing",
    ],
    timeline: "2 to 4 weeks",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Engineering (iOS & Android)",
    short:
      "Production mobile applications built for reliability, fluid interaction, and App Store scale.",
    description:
      "From consumer products and logistics platforms to loyalty ecosystems and internal field apps, we architect, build, and ship native-quality iOS and Android applications end to end.",
    deliverables: [
      "Unified iOS and Android engineering",
      "Authentication, push telemetry, and offline resilience",
      "Integrated card, transfer, and wallet payment rails",
      "End-to-end App Store and Google Play release",
    ],
    timeline: "6 to 12 weeks",
  },
  {
    slug: "web-apps",
    title: "Custom Web Applications & Portals",
    short:
      "Full-stack SaaS products, client portals, and multi-tenant web platforms built from the ground up.",
    description:
      "We engineer secure, scalable web applications tailored to complex workflows, giving your customers, partners, and internal teams real-time access to accounts, transactions, and analytics.",
    deliverables: [
      "Role-based customer, partner, and admin portals",
      "Real-time dashboards, reporting, and audit logs",
      "Modular API architecture and document exports",
      "High-availability cloud deployment and backups",
    ],
    timeline: "4 to 10 weeks",
  },
  {
    slug: "ecommerce",
    title: "Commerce Platforms & Marketplaces",
    short:
      "Scalable storefronts and multi-vendor marketplaces built for high-volume transactions.",
    description:
      "We engineer fast digital commerce platforms with seamless checkout, automated payment reconciliation, dynamic fulfillment logic, and unified catalog and order control.",
    deliverables: [
      "High-conversion storefront and catalog architecture",
      "Paystack, Flutterwave, and card gateway integration",
      "Automated shipping zones, taxes, and order tracking",
      "Centralized inventory and fulfillment operations",
    ],
    timeline: "3 to 6 weeks",
  },
  {
    slug: "management-systems",
    title: "Enterprise Operations & ERP Software",
    short:
      "Unified internal platforms that centralize inventory, approvals, finance, and multi-team workflows.",
    description:
      "We replace fragmented tools and manual processes with purpose-built operational software that connects inventory, procurement, HR, approvals, and executive reporting in a single system of record.",
    deliverables: [
      "Custom workflow modeling around your operations",
      "Structured migration of historical company data",
      "Granular role permissions and executive reporting",
      "Comprehensive team onboarding and documentation",
    ],
    timeline: "4 to 8 weeks",
  },
  {
    slug: "pos-systems",
    title: "Retail & Multi-Branch Infrastructure",
    short:
      "High-throughput point of sale and live multi-location inventory synchronization.",
    description:
      "Built for multi-branch retail chains, pharmacies, and hospitality groups requiring fast checkout, hardware integration, real-time stock visibility, and consolidated branch analytics.",
    deliverables: [
      "Centralized SKU catalog and pricing governance",
      "Hardware integration for scanners and thermal printers",
      "Real-time inventory sync across every location",
      "Live branch performance and audit reporting",
    ],
    timeline: "2 to 6 weeks",
  },
  {
    slug: "ui-ux-design",
    title: "Product Design & Design Systems",
    short:
      "Research-backed interfaces, interactive prototypes, and scalable component libraries.",
    description:
      "Before engineering begins, we define the product architecture, user flows, and visual language through high-fidelity clickable prototypes and token-driven design systems.",
    deliverables: [
      "User journey mapping and information architecture",
      "Interactive high-fidelity prototypes for validation",
      "Scalable multi-platform component library",
      "Engineering-ready specifications and assets",
    ],
    timeline: "1 to 3 weeks",
  },
  {
    slug: "automation",
    title: "Workflow Automation & Systems Integration",
    short:
      "Connect disparate platforms, automate operational pipelines, and eliminate manual bottlenecks.",
    description:
      "We engineer reliable integrations across payment gateways, ERPs, messaging channels, CRM tools, and AI workflows so data moves accurately across your organization in real time.",
    deliverables: [
      "Automated billing, reconciliation, and notifications",
      "Custom REST, GraphQL, and payment webhook pipelines",
      "AI-assisted customer and internal support workflows",
      "Bi-directional sync between legacy and modern tools",
    ],
    timeline: "1 to 4 weeks",
  },
  {
    slug: "support",
    title: "Cloud Architecture & Managed Reliability",
    short:
      "Hardened cloud infrastructure, automated backups, security monitoring, and SLA engineering support.",
    description:
      "We provision resilient cloud environments, custom domain and mail infrastructure, CI/CD pipelines, and continuous post-launch engineering to keep critical systems fast and secure.",
    deliverables: [
      "Cloud infrastructure, DNS, and enterprise email setup",
      "Automated backups, patching, and security audits",
      "Uptime monitoring and performance optimization",
      "Dedicated SLA engineering response and maintenance",
    ],
    timeline: "Retainer or SLA",
  },
];

export const processSteps = [
  {
    no: "01",
    title: "Discovery & Systems Audit",
    summary: "Align on commercial goals, technical requirements, and constraints.",
    duration: "3 to 5 days",
    text: "We work directly with your stakeholders to map operational requirements, technical dependencies, user journeys, and success metrics before defining the solution.",
    output: "Technical discovery brief and system requirements",
    needs: "Stakeholder alignment and access to existing workflows",
  },
  {
    no: "02",
    title: "Architecture & Fixed Scope",
    summary: "Detailed technical roadmap, milestones, and transparent commercial terms.",
    duration: "3 to 5 days",
    text: "We deliver a clear system architecture, milestone schedule, and fixed commercial proposal so scope, timelines, and deliverables are locked before engineering starts.",
    output: "System blueprint, delivery schedule, and fixed proposal",
    needs: "Formal sign-off on scope and milestones",
  },
  {
    no: "03",
    title: "Design & Iterative Engineering",
    summary: "Weekly production-grade builds deployed to a private staging environment.",
    duration: "2 to 8 weeks",
    text: "Design and engineering run in structured weekly sprints. Every milestone is deployed to a live staging URL so your team can review progress and verify functionality continuously.",
    output: "Weekly staging deployments and milestone reviews",
    needs: "Structured weekly feedback from your product lead",
  },
  {
    no: "04",
    title: "Migration, QA & Deployment",
    summary: "End-to-end testing, data migration, production cutover, and team enablement.",
    duration: "1 to 2 weeks",
    text: "We execute automated and manual QA, migrate historical data cleanly, deploy to hardened cloud infrastructure, and onboard your operational teams with clear documentation.",
    output: "Production launch, verified data migration, and playbooks",
    needs: "Final UAT sign-off and team onboarding sessions",
  },
  {
    no: "05",
    title: "Managed Reliability & Evolution",
    summary: "Continuous monitoring, security updates, and iterative feature delivery.",
    duration: "Ongoing",
    text: "Post-launch, our engineers remain engaged for proactive monitoring, automated backups, infrastructure scaling, and ongoing product iterations as your organization grows.",
    output: "SLA-backed uptime, updates, and technical partnership",
    needs: "Periodic roadmap reviews as priorities evolve",
  },
];

export const engagementModels = [
  {
    label: "01 / FOCUSED DELIVERY",
    title: "Product & Platform Sprint",
    text: "Dedicated design and engineering for a flagship web platform, mobile MVP, or targeted operational module with fixed scope and delivery dates.",
  },
  {
    label: "02 / END-TO-END TRANSFORMATION",
    title: "Full Systems Implementation",
    text: "Complete architecture, custom software engineering, legacy data migration, multi-branch rollout, and structured team onboarding.",
  },
  {
    label: "03 / LONG-TERM PARTNERSHIP",
    title: "Dedicated Engineering & SLA",
    text: "Ongoing engineering capacity covering infrastructure management, security maintenance, SLA support, and continuous product evolution.",
  },
];

export const faqs = [
  {
    q: "How are engagements scoped and priced?",
    a: "Every engagement begins with a focused technical discovery. From there, we provide a transparent fixed-scope proposal or retainer structure with clear milestones and zero hidden costs.",
  },
  {
    q: "What are typical delivery timelines?",
    a: "Flagship web platforms typically ship in 2 to 4 weeks. Commerce platforms take 3 to 6 weeks. Custom web applications, mobile apps, and enterprise operational systems range from 4 to 12 weeks depending on scope.",
  },
  {
    q: "Who retains ownership of source code and data?",
    a: "Your organization retains 100% ownership of all custom source code, intellectual property, domains, cloud accounts, and operational data upon delivery.",
  },
  {
    q: "How do you handle team onboarding and adoption?",
    a: "Every major deployment includes structured training sessions for leadership and operational staff, backed by concise usage documentation so teams adopt new systems smoothly.",
  },
  {
    q: "Do you provide post-launch support and infrastructure management?",
    a: "Yes. We offer ongoing SLA plans covering proactive monitoring, automated backups, security updates, performance tuning, and priority engineering response.",
  },
  {
    q: "Can you migrate data and integrate with existing systems?",
    a: "Yes. We handle structured migrations from spreadsheets or legacy databases and engineer API integrations with payment gateways, accounting tools, and third-party platforms.",
  },
];

export const sectors = [
  {
    title: "Commerce & Multi-Branch Retail",
    text: "High-throughput storefronts, unified inventory control, and real-time multi-location operational visibility.",
  },
  {
    title: "Hospitality & Food Systems",
    text: "Integrated ordering workflows, kitchen routing, supply tracking, and live revenue analytics.",
  },
  {
    title: "Logistics & Supply Chain",
    text: "End-to-end fleet, warehouse, dispatch, and settlement platforms built for operational accuracy.",
  },
  {
    title: "Agribusiness & Production",
    text: "Batch traceability, yield management, procurement tracking, and wholesale distribution systems.",
  },
  {
    title: "High-Growth Ventures",
    text: "Scalable web and mobile products engineered to take new digital business models from launch to scale.",
  },
  {
    title: "Enterprise & Professional Services",
    text: "Flagship web platforms, client portals, workflow automation, and secure internal management systems.",
  },
];

export const navLinks = [
  { label: "Capabilities", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Methodology", href: "/process" },
  { label: "Contact", href: "/contact" },
];
