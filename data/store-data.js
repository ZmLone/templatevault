/**
 * TemplateCraft Store Data
 * Edit this file to update products, pricing, categories, testimonials, and SEO blog guides.
 */

const STORE_CONFIG = {
  brandName: "TemplateCraft",
  tagline: "Save hours with ready-to-use templates",
  domain: "https://templatecraft.store",
  supportEmail: "hello@templatecraft.store",
  currency: "$",
  promoCode: {
    code: "SAVE20",
    discountPercent: 20,
    label: "20% OFF Launch Discount"
  }
};

const PLATFORMS = ["All", "Notion", "Excel/Sheets", "Canva", "PDF"];

const USE_CASES = [
  "All",
  "Founders & Startups",
  "Content Creators",
  "Finance & Operations",
  "Freelancers & Agencies",
  "Students & Productivity"
];

const PRODUCTS = [
  {
    id: "prod-01",
    slug: "startup-founder-os-notion",
    title: "Startup Founder OS — All-in-One Notion Workspace",
    shortTitle: "Startup Founder OS",
    platform: "Notion",
    useCase: "Founders & Startups",
    price: 39,
    originalPrice: 59,
    isFree: false,
    featured: true,
    bestseller: true,
    popularityScore: 99,
    createdAt: "2026-10-15",
    rating: 4.9,
    reviewCount: 214,
    fileFormat: "Notion Template Link (1-Click Duplicate)",
    fileSize: "Instant Cloud Duplicate + 18-Page Setup Guide",
    metaDescription: "Run your entire startup in one clean Notion workspace. Includes OKRs, investor CRM, product roadmap, sprint tracker, and SOP hub. Instant download.",
    headline: "Stop scattering company operations across 9 disconnected tools.",
    problemSolution: "Early-stage founders lose 6+ hours every week hunting for investor notes, updating sprint boards, and rewriting onboarding SOPs. Startup Founder OS centralizes your OKRs, fundraising pipeline, product roadmap, and team wiki into a single connected Notion system you can duplicate in 30 seconds.",
    badgeColor: "bg-slate-900 text-white",
    accentGradient: "from-indigo-600 via-blue-600 to-cyan-500",
    screenshots: [
      {
        title: "Executive Command Center",
        subtitle: "Quarterly OKRs, cash runway pulse & weekly priorities in one view",
        mockupType: "dashboard"
      },
      {
        title: "Investor Fundraising CRM",
        subtitle: "Kanban pipeline with warm intro tracking, check sizes & follow-up reminders",
        mockupType: "kanban"
      },
      {
        title: "Product Roadmap & Sprint Board",
        subtitle: "Prioritize features by impact vs. effort with automated status rollups",
        mockupType: "table"
      }
    ],
    whatsIncluded: [
      "Executive Command Center Dashboard with live KPI rollups",
      "Investor CRM & Fundraising Pipeline (Pre-Seed to Series A)",
      "Agile Product Roadmap, Bug Tracker & Release Notes database",
      "Company Wiki, Hiring Scorecard & Employee Onboarding SOPs",
      "Meeting Notes hub with automated action-item filtering",
      "25-minute Loom walkthrough + lifetime free updates"
    ],
    faqs: [
      {
        q: "Does this work with the free Notion plan?",
        a: "Yes! Every database, relation, and formula in Startup Founder OS is 100% compatible with Notion's Free Personal Plan."
      },
      {
        q: "How do I receive the template after purchase?",
        a: "Immediately after checkout, you'll receive an instant download link containing your Notion template URL and step-by-step duplication instructions."
      },
      {
        q: "Can I share this workspace with my co-founders or team?",
        a: "Yes. Once duplicated into your Notion account, you can invite team members or share pages using your standard Notion workspace permissions."
      }
    ],
    checkoutUrl: "https://buy.stripe.com/example-founder-os"
  },
  {
    id: "prod-02",
    slug: "saas-financial-model-excel",
    title: "3-Year SaaS & Startup Financial Model (Excel & Google Sheets)",
    shortTitle: "3-Year SaaS Financial Model",
    platform: "Excel/Sheets",
    useCase: "Finance & Operations",
    price: 49,
    originalPrice: 79,
    isFree: false,
    featured: true,
    bestseller: true,
    popularityScore: 96,
    createdAt: "2026-10-28",
    rating: 4.9,
    reviewCount: 168,
    fileFormat: ".XLSX + Google Sheets Template",
    fileSize: "2.4 MB (Unlocked Formulas)",
    metaDescription: "Investor-ready 3-year SaaS financial model for Excel and Google Sheets. Automated MRR, churn, CAC/LTV, burn rate, P&L, and cash flow forecasts.",
    headline: "Build an investor-grade 36-month financial forecast without hiring a fractional CFO.",
    problemSolution: "Blank spreadsheets lead to broken formulas, underestimated burn rates, and awkward investor due-diligence calls. Our unlocked 3-Year SaaS Financial Model comes pre-built with dynamic MRR cohort waterfalls, hiring plans, CAC/LTV unit economics, and automated P&L, Balance Sheet, and Cash Flow statements.",
    badgeColor: "bg-emerald-700 text-white",
    accentGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    screenshots: [
      {
        title: "Executive KPI & Runway Dashboard",
        subtitle: "Auto-generated ARR, net burn, gross margin & cash-zero date charts",
        mockupType: "chart"
      },
      {
        title: "MRR & Cohort Revenue Engine",
        subtitle: "Model tiered pricing, expansion MRR, and monthly logo churn",
        mockupType: "table"
      },
      {
        title: "3-Statement Financial Summary",
        subtitle: "GAAP-structured Income Statement, Cash Flow & Hiring Budget",
        mockupType: "dashboard"
      }
    ],
    whatsIncluded: [
      "Unlocked Microsoft Excel (.xlsx) & Google Sheets versions",
      "Dynamic 36-month MRR, ARR, Churn & Expansion revenue model",
      "Headcount & Payroll planner with taxes/benefits assumptions",
      "Automated Income Statement (P&L), Cash Flow & Unit Economics tabs",
      "Scenario Toggle (Base Case, Best Case, Conservative)",
      "Color-coded inputs (blue = edit, black = automated formula)"
    ],
    faqs: [
      {
        q: "Are the formulas locked or password-protected?",
        a: "Nothing is locked. You get full access to every formula so you can customize assumptions for your exact business model."
      },
      {
        q: "Does it work in both Microsoft Excel and Google Sheets?",
        a: "Yes, your download includes a native .xlsx file optimized for Excel 2019/365 plus a 1-click Google Sheets copy link."
      },
      {
        q: "Do I need advanced accounting knowledge to use it?",
        a: "No. Simply fill in the blue assumption cells (pricing, ad spend, salaries) and all statements and investor charts update automatically."
      }
    ],
    checkoutUrl: "https://buy.stripe.com/example-saas-model"
  },
  {
    id: "prod-03",
    slug: "creator-brand-kit-canva",
    title: "Minimalist Creator & Carousel Social Media Kit (120+ Canva Templates)",
    shortTitle: "Creator Carousel & Brand Kit",
    platform: "Canva",
    useCase: "Content Creators",
    price: 29,
    originalPrice: 45,
    isFree: false,
    featured: true,
    bestseller: false,
    popularityScore: 93,
    createdAt: "2026-11-04",
    rating: 4.8,
    reviewCount: 142,
    fileFormat: "Canva Template Links (Free & Pro Compatible)",
    fileSize: "120+ Editable Layouts",
    metaDescription: "120+ high-converting Canva carousel, LinkedIn post, Instagram story, and YouTube thumbnail templates for creators and digital brands.",
    headline: "Publish high-authority carousels and social graphics in 10 minutes instead of 3 hours.",
    problemSolution: "Consistent content drives organic leads, but designing every LinkedIn carousel, Instagram post, and lead-magnet cover from scratch causes creator burnout. This 120-template Canva suite gives you cohesive editorial typography, data-chart slides, and high-converting CTA frames you can rebrand in one click.",
    badgeColor: "bg-violet-700 text-white",
    accentGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    screenshots: [
      {
        title: "60 Seamless Carousel Slides",
        subtitle: "Hook covers, step-by-step frameworks, comparison tables & CTA endings",
        mockupType: "cards"
      },
      {
        title: "30 Lead Magnet & E-Book Covers",
        subtitle: "Clean mockups for checklists, Notion guides & mini-courses",
        mockupType: "dashboard"
      },
      {
        title: "30 YouTube & Newsletter Banners",
        subtitle: "High-contrast thumbnail grids designed for mobile click-through",
        mockupType: "kanban"
      }
    ],
    whatsIncluded: [
      "60 LinkedIn & Instagram Seamless Carousel Slides (1080×1350px)",
      "30 Lead Magnet, Cheat Sheet & Digital Product Mockup Covers",
      "30 Newsletter Headers & YouTube Thumbnail Templates",
      "Curated Font Pairing & Hex Color Palette Swatch Guide",
      "100% compatible with Canva Free (no Canva Pro elements required)"
    ],
    faqs: [
      {
        q: "Do I need a paid Canva Pro subscription?",
        a: "No! Every font, grid, and graphic element used in this kit is available on a free Canva account."
      },
      {
        q: "Can I use these templates for client work?",
        a: "Yes, your license covers both personal brand content and unlimited client social media management projects."
      }
    ],
    checkoutUrl: "https://buy.stripe.com/example-canva-kit"
  },
  {
    id: "prod-04",
    slug: "freelance-client-portal-notion",
    title: "Freelance & Agency Client Portal Pack (Notion)",
    shortTitle: "Freelance Client Portal",
    platform: "Notion",
    useCase: "Freelancers & Agencies",
    price: 24,
    originalPrice: 39,
    isFree: false,
    featured: true,
    bestseller: false,
    popularityScore: 90,
    createdAt: "2026-11-10",
    rating: 4.9,
    reviewCount: 97,
    fileFormat: "Notion Template Link",
    fileSize: "Instant Cloud Duplicate",
    metaDescription: "Impress freelance clients with a branded Notion client portal. Track deliverables, invoices, feedback rounds, and project timelines effortlessly.",
    headline: "Look like a $20k/month agency from your very first client kickoff.",
    problemSolution: "Chasing client approvals across messy email threads and Slack messages leads to scope creep and delayed invoices. Give every client a clean, shared Notion hub with live project milestones, deliverable review checklists, embedded Loom updates, and invoice trackers.",
    badgeColor: "bg-slate-900 text-white",
    accentGradient: "from-sky-600 via-indigo-600 to-slate-800",
    screenshots: [
      {
        title: "Shared Client Home Portal",
        subtitle: "Live project status bar, key links, contract scope & next steps",
        mockupType: "dashboard"
      },
      {
        title: "Deliverable Approval Tracker",
        subtitle: "Clear 'In Review' vs 'Approved' states to eliminate revision bottlenecks",
        mockupType: "kanban"
      }
    ],
    whatsIncluded: [
      "Master Agency Command Center (manage all active clients)",
      "Cloneable Client-Facing Portal Template",
      "Scope of Work, Proposal & Onboarding Questionnaire pages",
      "Invoice & Retainer Payment Status Tracker",
      "Offboarding & Testimonial Request Checklist"
    ],
    faqs: [
      {
        q: "Can my clients view the portal without paying for Notion?",
        a: "Yes. You can share any Notion page via a private web link or invite clients as free guests."
      }
    ],
    checkoutUrl: "https://buy.stripe.com/example-client-portal"
  },
  {
    id: "prod-05",
    slug: "personal-budget-tracker-sheets",
    title: "Zero-Based Wealth & Net Worth Tracker (Google Sheets & Excel)",
    shortTitle: "Wealth & Budget Tracker",
    platform: "Excel/Sheets",
    useCase: "Students & Productivity",
    price: 0,
    originalPrice: 19,
    isFree: true,
    featured: true,
    bestseller: true,
    popularityScore: 98,
    createdAt: "2026-11-14",
    rating: 4.9,
    reviewCount: 430,
    fileFormat: "Google Sheets + .XLSX",
    fileSize: "Free Starter Template",
    metaDescription: "Free automated monthly budget, expense, and net worth spreadsheet for Google Sheets and Excel. Track savings rate and cash flow in minutes.",
    headline: "Master your monthly cash flow and savings rate in 15 minutes a month.",
    problemSolution: "Most budgeting apps overwhelm you with noisy notifications or lock basic net-worth charts behind monthly subscriptions. This clean, automated spreadsheet gives you instant visibility into income, fixed vs. variable expenses, sinking funds, and net worth growth—completely free.",
    badgeColor: "bg-amber-500 text-slate-950",
    accentGradient: "from-amber-500 via-orange-500 to-rose-500",
    screenshots: [
      {
        title: "Annual Cash Flow & Savings Dashboard",
        subtitle: "Visual breakdown of needs, wants, investments & savings rate",
        mockupType: "chart"
      },
      {
        title: "Monthly Transaction Log",
        subtitle: "Dropdown categories with automatic budget-vs-actual variance bars",
        mockupType: "table"
      }
    ],
    whatsIncluded: [
      "12-Month Automated Budget & Expense Tracker",
      "Net Worth & Debt Payoff Snowball Calculator",
      "Visual Savings Rate & Category Breakdown Charts",
      "Works in both Google Sheets and Microsoft Excel"
    ],
    faqs: [
      {
        q: "Is this template really 100% free?",
        a: "Yes! Enter $0 at checkout or click Download Free to get instant access—no credit card required."
      }
    ],
    checkoutUrl: "#free-download"
  },
  {
    id: "prod-06",
    slug: "deep-work-planner-pdf",
    title: "90-Day Deep Work & Quarterly Execution Planner (Printable & GoodNotes PDF)",
    shortTitle: "90-Day Deep Work PDF Planner",
    platform: "PDF",
    useCase: "Students & Productivity",
    price: 15,
    originalPrice: 25,
    isFree: false,
    featured: false,
    bestseller: false,
    popularityScore: 86,
    createdAt: "2026-11-17",
    rating: 4.8,
    reviewCount: 74,
    fileFormat: "Hyperlinked Interactive PDF (A4 & US Letter)",
    fileSize: "4.8 MB (140 Hyperlinked Pages)",
    metaDescription: "Hyperlinked 90-day productivity and deep work PDF planner for iPad GoodNotes, Remarkable, and print. Time-block daily priorities and weekly reviews.",
    headline: "Turn ambitious 90-day goals into calm, distraction-free daily execution.",
    problemSolution: "Endless digital to-do lists encourage busywork over meaningful progress. Built around time-blocking and weekly reflection, this hyperlinked PDF works seamlessly on iPad (GoodNotes/Notability), reMarkable tablets, or printed on A4/Letter paper.",
    badgeColor: "bg-rose-700 text-white",
    accentGradient: "from-rose-600 via-pink-600 to-indigo-600",
    screenshots: [
      {
        title: "Daily Time-Blocking Sheet",
        subtitle: "Top 3 MITs (Most Important Tasks), 30-min time grid & distraction log",
        mockupType: "cards"
      },
      {
        title: "Weekly & 90-Day Milestone Map",
        subtitle: "Clickable tabs connecting quarterly targets to weekly sprints",
        mockupType: "dashboard"
      }
    ],
    whatsIncluded: [
      "140-page Hyperlinked PDF (clickable tabs for every week & day)",
      "Includes both A4 and US Letter print-ready PDFs",
      "Compatible with GoodNotes, Notability, Kindle Scribe & reMarkable",
      "Weekly Retrospective & Habit Consistency Matrix"
    ],
    faqs: [
      {
        q: "Can I print this planner at home or at a local print shop?",
        a: "Yes. We include dedicated high-resolution 300 DPI files in both US Letter (8.5×11 in) and A4 sizes."
      }
    ],
    checkoutUrl: "https://buy.stripe.com/example-deep-work-pdf"
  }
];

const TESTIMONIALS = [
  {
    name: "Elena Rostova",
    role: "Seed Founder, MetricPulse",
    quote: "Startup Founder OS replaced four separate subscriptions on day one. Our investor updates and sprint planning now live in one clean workspace.",
    productPurchased: "Startup Founder OS",
    initials: "ER"
  },
  {
    name: "Marcus Vance",
    role: "B2B SaaS Operator",
    quote: "Used the 3-Year SaaS Financial Model to prepare for our $1.2M angel round. Two investors specifically complimented the clarity of our unit economics tab.",
    productPurchased: "3-Year SaaS Financial Model",
    initials: "MV"
  },
  {
    name: "Priya Nair",
    role: "Independent Brand Strategist",
    quote: "The Canva Carousel Kit cut my weekly LinkedIn content production from 4 hours down to 35 minutes—and my saves per post doubled.",
    productPurchased: "Creator Carousel & Brand Kit",
    initials: "PN"
  }
];

const BLOG_POSTS = [
  {
    id: "guide-01",
    slug: "how-to-organize-startup-operations-in-notion",
    title: "How to Organize Your Entire Startup in Notion (Step-by-Step 2026 Blueprint)",
    category: "Productivity & Systems",
    readTime: "6 min read",
    publishedAt: "November 12, 2026",
    author: "Daniel Mercer, Systems Architect",
    metaDescription: "Learn how early-stage founders structure Notion workspaces for OKRs, investor fundraising CRMs, product roadmaps, and team SOPs without database bloat.",
    excerpt: "Most startup Notion workspaces collapse under nested pages within 60 days. Here is the exact 4-database architecture high-velocity teams use to stay aligned.",
    relatedProductSlug: "startup-founder-os-notion",
    ctaHook: "Want to skip 15+ hours of database setup? Duplicate our pre-built Startup Founder OS in 30 seconds.",
    content: `
      <p>When a startup grows from 2 co-founders to 12 team members, tribal knowledge breaks down fast. Decisions get buried in chat threads, investor follow-ups slip through the cracks, and nobody knows which roadmap document is the source of truth.</p>
      <h2>Why Most Startup Notion Setups Fail</h2>
      <p>The #1 mistake founders make is creating isolated pages for every project instead of connecting <strong>relational master databases</strong>. When tasks, meeting notes, and quarterly goals live in separate silos, your team spends more time updating tools than shipping product.</p>
      <h2>The 4-Database Architecture That Scales</h2>
      <ol>
        <li><strong>Master Objectives (OKRs):</strong> Every company initiative ties back to 3–4 measurable quarterly outcomes.</li>
        <li><strong>Product & Engineering Roadmap:</strong> Linked directly to OKRs so engineers see why a feature matters, not just the ticket description.</li>
        <li><strong>Investor & Partner CRM:</strong> Track stage, check size, last contact date, and warm intro paths in a clean Kanban pipeline.</li>
        <li><strong>Company Wiki & SOP Hub:</strong> Single-page checklists for onboarding, customer support, and weekly KPI reviews.</li>
      </ol>
      <blockquote>"Your operating system should reduce cognitive load. If a teammate needs more than two clicks to find a metric or SOP, the system is too complex."</blockquote>
      <h2>Weekly Execution Cadence</h2>
      <p>Run every Monday standup from a single filtered view showing only <em>This Week's Priorities</em> and <em>Blocked Items</em>. Archive completed sprints automatically using date filters so your dashboard stays fast and clutter-free.</p>
    `
  },
  {
    id: "guide-02",
    slug: "saas-financial-modeling-guide-for-founders",
    title: "How to Build an Investor-Ready SaaS Financial Model in Excel & Google Sheets",
    category: "Finance & Fundraising",
    readTime: "8 min read",
    publishedAt: "November 15, 2026",
    author: "Claire Bennett, Startup Finance Advisor",
    metaDescription: "Step-by-step guide to modeling SaaS MRR, net dollar retention, CAC payback, burn rate, and 36-month cash runway for seed investors.",
    excerpt: "Investors don't expect your 3-year projections to be psychic—they test whether you understand the levers driving MRR, churn, and burn rate.",
    relatedProductSlug: "saas-financial-model-excel",
    ctaHook: "Skip blank-spreadsheet errors. Grab our unlocked 3-Year SaaS Financial Model with pre-built MRR cohorts & P&L statements.",
    content: `
      <p>Whether you are raising a pre-seed round or managing bootstrap profitability, a bottom-up financial model is your sharpest decision-making tool. Unlike top-down guesses ("if we capture 1% of a $10B market"), a bottom-up model connects real customer acquisition inputs to cash in the bank.</p>
      <h2>5 Metrics Every Seed Investor Checks First</h2>
      <ul>
        <li><strong>Net New MRR Breakdown:</strong> Separate New Logo MRR, Expansion MRR, and Churned MRR so growth quality is transparent.</li>
        <li><strong>Gross Margin:</strong> Factor in hosting, third-party API costs, and customer onboarding support—not just payment processing fees.</li>
        <li><strong>CAC Payback Period:</strong> How many months of gross margin it takes to recover your customer acquisition cost.</li>
        <li><strong>Net Burn & Runway:</strong> Exact monthly cash outflow and the date your cash balance hits zero under conservative assumptions.</li>
      </ul>
      <h2>Best Practices for Clean Spreadsheet Hygiene</h2>
      <p>Keep all hardcoded assumptions on a single <strong>Inputs</strong> tab formatted in blue font, while keeping formulas in black font on calculation tabs. Never hardcode numbers inside a formula—it makes scenario testing impossible during live investor calls.</p>
    `
  },
  {
    id: "guide-03",
    slug: "high-converting-linkedin-carousel-framework",
    title: "The 7-Slide LinkedIn & Instagram Carousel Framework That Doubles Saves",
    category: "Creator Growth",
    readTime: "5 min read",
    publishedAt: "November 18, 2026",
    author: "Maya Lin, Editorial Designer",
    metaDescription: "Learn the exact 7-slide visual hierarchy, typography sizing, and hook structure to design viral educational carousels in Canva.",
    excerpt: "Educational carousels consistently outperform single-image posts for organic reach and newsletter signups. Use this repeatable 7-slide layout formula.",
    relatedProductSlug: "creator-brand-kit-canva",
    ctaHook: "Want 60+ done-for-you carousel slides in Canva? Download our Minimalist Creator Brand Kit.",
    content: `
      <p>Algorithms reward dwell time and saves. When a reader swipes through a well-paced carousel, they spend 20 to 40 seconds engaging with your ideas—signaling high authority and driving organic profile visits.</p>
      <h2>The 7-Slide Visual Blueprint</h2>
      <ol>
        <li><strong>Slide 1 (The Hook):</strong> Big bold promise (48pt+ font), high contrast, and a clear visual cue to swipe right.</li>
        <li><strong>Slide 2 (The Agitation):</strong> Name the costly mistake your audience is making right now.</li>
        <li><strong>Slides 3–5 (The Core Framework):</strong> One actionable takeaway per slide with generous whitespace (at least 30% open margin).</li>
        <li><strong>Slide 6 (Summary Cheat Sheet):</strong> A recap card designed specifically to be bookmarked and saved.</li>
        <li><strong>Slide 7 (Single Clear CTA):</strong> Point readers to your newsletter lead magnet or flagship template.</li>
      </ol>
      <p>Stick to two brand fonts maximum and keep body text at 24pt or larger so every slide reads effortlessly on mobile screens.</p>
    `
  }
];
