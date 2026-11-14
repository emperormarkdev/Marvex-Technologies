/* ------------------------------------------------------------------ */
/*  Marvex Technologies content                                        */
/* ------------------------------------------------------------------ */

export const siteConfig = {
  name: "Marvex Technologies",
  tagline: "Websites, apps, and software built to help your business grow.",
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
    title: "Company Websites",
    short:
      "Fast, modern websites that make your business look credible and win new customers.",
    description:
      "We design and build clean, professional websites that clearly explain what you do and make it easy for customers to reach you. Your team can update text and photos anytime without stress.",
    deliverables: [
      "Custom design tailored to your brand",
      "Works smoothly on every phone and laptop",
      "Google search setup so customers find you",
      "Easy dashboard for quick updates",
    ],
    timeline: "2 to 4 weeks",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps (iOS & Android)",
    short:
      "Custom mobile apps your customers can download on iPhone and Android.",
    description:
      "Whether you are launching a delivery service, a booking app, a customer loyalty app, or a new product idea, we design and build smooth mobile apps for both the App Store and Google Play.",
    deliverables: [
      "iOS and Android apps from one clean build",
      "Push notifications and customer accounts",
      "Card and bank transfer payments built in",
      "Full publishing to the App Store and Google Play",
    ],
    timeline: "6 to 12 weeks",
  },
  {
    slug: "web-apps",
    title: "Custom Web Apps & Portals",
    short:
      "Full web platforms where your customers or staff can log in, book, order, and track records.",
    description:
      "We build custom web platforms and client portals around your business model, giving your customers or team a dedicated place to sign in, place requests, view statements, and manage work from any device.",
    deliverables: [
      "Custom customer or staff login portal",
      "Admin dashboard to manage users and activity",
      "Quick reports and file downloads",
      "Safe cloud hosting and automatic backups",
    ],
    timeline: "4 to 10 weeks",
  },
  {
    slug: "ecommerce",
    title: "Online Stores & Marketplaces",
    short:
      "Sell your products online with smooth checkout, instant payments, and delivery tracking.",
    description:
      "A fast online shop or multi vendor marketplace where customers can browse your products, pay easily with cards or bank transfers, and track their orders while your team manages everything from one screen.",
    deliverables: [
      "Clean online storefront and product catalog",
      "Paystack, Flutterwave, and card payment setup",
      "Automatic delivery fees by location",
      "Simple order and stock management for your team",
    ],
    timeline: "3 to 6 weeks",
  },
  {
    slug: "management-systems",
    title: "Business & Operations Software",
    short:
      "Replace scattered spreadsheets and paper notebooks with one simple system built for your team.",
    description:
      "We look at how your company runs every day and build custom software that brings your inventory, bookings, staff records, invoicing, and manager approvals together in one organized place.",
    deliverables: [
      "Built around how your business actually works",
      "Move your existing records over smoothly",
      "Separate logins and permissions for staff and managers",
      "Clear step by step staff training",
    ],
    timeline: "4 to 8 weeks",
  },
  {
    slug: "pos-systems",
    title: "POS & Retail Systems",
    short:
      "Fast checkout, barcode scanning, and live stock tracking across one shop or multiple branches.",
    description:
      "Everything you need to run a busy store, pharmacy, restaurant, or supermarket. Ring up customers quickly, see what is in stock across all your branches, and check your daily sales from anywhere.",
    deliverables: [
      "Product list and pricing setup",
      "Barcode scanner and receipt printer setup",
      "Automatic stock updates across branches",
      "Practical training for cashiers and managers",
    ],
    timeline: "2 to 6 weeks",
  },
  {
    slug: "ui-ux-design",
    title: "Product & UI/UX Design",
    short:
      "Clear, modern screen designs and clickable prototypes before a single line of code is written.",
    description:
      "Have a new app idea or an existing website that feels outdated and confusing? We design clean, easy to use screens you can click through and test before we build the final product.",
    deliverables: [
      "Clickable preview of your website or app",
      "Clean, easy layout for mobile and desktop",
      "Consistent colors, fonts, and visual style",
      "Ready to build design files for development",
    ],
    timeline: "1 to 3 weeks",
  },
  {
    slug: "automation",
    title: "Business Automation & Integrations",
    short:
      "Connect your tools and automate repetitive daily tasks like invoices, alerts, and follow ups.",
    description:
      "Save your team hours of manual work every week. We connect your website, payment gateways, WhatsApp or SMS alerts, email, and accounting tools so information flows automatically without double entry.",
    deliverables: [
      "Automatic receipts, invoices, and customer alerts",
      "Payment gateway and bank webhook connections",
      "Smart chat assistants for common customer questions",
      "Custom links between your existing software tools",
    ],
    timeline: "1 to 4 weeks",
  },
  {
    slug: "support",
    title: "Cloud Setup & Ongoing Support",
    short:
      "Reliable hosting, company emails, regular backups, and fast help after your project launches.",
    description:
      "We set up your domain, custom company emails, and secure cloud servers, and we stay available after launch to handle updates, backups, and quick fixes whenever your team needs a hand.",
    deliverables: [
      "Custom domain and professional company email setup",
      "Regular software updates and security checks",
      "Automatic backups of your business data",
      "Fast support whenever you call or message",
    ],
    timeline: "Monthly or yearly plans",
  },
];

export const processSteps = [
  {
    no: "01",
    title: "We Listen & Learn",
    summary: "Understand your business and daily routine.",
    duration: "3 to 5 days",
    text: "We sit down with you to understand your business, what you want to build or improve, and what your team needs every day.",
    output: "Clear project summary",
    needs: "A quick chat about how your business runs",
  },
  {
    no: "02",
    title: "Clear Plan & Fixed Price",
    summary: "Know the exact plan, delivery date, and cost upfront.",
    duration: "3 to 5 days",
    text: "We give you a simple plan showing what we will build, when it will be ready, and the exact cost with no hidden fees.",
    output: "Agreed plan, delivery date and fixed price",
    needs: "Your approval to get started",
  },
  {
    no: "03",
    title: "Design & Build",
    summary: "Watch your project come to life with weekly previews.",
    duration: "2 to 8 weeks",
    text: "We build your project and show you progress every week on a private link so you can try it out and share feedback.",
    output: "Weekly live previews you can click through",
    needs: "A quick weekly check in with us",
  },
  {
    no: "04",
    title: "Launch & Staff Training",
    summary: "Full setup, record migration, and practical team training.",
    duration: "1 to 2 weeks",
    text: "We set everything up, move your existing product lists or records over, and train your staff until everyone is comfortable.",
    output: "Live website, app, or system and trained team",
    needs: "Time with your staff for training",
  },
  {
    no: "05",
    title: "Ongoing Support",
    summary: "Continuous updates, backups, and fast help after launch.",
    duration: "Ongoing",
    text: "After launch, we stay by your side to keep everything running smoothly, handle backups, and help whenever you need us.",
    output: "Peace of mind and a team you can call anytime",
    needs: "Just reach out whenever you need help",
  },
];

export const engagementModels = [
  {
    label: "Start Small",
    title: "Single Project or Pilot",
    text: "Launch a new website, app prototype, or single branch system first. See the results before rolling it out across your whole business.",
  },
  {
    label: "Full Setup",
    title: "Full Business Setup",
    text: "Complete design, development, moving your existing records over, and training your whole team across all your branches.",
  },
  {
    label: "Ongoing Care",
    title: "Monthly or Yearly Care",
    text: "Regular care covering updates, backups, new features, and fast support whenever your team needs a hand.",
  },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "Every project is different, so we give you a clear, fixed price after a quick discovery chat. You will know the exact total before we start, with no surprise charges along the way.",
  },
  {
    q: "How long does it take to launch?",
    a: "Company websites usually take 2 to 4 weeks. Online stores take 3 to 6 weeks. Mobile apps and custom business software take 4 to 12 weeks depending on what we are building.",
  },
  {
    q: "Do we own our website, app, and data?",
    a: "Yes, 100%. Everything we build for you, including your website, mobile app, domain, and business records, belongs completely to you.",
  },
  {
    q: "Will you teach our staff how to use it?",
    a: "Absolutely. We train your team, managers, and staff step by step until everyone is confident using the new system.",
  },
  {
    q: "What happens if we need help after launch?",
    a: "We are always a phone call or message away. You can also join our ongoing care plan for regular updates, backups, and priority support.",
  },
  {
    q: "Can we move our existing lists and records over?",
    a: "Yes. If you already have products, customer lists, or records in Excel or an old system, we will move them into your new platform for you.",
  },
];

export const sectors = [
  {
    title: "Retail & Supermarkets",
    text: "Fast checkout, barcode scanning, and live stock tracking across single or multiple shops.",
  },
  {
    title: "Restaurants & Hospitality",
    text: "Simple order taking, kitchen tickets, stock tracking, and clear daily sales summaries.",
  },
  {
    title: "Distribution & Logistics",
    text: "Track warehouse stock, deliveries, customer orders, and payments in one organized place.",
  },
  {
    title: "Farms & Food Businesses",
    text: "Keep clear records of harvests, supplies, processing batches, and wholesale orders.",
  },
  {
    title: "Growing Businesses & SMEs",
    text: "Modern websites and online stores that help customers find you, trust you, and buy from you.",
  },
  {
    title: "Corporate & Services",
    text: "Professional company websites, booking systems, and client portals that save your team time.",
  },
];

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "How We Work", href: "/process" },
  { label: "Contact", href: "/contact" },
];
