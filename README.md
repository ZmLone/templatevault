# TemplateCraft — SEO-Optimized Digital Product & Template Storefront

A clean, modern, high-converting digital product and template shop built with semantic HTML5, Tailwind CSS, and modular vanilla JavaScript. Designed for instant zero-build deployment (GitHub Pages, Vercel, Netlify, Cloudflare Pages) as well as seamless integration with Stripe, Razorpay, or Lemon Squeezy.

## Key Features

- **SEO & Organic Traffic Engine**:
  - Semantic HTML5 architecture (`<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<footer>`).
  - Dynamic `<title>`, `<meta name="description">`, Open Graph tags, canonical URLs, and **Schema.org JSON-LD** (`Product`, `Offer`, `Article`, `FAQPage`) injected automatically per product and guide.
  - Pre-configured `sitemap.xml` and `robots.txt`.
- **Conversion-Focused Storefront**:
  - **Homepage (`index.html`)**: High-clarity value proposition hero, platform quick-links, featured templates grid, verified buyer social proof, and a free starter-pack lead magnet signup.
  - **Catalog (`catalog.html`)**: Instant search bar, multi-facet filtering by **Platform/Tool** (Notion, Excel/Sheets, Canva, PDF) and **Use Case/Profession** (Founders, Creators, Finance, Students, Freelancers), plus sorting (Most Popular, Price: Low to High, Price: High to Low, Newest).
  - **Product Detail Page (`product.html`)**: Clean slug-based URLs (`product.html?slug=founder-os-notion`), interactive multi-slide preview gallery, problem-solution copy, "What's Included" checklist, instant-download trust badges, interactive FAQ accordion, and sticky/prominent Buy / Free Download CTA.
  - **SEO Blog & Guides (`blog.html`)**: Editorial "How-To" tutorials designed to rank for long-tail search queries, featuring embedded "Time-Saving Shortcut" product cards that convert readers into customers.
  - **Slide-Out Cart & Mock Checkout Modal**: Persistent `localStorage` shopping cart drawer with promo code support (`SAVE20`), order summary, and a multi-gateway checkout modal ready for **Stripe**, **Razorpay**, or **Lemon Squeezy**.

## Folder Structure

```text
template-craft-store/
├── index.html              # Homepage (Hero, Featured Templates, Testimonials, Lead Magnet)
├── catalog.html            # Full Product Catalog with Search, Filters & Sorting
├── product.html            # SEO-Optimized Product Detail Page + JSON-LD Product Schema
├── blog.html               # SEO Blog Hub & Interactive Article Reader with Product Callouts
├── sitemap.xml             # XML Sitemap for Google Search Console
├── robots.txt              # Crawler directives
├── .gitignore              # Git ignore rules
├── README.md               # Documentation & setup guide
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom styles, scrollbar polish, subtle transitions
│   └── images/
│       └── og-banner.svg   # Default social sharing preview graphic
├── data/
│   └── store-data.js       # Single source of truth for Products, Blog Posts & Testimonials
└── components/
    ├── layout.js           # Shared Header, Footer, Cart Drawer & Checkout Modal
    └── app.js              # Page controllers, SEO meta injector, Cart state & Filtering
```

## Quick Start

### Option 1: Open Locally (Zero Build Required)
Because the site uses clean, dependency-free modular JavaScript and Tailwind CSS via CDN, you can run it immediately with any static server:

```bash
# Using Python
python3 -m http.server 8080

# Or using Node.js (npx)
npx serve .
```
Then open `http://localhost:8080` in your browser.

### Option 2: Deploy to GitHub & Vercel / Netlify / GitHub Pages
1. Initialize a new Git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TemplateCraft digital storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/template-craft-store.git
   git push -u origin main
   ```
2. Connect the repository to **Vercel**, **Netlify**, or enable **GitHub Pages** (`Settings > Pages > Deploy from branch: main`).

## Customizing Products & Blog Articles

Open `data/store-data.js` to add, edit, or remove templates and guides:
- **`STORE_CONFIG`**: Update your brand name, domain URL, support email, and currency symbol.
- **`PRODUCTS`**: Edit titles, `slug` (for clean SEO URLs), `platform`, `useCase`, `price`, `originalPrice`, `isFree`, `features`, `faqs`, and `checkoutUrl` (paste your real Stripe Payment Link, Razorpay Payment Page, or Lemon Squeezy checkout URL).
- **`BLOG_POSTS`**: Add new SEO tutorials and link `relatedProductSlug` to display an inline conversion card inside the article.

## Connecting Real Payment Gateways

In `components/app.js` (inside `handleCheckoutSubmit`), replace the mock payment simulation with your preferred provider:
- **Lemon Squeezy**: Open `LemonSqueezy.Url.Open(product.checkoutUrl)` using Lemon.js overlay.
- **Stripe**: Redirect to a Stripe Payment Link or call your serverless `/api/create-checkout-session` endpoint.
- **Razorpay**: Initialize `new Razorpay({ key, amount, currency, order_id, handler })`.
