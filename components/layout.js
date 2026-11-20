/**
 * Shared UI Layout Components: Navbar, Footer, Slide-Out Cart Drawer, and Checkout Modal
 */

function renderNavbar(activePage) {
  const navLinks = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "catalog.html", label: "Templates", id: "catalog" },
    { href: "blog.html", label: "SEO Guides & Blog", id: "blog" }
  ];

  return `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand Logo -->
          <a href="index.html" class="flex items-center gap-2.5 group" aria-label="TemplateCraft Home">
            <div class="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-indigo-700 transition">
              T
            </div>
            <span class="font-bold text-xl tracking-tight text-slate-900">${STORE_CONFIG.brandName}</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            ${navLinks.map(link => `
              <a href="${link.href}" class="text-sm font-medium transition ${
                activePage === link.id
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }">${link.label}</a>
            `).join("")}
            <a href="catalog.html?platform=All&free=true" class="text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition">
              Free Starter Kit
            </a>
          </nav>

          <!-- Right Actions: Search shortcut + Cart Button -->
          <div class="flex items-center gap-3">
            <a href="catalog.html" class="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg transition" aria-label="Search templates">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search...</span>
            </a>

            <button onclick="openCartDrawer()" class="relative inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition cursor-pointer" aria-label="Open shopping cart">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span class="hidden sm:inline">Cart</span>
              <span id="cart-badge" class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-slate-900 bg-amber-400 rounded-full">0</span>
            </button>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Toggle Menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
        ${navLinks.map(link => `
          <a href="${link.href}" class="block py-2 text-sm font-medium ${
            activePage === link.id ? "text-indigo-600 font-semibold" : "text-slate-700"
          }">${link.label}</a>
        `).join("")}
        <a href="catalog.html?free=true" class="block py-2 text-sm font-semibold text-emerald-700">Free Starter Templates →</a>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-slate-950 text-slate-300 border-t border-slate-800 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div class="md:col-span-1">
            <a href="index.html" class="flex items-center gap-2.5 text-white font-bold text-xl">
              <span class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-base">T</span>
              ${STORE_CONFIG.brandName}
            </a>
            <p class="mt-3 text-sm text-slate-400 leading-relaxed">
              Plug-and-play Notion systems, financial spreadsheets, Canva brand kits, and printable planners engineered to save you hours every week.
            </p>
            <p class="mt-4 text-xs text-slate-500">Instant digital delivery • Lifetime updates</p>
          </div>

          <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-white">Browse by Platform</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="catalog.html?platform=Notion" class="hover:text-white transition">Notion Templates</a></li>
              <li><a href="catalog.html?platform=Excel%2FSheets" class="hover:text-white transition">Excel & Google Sheets</a></li>
              <li><a href="catalog.html?platform=Canva" class="hover:text-white transition">Canva Social & Brand Kits</a></li>
              <li><a href="catalog.html?platform=PDF" class="hover:text-white transition">Printable & iPad PDFs</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-white">Popular Use Cases</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="catalog.html?useCase=Founders+%26+Startups" class="hover:text-white transition">Startup Founders</a></li>
              <li><a href="catalog.html?useCase=Finance+%26+Operations" class="hover:text-white transition">SaaS Financial Modeling</a></li>
              <li><a href="catalog.html?useCase=Content+Creators" class="hover:text-white transition">Content Creators</a></li>
              <li><a href="catalog.html?useCase=Freelancers+%26+Agencies" class="hover:text-white transition">Freelancers & Agencies</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-white">Resources & Legal</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="blog.html" class="hover:text-white transition">How-To Guides & Tutorials</a></li>
              <li><a href="product.html?slug=personal-budget-tracker-sheets" class="hover:text-white transition">Free Budget Template</a></li>
              <li><a href="mailto:${STORE_CONFIG.supportEmail}" class="hover:text-white transition">Support: ${STORE_CONFIG.supportEmail}</a></li>
              <li class="text-slate-500 text-xs pt-1">Commercial & Personal License Included</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ${new Date().getFullYear()} ${STORE_CONFIG.brandName}. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <span>Secured Checkout via Stripe • Razorpay • Lemon Squeezy</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Slide-Out Shopping Cart Drawer -->
    <div id="cart-drawer" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <div onclick="closeCartDrawer()" class="drawer-backdrop fixed inset-0 bg-slate-900/50 backdrop-blur-xs"></div>
      <div class="drawer-panel fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col">
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h2 id="cart-drawer-title" class="text-lg font-bold text-slate-900">Your Digital Cart</h2>
            <span id="drawer-item-count" class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">0 items</span>
          </div>
          <button onclick="closeCartDrawer()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer" aria-label="Close cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Promo Banner -->
        <div class="bg-indigo-50 px-6 py-2.5 text-xs text-indigo-800 flex items-center justify-between border-b border-indigo-100">
          <span>Use code <strong class="font-mono bg-white px-1.5 py-0.5 rounded border border-indigo-200">SAVE20</strong> for 20% off paid templates</span>
          <button onclick="applyPromoCode('SAVE20')" class="font-semibold underline hover:text-indigo-950 cursor-pointer">Apply</button>
        </div>

        <!-- Cart Items Container -->
        <div id="cart-items-list" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <!-- Populated dynamically by app.js -->
        </div>

        <!-- Cart Footer & Totals -->
        <div id="cart-footer" class="border-t border-slate-200 px-6 py-5 bg-slate-50 space-y-4">
          <div class="flex gap-2">
            <input id="promo-input" type="text" placeholder="Promo code (e.g. SAVE20)" class="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <button onclick="applyPromoFromInput()" class="px-3.5 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition cursor-pointer">Apply</button>
          </div>
          <div id="promo-status" class="text-xs text-emerald-700 font-medium hidden"></div>

          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span id="cart-subtotal">$0.00</span>
            </div>
            <div id="cart-discount-row" class="hidden flex justify-between text-emerald-700 font-medium">
              <span>Discount (20%)</span>
              <span id="cart-discount">-$0.00</span>
            </div>
            <div class="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total (Instant Download)</span>
              <span id="cart-total">$0.00</span>
            </div>
          </div>

          <button onclick="openCheckoutModal()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer">
            <span>Proceed to Instant Checkout</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
          <p class="text-center text-xs text-slate-500">⚡ Files & Notion links delivered immediately via email & screen</p>
        </div>
      </div>
    </div>

    <!-- Mock Payment Gateway Checkout Modal (Stripe / Razorpay / Lemon Squeezy Ready) -->
    <div id="checkout-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
      <div onclick="closeCheckoutModal()" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"></div>
      <div class="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden z-10">
        <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h2 id="checkout-modal-title" class="text-lg font-bold">Instant Digital Checkout</h2>
            <p class="text-xs text-slate-300">256-bit SSL Encrypted • Immediate File Access</p>
          </div>
          <button onclick="closeCheckoutModal()" class="text-slate-400 hover:text-white p-1 cursor-pointer" aria-label="Close checkout">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div id="checkout-body" class="p-6 space-y-5">
          <!-- Gateway Selector -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Select Payment Gateway</label>
            <div class="grid grid-cols-3 gap-2.5" id="gateway-selector">
              <button type="button" onclick="selectGateway('Stripe')" data-gateway="Stripe" class="gateway-btn border-2 border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer">
                Stripe Card
              </button>
              <button type="button" onclick="selectGateway('Razorpay')" data-gateway="Razorpay" class="gateway-btn border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer">
                Razorpay / UPI
              </button>
              <button type="button" onclick="selectGateway('Lemon Squeezy')" data-gateway="Lemon Squeezy" class="gateway-btn border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer">
                Lemon Squeezy
              </button>
            </div>
          </div>

          <form onsubmit="handleCheckoutSubmit(event)" class="space-y-4">
            <div>
              <label for="checkout-email" class="block text-sm font-medium text-slate-700 mb-1">Delivery Email Address *</label>
              <input id="checkout-email" type="email" required placeholder="you@company.com" class="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <p class="text-xs text-slate-500 mt-1">We'll send your download links and receipt to this address.</p>
            </div>

            <div id="card-fields" class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                <input type="text" required placeholder="Alex Rivera" value="Alex Rivera" class="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>
              <div class="grid grid-cols-3 gap-2.5">
                <div class="col-span-2">
                  <label class="block text-xs font-medium text-slate-600 mb-1">Demo Card Number</label>
                  <input type="text" value="4242 •••• •••• 4242" readonly class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 font-mono">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Exp / CVC</label>
                  <input type="text" value="12/28 • 888" readonly class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 font-mono">
                </div>
              </div>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between">
              <span class="text-sm font-medium text-slate-700">Amount Due Today</span>
              <span id="checkout-final-amount" class="text-lg font-extrabold text-slate-900">$0.00</span>
            </div>

            <button type="submit" id="checkout-submit-btn" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition cursor-pointer">
              Complete Purchase & Download Now
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast-notification" class="fixed bottom-5 right-5 z-50 hidden bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5">
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span id="toast-message">Added to cart</span>
    </div>
  `;
}
