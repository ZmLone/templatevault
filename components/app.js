/**
 * TemplateCraft Application Controller
 * Handles Cart State, SEO Dynamic Metadata + JSON-LD Schema, Filtering, Product Details & Blog Rendering
 */

let cart = JSON.parse(localStorage.getItem("tc_cart") || "[]");
let appliedPromo = localStorage.getItem("tc_promo") || "";
let selectedGateway = "Stripe";

function saveCart() {
  localStorage.setItem("tc_cart", JSON.stringify(cart));
  updateCartUI();
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

/* -------------------- CART & CHECKOUT -------------------- */

function addToCart(productId, openDrawer = true) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (!existing) {
    cart.push({ id: product.id, qty: 1 });
    saveCart();
    showToast(`Added "${product.shortTitle}" to cart`);
  } else {
    showToast(`"${product.shortTitle}" is already in your cart`);
  }

  if (openDrawer) openCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function applyPromoCode(code) {
  const normalized = (code || "").trim().toUpperCase();
  const statusEl = document.getElementById("promo-status");
  if (normalized === STORE_CONFIG.promoCode.code) {
    appliedPromo = normalized;
    localStorage.setItem("tc_promo", appliedPromo);
    if (statusEl) {
      statusEl.textContent = `✓ ${STORE_CONFIG.promoCode.label} applied!`;
      statusEl.classList.remove("hidden", "text-rose-600");
      statusEl.classList.add("text-emerald-700");
    }
    updateCartUI();
  } else if (statusEl) {
    statusEl.textContent = "Invalid code. Try SAVE20";
    statusEl.classList.remove("hidden", "text-emerald-700");
    statusEl.classList.add("text-rose-600");
  }
}

function applyPromoFromInput() {
  const input = document.getElementById("promo-input");
  if (input) applyPromoCode(input.value);
}

function calculateTotals() {
  let subtotal = 0;
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) subtotal += product.price;
  });
  const discount = appliedPromo === STORE_CONFIG.promoCode.code
    ? Math.round(subtotal * (STORE_CONFIG.promoCode.discountPercent / 100) * 100) / 100
    : 0;
  const total = Math.max(0, subtotal - discount);
  return { subtotal, discount, total };
}

function updateCartUI() {
  const badge = document.getElementById("cart-badge");
  const countLabel = document.getElementById("drawer-item-count");
  const listEl = document.getElementById("cart-items-list");
  const footerEl = document.getElementById("cart-footer");

  if (badge) badge.textContent = cart.length;
  if (countLabel) countLabel.textContent = `${cart.length} ${cart.length === 1 ? "item" : "items"}`;

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-14">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <p class="font-semibold text-slate-900">Your cart is empty</p>
        <p class="text-sm text-slate-500 mt-1">Explore ready-to-use templates to save hours this week.</p>
        <a href="catalog.html" class="inline-block mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700">Browse All Templates →</a>
      </div>
    `;
    if (footerEl) footerEl.classList.add("hidden");
    return;
  }

  if (footerEl) footerEl.classList.remove("hidden");

  listEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return "";
    return `
      <div class="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${p.accentGradient} flex items-center justify-center text-white font-bold text-xs shrink-0">
            ${p.platform.split("/")[0]}
          </div>
          <div>
            <a href="product.html?slug=${p.slug}" class="text-sm font-semibold text-slate-900 hover:text-indigo-600 line-clamp-1">${p.shortTitle}</a>
            <p class="text-xs text-slate-500 mt-0.5">${p.platform} • Instant Download</p>
            <p class="text-sm font-bold text-slate-900 mt-1">${p.isFree ? "FREE" : `$${p.price}`}</p>
          </div>
        </div>
        <button onclick="removeFromCart('${p.id}')" class="text-xs text-slate-400 hover:text-rose-600 p-1 cursor-pointer" aria-label="Remove item">
          Remove
        </button>
      </div>
    `;
  }).join("");

  const { subtotal, discount, total } = calculateTotals();
  const subEl = document.getElementById("cart-subtotal");
  const discRow = document.getElementById("cart-discount-row");
  const discEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");

  if (subEl) subEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (discRow && discEl) {
    if (discount > 0) {
      discRow.classList.remove("hidden");
      discEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discRow.classList.add("hidden");
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("hidden");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.add("hidden");
}

function openCheckoutModal() {
  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");
  const amountEl = document.getElementById("checkout-final-amount");
  const { total } = calculateTotals();
  if (amountEl) amountEl.textContent = total === 0 ? "FREE ($0.00)" : `$${total.toFixed(2)}`;
  if (modal) modal.classList.remove("hidden");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.add("hidden");
}

function selectGateway(gateway) {
  selectedGateway = gateway;
  document.querySelectorAll(".gateway-btn").forEach(btn => {
    if (btn.dataset.gateway === gateway) {
      btn.className = "gateway-btn border-2 border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer";
    } else {
      btn.className = "gateway-btn border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer";
    }
  });
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("checkout-email").value;
  const body = document.getElementById("checkout-body");
  const purchasedItems = cart.map(item => PRODUCTS.find(p => p.id === item.id)).filter(Boolean);

  // NOTE: In production, replace this block with your Stripe, Razorpay, or Lemon Squeezy SDK redirect.
  body.innerHTML = `
    <div class="text-center py-4 space-y-4">
      <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Payment Confirmed via ${selectedGateway}</span>
        <h3 class="text-xl font-bold text-slate-900 mt-2">Your Templates Are Ready!</h3>
        <p class="text-sm text-slate-600 mt-1">A receipt and backup links were sent to <strong>${email}</strong>.</p>
      </div>
      <div class="text-left bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
        ${purchasedItems.map(p => `
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium text-slate-800">${p.shortTitle}</span>
            <a href="#download-${p.slug}" onclick="showToast('Downloading ${p.shortTitle} package...')" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Download Files ↓
            </a>
          </div>
        `).join("")}
      </div>
      <button onclick="closeCheckoutModal()" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm cursor-pointer">
        Done & Return to Store
      </button>
    </div>
  `;

  cart = [];
  saveCart();
}

/* -------------------- SHARED PRODUCT CARD UI -------------------- */

function renderProductCard(product) {
  return `
    <article class="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
      <div>
        <!-- Visual Preview Thumbnail -->
        <a href="product.html?slug=${product.slug}" class="block relative h-48 bg-gradient-to-br ${product.accentGradient} p-5 text-white overflow-hidden group">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-xs">
              ${product.platform}
            </span>
            ${product.bestseller ? `<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">Bestseller</span>` : ""}
          </div>

          <!-- Stylized UI Mini-Preview Window -->
          <div class="mt-4 bg-white/95 text-slate-800 rounded-xl p-3.5 shadow-lg transform group-hover:scale-[1.02] transition">
            <div class="flex items-center gap-1.5 mb-2">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-[10px] font-mono text-slate-400 ml-1 truncate">${product.fileFormat}</span>
            </div>
            <p class="text-xs font-bold text-slate-900 truncate">${product.shortTitle}</p>
            <div class="mt-2 grid grid-cols-3 gap-1.5">
              <div class="h-2 bg-indigo-100 rounded"></div>
              <div class="h-2 bg-slate-200 rounded"></div>
              <div class="h-2 bg-emerald-100 rounded"></div>
            </div>
          </div>
        </a>

        <!-- Content -->
        <div class="p-5">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>${product.useCase}</span>
            <span class="flex items-center gap-1 font-medium text-slate-700">
              <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ${product.rating} (${product.reviewCount})
            </span>
          </div>

          <h3 class="text-base font-bold text-slate-900 leading-snug">
            <a href="product.html?slug=${product.slug}" class="hover:text-indigo-600 transition">${product.title}</a>
          </h3>
          <p class="mt-2 text-sm text-slate-600 line-clamp-2">${product.headline}</p>
        </div>
      </div>

      <!-- Price & CTA Footer -->
      <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          ${product.isFree
            ? `<span class="text-lg font-extrabold text-emerald-700">FREE</span> <span class="text-xs text-slate-400 line-through ml-1">$${product.originalPrice}</span>`
            : `<span class="text-lg font-extrabold text-slate-900">$${product.price}</span> <span class="text-xs text-slate-400 line-through ml-1">$${product.originalPrice}</span>`
          }
        </div>
        <div class="flex items-center gap-2">
          <a href="product.html?slug=${product.slug}" class="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-2 rounded-lg hover:bg-slate-100 transition">
            Preview
          </a>
          <button onclick="addToCart('${product.id}')" class="text-xs font-semibold ${
            product.isFree
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          } px-3.5 py-2 rounded-lg transition cursor-pointer">
            ${product.isFree ? "Get Free" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  `;
}

/* -------------------- PAGE CONTROLLERS -------------------- */

function initHomepage() {
  const featuredGrid = document.getElementById("featured-products-grid");
  if (featuredGrid) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(renderProductCard).join("");
  }

  const testimonialsGrid = document.getElementById("testimonials-grid");
  if (testimonialsGrid) {
    testimonialsGrid.innerHTML = TESTIMONIALS.map(t => `
      <figure class="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
        <div>
          <div class="flex text-amber-400 mb-3" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote class="text-slate-700 text-sm leading-relaxed">"${t.quote}"</blockquote>
        </div>
        <figcaption class="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
            ${t.initials}
          </div>
          <div>
            <div class="text-sm font-bold text-slate-900">${t.name}</div>
            <div class="text-xs text-slate-500">${t.role} • <span class="text-indigo-600">${t.productPurchased}</span></div>
          </div>
        </figcaption>
      </figure>
    `).join("");
  }

  const blogPreviewGrid = document.getElementById("home-blog-grid");
  if (blogPreviewGrid) {
    blogPreviewGrid.innerHTML = BLOG_POSTS.map(post => `
      <article class="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 transition flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-2">
            <span>${post.category}</span>
            <span>•</span>
            <span class="text-slate-500 font-normal">${post.readTime}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 leading-snug">
            <a href="blog.html?slug=${post.slug}" class="hover:text-indigo-600 transition">${post.title}</a>
          </h3>
          <p class="mt-2.5 text-sm text-slate-600 line-clamp-3">${post.excerpt}</p>
        </div>
        <a href="blog.html?slug=${post.slug}" class="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800">
          Read Free Guide →
        </a>
      </article>
    `).join("");
  }
}

function handleLeadMagnetSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("lead-email-input");
  const feedback = document.getElementById("lead-feedback");
  if (input && feedback) {
    feedback.innerHTML = `🎉 Sent! Check <strong>${input.value}</strong> for your Free 5-Template Starter Bundle.`;
    feedback.classList.remove("hidden");
    input.value = "";
  }
}

function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  let state = {
    search: params.get("q") || "",
    platform: params.get("platform") || "All",
    useCase: params.get("useCase") || "All",
    onlyFree: params.get("free") === "true",
    sort: "popular"
  };

  const searchInput = document.getElementById("catalog-search");
  const sortSelect = document.getElementById("catalog-sort");
  const platformContainer = document.getElementById("platform-filters");
  const useCaseContainer = document.getElementById("usecase-filters");
  const grid = document.getElementById("catalog-grid");
  const countLabel = document.getElementById("catalog-result-count");

  if (searchInput) searchInput.value = state.search;

  function renderFilterPills() {
    if (platformContainer) {
      platformContainer.innerHTML = PLATFORMS.map(plat => `
        <button onclick="setCatalogFilter('platform', '${plat}')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
          state.platform === plat
            ? "bg-slate-900 text-white shadow-2xs"
            : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
        }">${plat}</button>
      `).join("");
    }

    if (useCaseContainer) {
      useCaseContainer.innerHTML = USE_CASES.map(uc => `
        <button onclick="setCatalogFilter('useCase', '${uc}')" class="w-full text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
          state.useCase === uc
            ? "bg-indigo-50 text-indigo-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100"
        }">${uc}</button>
      `).join("");
    }
  }

  function applyFiltersAndRender() {
    let filtered = PRODUCTS.filter(p => {
      const matchesPlatform = state.platform === "All" || p.platform === state.platform;
      const matchesUseCase = state.useCase === "All" || p.useCase === state.useCase;
      const matchesFree = !state.onlyFree || p.isFree;
      const q = state.search.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q) ||
        p.useCase.toLowerCase().includes(q);
      return matchesPlatform && matchesUseCase && matchesFree && matchesSearch;
    });

    if (state.sort === "popular") {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    } else if (state.sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "template" : "templates"}`;
    }

    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p class="text-lg font-bold text-slate-900">No templates matched your exact filters</p>
            <p class="text-sm text-slate-500 mt-1">Try resetting your search query or switching platform filters.</p>
            <button onclick="resetCatalogFilters()" class="mt-4 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer">Reset Filters</button>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map(renderProductCard).join("");
      }
    }
  }

  window.setCatalogFilter = function(key, val) {
    state[key] = val;
    if (key === "platform" && val === "All") state.onlyFree = false;
    renderFilterPills();
    applyFiltersAndRender();
  };

  window.resetCatalogFilters = function() {
    state = { search: "", platform: "All", useCase: "All", onlyFree: false, sort: "popular" };
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "popular";
    renderFilterPills();
    applyFiltersAndRender();
  };

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.search = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      state.sort = e.target.value;
      applyFiltersAndRender();
    });
  }

  renderFilterPills();
  applyFiltersAndRender();
}

function initProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || PRODUCTS[0].slug;
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];

  // Dynamic SEO Meta & JSON-LD Structured Data for Google Rich Snippets
  document.title = `${product.title} | ${STORE_CONFIG.brandName}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.metaDescription);

  const schemaEl = document.getElementById("product-json-ld");
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.title,
      "description": product.metaDescription,
      "brand": { "@type": "Brand", "name": STORE_CONFIG.brandName },
      "offers": {
        "@type": "Offer",
        "url": `${STORE_CONFIG.domain}/product.html?slug=${product.slug}`,
        "priceCurrency": "USD",
        "price": product.price.toFixed(2),
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount
      }
    });
  }

  const container = document.getElementById("product-detail-container");
  if (!container) return;

  container.innerHTML = `
    <!-- Breadcrumbs for SEO & UX -->
    <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
      <a href="index.html" class="hover:text-slate-900">Home</a>
      <span>/</span>
      <a href="catalog.html" class="hover:text-slate-900">Templates</a>
      <span>/</span>
      <a href="catalog.html?platform=${encodeURIComponent(product.platform)}" class="hover:text-slate-900">${product.platform}</a>
      <span>/</span>
      <span class="text-slate-900 font-medium">${product.shortTitle}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <!-- Left Column: Interactive Preview Gallery & Problem-Solution Copy -->
      <div class="lg:col-span-7 space-y-8">
        <!-- Main Active Preview Stage -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div id="active-preview-stage" class="h-72 sm:h-96 bg-gradient-to-br ${product.accentGradient} p-6 sm:p-10 text-white flex flex-col justify-between transition-all">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider bg-black/25 px-3 py-1 rounded-full">${product.platform} Template</span>
              <span class="text-xs bg-white/20 px-3 py-1 rounded-full">Preview 1 of ${product.screenshots.length}</span>
            </div>
            <div class="bg-white text-slate-900 rounded-xl p-5 sm:p-6 shadow-2xl max-w-xl mx-auto w-full">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span class="text-xs font-mono text-slate-400">${product.fileFormat}</span>
              </div>
              <h2 id="preview-slide-title" class="text-lg font-bold text-slate-900">${product.screenshots[0].title}</h2>
              <p id="preview-slide-subtitle" class="text-sm text-slate-600 mt-1">${product.screenshots[0].subtitle}</p>
              <div class="mt-4 grid grid-cols-3 gap-2.5">
                <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-2.5">
                  <div class="text-[10px] font-semibold text-indigo-600 uppercase">Status</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">Ready to Use</div>
                </div>
                <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
                  <div class="text-[10px] font-semibold text-emerald-700 uppercase">Setup Time</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">&lt; 2 Minutes</div>
                </div>
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div class="text-[10px] font-semibold text-slate-500 uppercase">Updates</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">Lifetime Free</div>
                </div>
              </div>
            </div>
            <div class="text-center text-xs text-white/80">Click thumbnails below to inspect included views</div>
          </div>

          <!-- Thumbnail Switcher -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-3">
            ${product.screenshots.map((shot, idx) => `
              <button onclick="switchProductSlide(${idx})" class="slide-thumb text-left p-2.5 rounded-xl border ${
                idx === 0 ? "border-indigo-600 bg-white shadow-2xs" : "border-slate-200 bg-white/70 hover:bg-white"
              } transition cursor-pointer">
                <div class="text-xs font-bold text-slate-900 truncate">${idx + 1}. ${shot.title}</div>
                <div class="text-[11px] text-slate-500 truncate mt-0.5">${shot.subtitle}</div>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Problem / Solution Editorial Copy -->
        <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 class="text-xl font-bold text-slate-900">Why We Built This Template</h2>
          <p class="text-slate-700 leading-relaxed">${product.problemSolution}</p>

          <h3 class="text-lg font-bold text-slate-900 pt-3">What's Included in Your Download</h3>
          <ul class="space-y-2.5">
            ${product.whatsIncluded.map(item => `
              <li class="flex items-start gap-2.5 text-sm text-slate-700">
                <svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7"/></svg>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </section>

        <!-- FAQ Accordion -->
        <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 class="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div class="divide-y divide-slate-200">
            ${product.faqs.map((faq, i) => `
              <div class="py-3.5">
                <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer">
                  <span>${faq.q}</span>
                  <span id="faq-icon-${i}" class="text-slate-400 text-lg ml-4">+</span>
                </button>
                <div id="faq-answer-${i}" class="hidden mt-2 text-sm text-slate-600 leading-relaxed">
                  ${faq.a}
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      </div>

      <!-- Right Column: Sticky High-Converting Purchase Box -->
      <aside class="lg:col-span-5 lg:sticky lg:top-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">${product.platform}</span>
            <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">${product.useCase}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">${product.title}</h1>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">${product.headline}</p>
        </div>

        <!-- Rating & Social Proof -->
        <div class="flex items-center gap-3 text-sm">
          <span class="text-amber-400 font-bold">★★★★★</span>
          <span class="font-bold text-slate-900">${product.rating}/5</span>
          <span class="text-slate-500">(${product.reviewCount} verified downloads)</span>
        </div>

        <!-- Pricing Block -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
          <div>
            ${product.isFree
              ? `<span class="text-3xl font-extrabold text-emerald-700">FREE</span> <span class="text-sm text-slate-400 line-through ml-1.5">$${product.originalPrice}</span>`
              : `<span class="text-3xl font-extrabold text-slate-900">$${product.price}</span> <span class="text-sm text-slate-400 line-through ml-1.5">$${product.originalPrice}</span>`
            }
            <p class="text-xs text-slate-500 mt-1">One-time payment • No recurring subscription</p>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            ⚡ Instant Download
          </span>
        </div>

        <!-- Primary & Secondary CTAs -->
        <div class="space-y-3">
          <button onclick="addToCart('${product.id}', true); openCheckoutModal();" class="w-full ${
            product.isFree
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition text-base cursor-pointer">
            ${product.isFree ? "Download Free Now →" : `Buy Now — $${product.price}`}
          </button>

          ${!product.isFree ? `
            <button onclick="addToCart('${product.id}', true)" class="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold py-3 px-6 rounded-xl transition text-sm cursor-pointer">
              Add to Cart
            </button>
          ` : ""}
        </div>

        <!-- Trust Metadata -->
        <div class="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
          <div class="flex justify-between">
            <span class="text-slate-400">Format:</span>
            <span class="font-medium text-slate-800">${product.fileFormat}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Delivery:</span>
            <span class="font-medium text-slate-800">${product.fileSize}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">License:</span>
            <span class="font-medium text-slate-800">Personal & Commercial Use</span>
          </div>
        </div>
      </aside>
    </div>
  `;

  window.switchProductSlide = function(index) {
    const shot = product.screenshots[index];
    if (!shot) return;
    document.getElementById("preview-slide-title").textContent = shot.title;
    document.getElementById("preview-slide-subtitle").textContent = shot.subtitle;
    document.querySelectorAll(".slide-thumb").forEach((el, idx) => {
      el.className = `slide-thumb text-left p-2.5 rounded-xl border ${
        idx === index ? "border-indigo-600 bg-white shadow-2xs" : "border-slate-200 bg-white/70 hover:bg-white"
      } transition cursor-pointer`;
    });
  };

  window.toggleFaq = function(idx) {
    const ans = document.getElementById(`faq-answer-${idx}`);
    const icon = document.getElementById(`faq-icon-${idx}`);
    if (!ans || !icon) return;
    const isHidden = ans.classList.contains("hidden");
    ans.classList.toggle("hidden");
    icon.textContent = isHidden ? "−" : "+";
  };
}

function initBlogPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const container = document.getElementById("blog-container");
  if (!container) return;

  if (!slug) {
    // Blog Index View
    container.innerHTML = `
      <div class="max-w-3xl mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Actionable Playbooks</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">How-To Guides & Workflow Blueprints</h1>
        <p class="text-base text-slate-600 mt-3 leading-relaxed">
          Step-by-step tutorials on startup operations, SaaS financial modeling, and creator systems—paired with ready-to-use templates so you can implement faster.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${BLOG_POSTS.map(post => {
          const related = PRODUCTS.find(p => p.slug === post.relatedProductSlug);
          return `
            <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 transition">
              <div>
                <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
                  <span>${post.category}</span>
                  <span>•</span>
                  <span class="text-slate-400 font-normal">${post.readTime}</span>
                </div>
                <h2 class="text-xl font-bold text-slate-900 leading-snug">
                  <a href="blog.html?slug=${post.slug}" class="hover:text-indigo-600 transition">${post.title}</a>
                </h2>
                <p class="mt-3 text-sm text-slate-600 leading-relaxed">${post.excerpt}</p>
              </div>
              <div class="mt-6 pt-4 border-t border-slate-100 space-y-3">
                ${related ? `
                  <div class="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-slate-600">
                    ⚡ Includes shortcut: <a href="product.html?slug=${related.slug}" class="font-semibold text-indigo-600 hover:underline">${related.shortTitle}</a>
                  </div>
                ` : ""}
                <a href="blog.html?slug=${post.slug}" class="inline-flex items-center text-sm font-bold text-slate-900 hover:text-indigo-600">
                  Read Full Guide →
                </a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
    return;
  }

  // Single SEO Article View
  const post = BLOG_POSTS.find(b => b.slug === slug) || BLOG_POSTS[0];
  const relatedProduct = PRODUCTS.find(p => p.slug === post.relatedProductSlug);

  document.title = `${post.title} | ${STORE_CONFIG.brandName}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);

  const articleSchema = document.getElementById("article-json-ld");
  if (articleSchema) {
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "author": { "@type": "Person", "name": post.author },
      "publisher": { "@type": "Organization", "name": STORE_CONFIG.brandName }
    });
  }

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <a href="blog.html" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6">
        ← Back to All Guides
      </a>

      <article>
        <header class="mb-8">
          <div class="flex items-center gap-2.5 text-xs font-semibold text-indigo-600 mb-3">
            <span class="bg-indigo-50 px-2.5 py-1 rounded-full">${post.category}</span>
            <span class="text-slate-500">${post.publishedAt}</span>
            <span>•</span>
            <span class="text-slate-500">${post.readTime}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">${post.title}</h1>
          <p class="mt-3 text-sm text-slate-500">By ${post.author}</p>
        </header>

        <!-- Time-Saving Shortcut Callout Box (Conversion Bridge) -->
        ${relatedProduct ? `
          <div class="my-8 p-5 sm:p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-700">⚡ Time-Saving Shortcut</span>
              <h2 class="text-base font-bold text-slate-900 mt-0.5">${relatedProduct.shortTitle} (${relatedProduct.platform})</h2>
              <p class="text-xs text-slate-600 mt-1">${post.ctaHook}</p>
            </div>
            <a href="product.html?slug=${relatedProduct.slug}" class="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
              Get Template (${relatedProduct.isFree ? "Free" : `$${relatedProduct.price}`}) →
            </a>
          </div>
        ` : ""}

        <div class="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-10">
          ${post.content}
        </div>

        <!-- Bottom Product Conversion Card -->
        ${relatedProduct ? `
          <div class="mt-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Ready-to-Use Template</span>
              <h3 class="text-xl font-bold mt-1">${relatedProduct.title}</h3>
              <p class="text-sm text-slate-300 mt-1.5">${relatedProduct.headline}</p>
            </div>
            <div class="flex flex-col sm:items-end gap-2 shrink-0">
              <button onclick="addToCart('${relatedProduct.id}')" class="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-5 py-3 rounded-xl text-sm transition cursor-pointer">
                Add to Cart — $${relatedProduct.price}
              </button>
              <a href="product.html?slug=${relatedProduct.slug}" class="text-xs text-slate-400 hover:text-white underline">Inspect full preview</a>
            </div>
          </div>
        ` : ""}
      </article>
    </div>
  `;
}

/* -------------------- BOOTSTRAP -------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.dataset.page || "home";
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");

  if (headerMount) headerMount.innerHTML = renderNavbar(pageId);
  if (footerMount) footerMount.innerHTML = renderFooter();

  updateCartUI();

  if (pageId === "home") initHomepage();
  if (pageId === "catalog") initCatalogPage();
  if (pageId === "product") initProductDetailPage();
  if (pageId === "blog") initBlogPage();
});
