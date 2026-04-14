// в”Ђв”Ђв”Ђ WELLEX WEBSITE JAVASCRIPT v2.0 в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ

// Cart state
let cart = JSON.parse(localStorage.getItem('wellec-cart')) || [];

const products = {
  'classic-black': { name: 'Classic Black', bandColor: '#0D0D0D', bandLight: false, price: 279, subPrice: 179 },
  'midnight-navy': { name: 'Midnight Navy', bandColor: '#1B2A4A', bandLight: false, price: 279, subPrice: 179 },
  'forest-green':  { name: 'Forest Green',  bandColor: '#1A3D2B', bandLight: false, price: 279, subPrice: 179 },
  'crimson-red':   { name: 'Crimson Red',   bandColor: '#7A1515', bandLight: false, price: 279, subPrice: 179 },
};

// в”Ђв”Ђв”Ђ WATCH SVG GENERATOR в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function generateWatchSVG(bandColor, size = 'medium', isLight = false) {
  const sizes = {
    small:  { w: 80,  h: 190, vb: '0 0 140 320' },
    medium: { w: 140, h: 330, vb: '0 0 140 320' },
    large:  { w: 200, h: 475, vb: '0 0 140 320' },
    xlarge: { w: 260, h: 618, vb: '0 0 140 320' },
  };
  const s = sizes[size] || sizes.medium;
  const bc = bandColor;
  const ribColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.07)';
  const ribDark  = isLight ? 'rgba(0,0,0,0.05)'  : 'rgba(255,255,255,0.04)';
  const edgeColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
  const uid = bandColor.replace('#','') + '_' + size;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.vb}" width="${s.w}" height="${s.h}">
    <defs>
      <linearGradient id="modG_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2A2A2A"/>
        <stop offset="50%" stop-color="#1C1C1C"/>
        <stop offset="100%" stop-color="#141414"/>
      </linearGradient>
      <linearGradient id="bandG_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${lightenColor(bc, isLight ? -10 : 20)}"/>
        <stop offset="100%" stop-color="${bc}"/>
      </linearGradient>
      <filter id="shad_${uid}">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.6)"/>
      </filter>
    </defs>

    <!-- Band Top Clasp -->
    <rect x="52" y="2" width="36" height="18" rx="9" fill="${bc}" opacity="0.7"/>

    <!-- Band Top Body -->
    <rect x="33" y="18" width="74" height="92" rx="8" fill="url(#bandG_${uid})"/>
    ${[28,38,48,58,68,78,88,98].map(y =>
      `<line x1="35" y1="${y}" x2="105" y2="${y}" stroke="${ribColor}" stroke-width="1.5"/>`
    ).join('')}
    <rect x="33" y="18" width="74" height="92" rx="8" fill="none" stroke="${edgeColor}" stroke-width="1"/>

    <!-- Module (main body) -->
    <rect x="17" y="108" width="106" height="106" rx="16" fill="url(#modG_${uid})" filter="url(#shad_${uid})"/>
    ${generateCarbonFiber(uid)}
    <rect x="17" y="108" width="106" height="106" rx="16" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <rect x="22" y="113" width="96" height="96" rx="13" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    <rect x="17" y="108" width="106" height="3" rx="2" fill="rgba(255,255,255,0.08)"/>

    <!-- W Logo emboss shadow -->
    <text x="70" y="168" text-anchor="middle" dominant-baseline="middle"
          fill="rgba(255,255,255,0.10)" font-size="36" font-weight="900"
          font-family="'Inter','Arial Black',sans-serif" letter-spacing="-2"
          dy="2" dx="2">W</text>
    <!-- W Logo main -->
    <text x="70" y="168" text-anchor="middle" dominant-baseline="middle"
          fill="rgba(255,255,255,0.88)" font-size="36" font-weight="900"
          font-family="'Inter','Arial Black',sans-serif" letter-spacing="-2">W</text>

    <!-- Sensor bumps -->
    <circle cx="50" cy="202" r="3.5" fill="#0A0A0A" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
    <circle cx="70" cy="202" r="3.5" fill="#0A0A0A" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
    <circle cx="90" cy="202" r="3.5" fill="#0A0A0A" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

    <!-- Band Bottom Body -->
    <rect x="33" y="214" width="74" height="92" rx="8" fill="url(#bandG_${uid})"/>
    ${[224,234,244,254,264,274,284,294].map(y =>
      `<line x1="35" y1="${y}" x2="105" y2="${y}" stroke="${ribColor}" stroke-width="1.5"/>`
    ).join('')}
    <rect x="33" y="214" width="74" height="92" rx="8" fill="none" stroke="${edgeColor}" stroke-width="1"/>

    <!-- Band Bottom Clasp -->
    <rect x="52" y="304" width="36" height="18" rx="9" fill="${bc}" opacity="0.7"/>
    <circle cx="70" cy="313" r="4" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  </svg>`;
}

function generateCarbonFiber(uid) {
  let p = '';
  for(let row = 0; row < 8; row++) {
    for(let col = 0; col < 7; col++) {
      const x = 22 + col * 15;
      const y = 114 + row * 13;
      const offset = row % 2 === 0 ? 0 : 7;
      p += `<rect x="${x+offset}" y="${y}" width="7" height="6" rx="1" fill="rgba(255,255,255,0.025)"/>`;
    }
  }
  return p;
}

function lightenColor(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xFF) + amount));
  return '#' + ((r << 16)|(g << 8)|b).toString(16).padStart(6,'0');
}

// в”Ђв”Ђв”Ђ CART FUNCTIONS в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function addToCart(productId, planType = 'subscription', overridePrice = null, discountPercent = 0) {
  const product = products[productId];
  if (!product) return;
  const existing = cart.find(i => i.id === productId && i.plan === planType);
  if (existing) { existing.qty++; }
  else {
    const basePrice = planType === 'subscription' ? product.subPrice : product.price;
    cart.push({
      id: productId,
      name: product.name,
      bandColor: product.bandColor,
      bandLight: product.bandLight,
      price: overridePrice ?? basePrice,
      originalPrice: basePrice,
      discountPercent,
      plan: planType,
      qty: 1
    });
  }
  saveCart(); updateCartBadge();
  showToast(`${product.name} added to cart! рџЋ‰`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart(); updateCartBadge();
  if (document.querySelector('.cart-items-section')) renderCart();
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) removeFromCart(index);
  else { saveCart(); if (document.querySelector('.cart-items-section')) renderCart(); }
}

function saveCart() { localStorage.setItem('wellec-cart', JSON.stringify(cart)); }
function getCartTotal() { return cart.reduce((sum,i) => sum + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((sum,i) => sum + i.qty, 0); }

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) { const c = getCartCount(); badge.textContent = c; badge.style.display = c > 0 ? 'flex' : 'none'; }
}

// в”Ђв”Ђв”Ђ RENDER CART PAGE в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function renderCart() {
  const itemsSection = document.querySelector('.cart-items-section');
  const summarySection = document.querySelector('.cart-summary');
  if (!itemsSection) return;

  const itemsHTML = cart.length === 0
    ? `<div style="text-align:center;padding:60px 20px;color:var(--gray)">
        <div style="font-size:3rem;margin-bottom:16px">рџ›ЌпёЏ</div>
        <p style="font-size:1rem;margin-bottom:24px">Your cart is empty</p>
        <a href="shop.html" class="btn-primary">Shop Now</a>
       </div>`
    : cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-image">${generateWatchSVG(item.bandColor,'small',item.bandLight||false)}</div>
          <div>
            <div class="cart-item-name">Wellec Band вЂ“ ${item.name}</div>
            <div class="cart-item-variant">${item.plan === 'subscription'
              ? 'рџ“¦ Monthly Subscription вЂ” $19/mo В· Band included FREE'
              : 'рџ”Ѓ One-Time Purchase вЂ” Band Only В· $249'}</div>
            <div class="cart-quantity">
              <button class="qty-btn" onclick="updateQty(${i},-1)">в€’</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${i},1)">+</button>
            </div>
          </div>
          <div class="cart-item-price">
            <div class="cart-item-price-main">$${(item.price * item.qty).toFixed(2)}<span style="font-size:0.7rem;font-weight:400;color:var(--light-gray)">${item.plan==='subscription'?'/mo':''}</span></div>
            <button class="cart-item-remove" onclick="removeFromCart(${i})">Remove</button>
          </div>
        </div>`).join('');

  itemsSection.innerHTML = `
    <div class="cart-page-title">Your Cart</div>
    <div class="cart-count">${getCartCount()} item${getCartCount()!==1?'s':''}</div>
    ${itemsHTML}`;

  const subtotal = getCartTotal();
  if (summarySection) {
    summarySection.querySelector('.summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    summarySection.querySelector('.summary-shipping').textContent = subtotal > 0 ? 'FREE' : '$0.00';
    summarySection.querySelector('.summary-total-val').textContent = `$${subtotal.toFixed(2)}`;
  }
}

// в”Ђв”Ђв”Ђ RENDER CHECKOUT ITEMS в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function renderCheckoutItems() {
  const container = document.querySelector('.checkout-items-list');
  if (!container) return;
  const subtotal = getCartTotal();
  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-img">${generateWatchSVG(item.bandColor,'small',item.bandLight||false)}</div>
      <div>
        <div class="checkout-item-name">Wellec Band вЂ“ ${item.name}</div>
        <div class="checkout-item-variant">Qty: ${item.qty} В· ${item.plan==='subscription'?'$19/mo Subscription':'$249 One-Time'}</div>
      </div>
      <div class="checkout-item-price">$${(item.price*item.qty).toFixed(2)}</div>
    </div>`).join('');
  document.querySelectorAll('.checkout-subtotal').forEach(el => el.textContent=`$${subtotal.toFixed(2)}`);
  document.querySelectorAll('.checkout-total').forEach(el => el.textContent=`$${subtotal.toFixed(2)}`);
}

// в”Ђв”Ђв”Ђ TOAST в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">вњ…</span><span class="toast-text"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// в”Ђв”Ђв”Ђ COLOR SWITCHER (product.html) в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function initColorSwitcher() {
  const options = document.querySelectorAll('.color-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      updateDisplay(opt.dataset.product);
    });
  });
}

function updateDisplay(pid) {
  const p = products[pid];
  if (!p) return;
  const display = document.getElementById('main-watch-display');
  if (display) {
    display.style.opacity = '0'; display.style.transform = 'scale(0.95)';
    display.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      display.innerHTML = generateWatchSVG(p.bandColor, 'xlarge', p.bandLight);
      display.style.opacity = '1'; display.style.transform = 'scale(1)';
    }, 200);
  }
  const t = document.getElementById('product-title');
  if (t) t.textContent = `Wellec Band вЂ“ ${p.name}`;
  const cn = document.getElementById('selected-color-name');
  if (cn) cn.textContent = p.name;
  const bn = document.getElementById('breadcrumb-name');
  if (bn) bn.textContent = p.name;
  document.querySelectorAll('[data-product-bind]').forEach(el => el.dataset.product = pid);
  document.querySelectorAll('.product-thumb').forEach(t2 => {
    t2.classList.toggle('active', t2.dataset.product === pid);
  });
}

// в”Ђв”Ђв”Ђ HERO WATCH ANIMATION в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function initHeroWatch() {
  const heroWatch = document.getElementById('hero-watch');
  if (!heroWatch) return;
  const seq = [
    {c:'#0D0D0D',l:false},{c:'#D8D8D8',l:true},{c:'#1B3A5C',l:false},{c:'#1A3D2B',l:false}
  ];
  let idx = 0;
  heroWatch.innerHTML = generateWatchSVG(seq[0].c,'xlarge',seq[0].l);
  heroWatch.style.transition = 'all 0.4s ease';
  setInterval(() => {
    idx = (idx+1) % seq.length;
    heroWatch.style.opacity='0'; heroWatch.style.transform='translateY(10px)';
    setTimeout(() => {
      heroWatch.innerHTML = generateWatchSVG(seq[idx].c,'xlarge',seq[idx].l);
      heroWatch.style.opacity='1'; heroWatch.style.transform='translateY(0)';
    }, 400);
  }, 3000);
}

// в”Ђв”Ђв”Ђ SHOP / CART PAGE WATCH RENDERS в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function initShopWatches() {
  document.querySelectorAll('[data-watch-color]').forEach(el => {
    const color = el.dataset.watchColor;
    const size  = el.dataset.watchSize || 'medium';
    const light = el.dataset.watchLight === 'true';
    el.innerHTML = generateWatchSVG(color, size, light);
  });
}

// в”Ђв”Ђв”Ђ NAV HIGHLIGHT в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// в”Ђв”Ђв”Ђ WVI GAUGE ANIMATION в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function animateWVI(targetId, targetValue) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let current = 0;
  const interval = setInterval(() => {
    current += 2;
    if (current >= targetValue) { current = targetValue; clearInterval(interval); }
    el.textContent = current;
  }, 20);
}

const fitFinderConfig = {
  colorMeta: {
    'classic-black': {
      name: 'Classic Black',
      aura: 'Business',
      glow: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(46,116,181,0.22) 44%, rgba(13,13,13,0) 76%)',
      copy: 'You read strongest as composed, focused, and sharp. Black fits the version of you that wants clean signal, quiet authority, and daily versatility.',
      reason: 'Best for disciplined routines, polished settings, and people who prefer precision over noise.'
    },
    'midnight-navy': {
      name: 'Midnight Navy',
      aura: 'Mansion',
      glow: 'radial-gradient(circle, rgba(88,160,255,0.42) 0%, rgba(27,42,74,0.18) 48%, rgba(13,13,13,0) 80%)',
      copy: 'You lean refined, elevated, and a little more curated. Midnight Navy matches people who want premium presence without going obvious.',
      reason: 'Best for evening energy, luxury taste, and a cooler, more architectural style.'
    },
    'forest-green': {
      name: 'Forest Green',
      aura: 'Forest',
      glow: 'radial-gradient(circle, rgba(86,214,135,0.34) 0%, rgba(26,61,43,0.22) 46%, rgba(13,13,13,0) 80%)',
      copy: 'You come through as grounded, wellness-aware, and balanced. Green fits a calmer identity with a natural premium edge.',
      reason: 'Best for recovery-minded users, outdoor energy, and people who want softness with distinction.'
    },
    'crimson-red': {
      name: 'Original Orange',
      aura: 'Marathon',
      glow: 'radial-gradient(circle, rgba(255,154,76,0.42) 0%, rgba(216,89,22,0.20) 46%, rgba(13,13,13,0) 80%)',
      copy: 'You score as energetic, visible, and action-led. The orange Wellec look suits people who want movement, attention, and momentum.',
      reason: 'Best for outgoing personalities, sport-minded routines, and high-energy first impressions.'
    }
  },
  questions: [
    {
      title: 'What kind of room do you naturally take over?',
      options: [
        { title: 'Boardroom', copy: 'Structured, direct, polished.', color: 'classic-black' },
        { title: 'Penthouse dinner', copy: 'Refined, exclusive, curated.', color: 'midnight-navy' },
        { title: 'Cabin retreat', copy: 'Calm, restorative, natural.', color: 'forest-green' },
        { title: 'Race day crowd', copy: 'Fast, visible, energetic.', color: 'crimson-red' }
      ]
    },
    {
      title: 'Which compliment sounds most like you?',
      options: [
        { title: 'You are sharp', copy: 'Focused and always put together.', color: 'classic-black' },
        { title: 'You have taste', copy: 'Luxury without screaming.', color: 'midnight-navy' },
        { title: 'You feel grounded', copy: 'Easy energy people trust.', color: 'forest-green' },
        { title: 'You bring energy', copy: 'People notice your momentum.', color: 'crimson-red' }
      ]
    },
    {
      title: 'Pick the pace that feels right on your wrist.',
      options: [
        { title: 'Controlled', copy: 'Minimal, consistent, exact.', color: 'classic-black' },
        { title: 'Curated', copy: 'Smooth, premium, intentional.', color: 'midnight-navy' },
        { title: 'Balanced', copy: 'Breathable, calm, restorative.', color: 'forest-green' },
        { title: 'Explosive', copy: 'Visible, athletic, driven.', color: 'crimson-red' }
      ]
    },
    {
      title: 'What do you want your watch to say before you speak?',
      options: [
        { title: 'I am in control', copy: 'Clean authority.', color: 'classic-black' },
        { title: 'I move elegantly', copy: 'Exclusive confidence.', color: 'midnight-navy' },
        { title: 'I live well', copy: 'Recovery and rhythm.', color: 'forest-green' },
        { title: 'I move now', copy: 'Action and fire.', color: 'crimson-red' }
      ]
    }
  ]
};

function initFitFinder() {
  const modal = document.getElementById('fit-finder-modal');
  if (!modal) return;

  const launchers = document.querySelectorAll('[data-fit-launch]');
  const closeButtons = modal.querySelectorAll('[data-fit-close]');
  const targetChip = document.getElementById('fit-target-chip');
  const questionStage = document.getElementById('fit-question-stage');
  const resultStage = document.getElementById('fit-result');
  const progressBar = document.getElementById('fit-progress-bar');
  const skipBtn = document.getElementById('fit-skip-btn');
  const questionStep = document.getElementById('fit-question-step');
  const questionTitle = document.getElementById('fit-question-title');
  const optionsWrap = document.getElementById('fit-options');
  const resultTitle = document.getElementById('fit-result-title');
  const resultCopy = document.getElementById('fit-result-copy');
  const resultReason = document.getElementById('fit-result-reason');
  const resultGlow = document.getElementById('fit-result-glow');
  const resultLink = document.getElementById('fit-result-link');
  const restartBtn = document.getElementById('fit-restart-btn');

  let preferredColor = null;
  let currentQuestion = 0;
  let scores = {};

  const resetGame = () => {
    currentQuestion = 0;
    scores = {
      'classic-black': 0,
      'midnight-navy': 0,
      'forest-green': 0,
      'crimson-red': 0
    };
    questionStage.classList.remove('hidden');
    resultStage.classList.add('hidden');
    renderQuestion();
  };

  const openModal = (targetColor) => {
    preferredColor = targetColor;
    const meta = fitFinderConfig.colorMeta[targetColor];
    targetChip.textContent = meta ? `Focus: ${meta.aura}` : 'Focus: Open match';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetGame();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const skipToColors = () => {
    const fallback = preferredColor || 'classic-black';
    window.location.href = `product.html?color=${fallback}`;
  };

  const renderQuestion = () => {
    const total = fitFinderConfig.questions.length;
    const question = fitFinderConfig.questions[currentQuestion];
    questionStep.textContent = `Round ${currentQuestion + 1} / ${total}`;
    questionTitle.textContent = question.title;
    progressBar.style.width = `${((currentQuestion + 1) / total) * 100}%`;
    optionsWrap.innerHTML = question.options.map((option) => `
      <button class="fit-option" type="button" data-fit-color="${option.color}">
        <strong>${option.title}</strong>
        <span>${option.copy}</span>
      </button>
    `).join('');

    optionsWrap.querySelectorAll('.fit-option').forEach((button) => {
      button.addEventListener('click', () => {
        const picked = button.dataset.fitColor;
        scores[picked] += 2;
        if (preferredColor === picked) scores[picked] += 1;
        currentQuestion += 1;
        if (currentQuestion >= total) {
          renderResult();
        } else {
          renderQuestion();
        }
      });
    });
  };

  const renderResult = () => {
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const meta = fitFinderConfig.colorMeta[winner];
    questionStage.classList.add('hidden');
    resultStage.classList.remove('hidden');
    progressBar.style.width = '100%';
    resultTitle.textContent = `${meta.name} / ${meta.aura}`;
    resultCopy.textContent = meta.copy;
    resultReason.textContent = meta.reason;
    resultGlow.style.background = meta.glow;
    resultLink.href = `product.html?color=${winner}`;
    resultLink.textContent = `See ${meta.name}`;
    targetChip.textContent = preferredColor === winner ? 'Direct hit: your pick matched' : `Better match found: ${meta.aura}`;
  };

  launchers.forEach((launcher) => {
    launcher.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(launcher.dataset.fitLaunch);
    });
  });

  closeButtons.forEach((button) => button.addEventListener('click', closeModal));
  skipBtn.addEventListener('click', skipToColors);
  restartBtn.addEventListener('click', resetGame);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

function initCollectionZoom() {
  const zoomCards = document.querySelectorAll('.zoom-card');
  if (!zoomCards.length) return;

  zoomCards.forEach((card) => {
    const pane = card.querySelector('.zoom-pane');
    const toggle = card.querySelector('.zoom-toggle');
    const source = card.dataset.zoomImage;
    if (!pane || !source || !toggle) return;

    pane.style.backgroundImage = `url('${source}')`;

    const setZoomState = (enabled) => {
      card.classList.toggle('zoom-enabled', enabled);
      toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      toggle.textContent = enabled ? 'Zoom on' : 'Enable zoom';
      if (!enabled) card.classList.remove('is-zooming');
    };

    setZoomState(false);

    const updateZoom = (event) => {
      if (!card.classList.contains('zoom-enabled')) return;
      const rect = card.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      pane.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
      card.classList.add('is-zooming');
    };

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setZoomState(!card.classList.contains('zoom-enabled'));
    });

    card.addEventListener('mouseenter', (event) => updateZoom(event));
    card.addEventListener('mousemove', (event) => updateZoom(event));
    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-zooming');
    });
  });
}

const healthDealConfig = {
  questions: [
    {
      title: 'How often do you wake up feeling actually recovered?',
      options: [
        { title: 'Almost always', copy: 'I usually wake up ready to go.', score: 4 },
        { title: 'Pretty often', copy: 'Most days are solid.', score: 3 },
        { title: 'Sometimes', copy: 'It depends on the week.', score: 2 },
        { title: 'Rarely', copy: 'Recovery is a struggle.', score: 1 }
      ]
    },
    {
      title: 'Which habit sounds most like your current routine?',
      options: [
        { title: 'Structured sleep and hydration', copy: 'I protect the basics first.', score: 4 },
        { title: 'Workout rhythm with some discipline', copy: 'Not perfect, but real.', score: 3 },
        { title: 'I am trying to improve', copy: 'Some good days, some chaos.', score: 2 },
        { title: 'Mostly reactive', copy: 'I know I need a reset.', score: 1 }
      ]
    },
    {
      title: 'How aware are you of your body signals during the day?',
      options: [
        { title: 'Very aware', copy: 'I notice stress, strain, and energy shifts fast.', score: 4 },
        { title: 'Fairly aware', copy: 'I pick up the obvious changes.', score: 3 },
        { title: 'Not much', copy: 'I usually realize it late.', score: 2 },
        { title: 'Almost never', copy: 'I mostly push through blindly.', score: 1 }
      ]
    }
  ],
  discounts: [0.3, 0.8, 1.2, 1.8, 2.4, 3.1, 4.0, 5.0]
};

let activeHealthDeal = null;

function openHealthDeal(productId, planType) {
  const modal = document.getElementById('health-deal-modal');
  if (!modal) {
    addToCart(productId, planType);
    return;
  }

  const product = products[productId];
  if (!product) return;

  const planPrice = planType === 'subscription' ? product.subPrice : product.price;
  const planChip = document.getElementById('health-plan-chip');
  const progressBar = document.getElementById('health-progress-bar');
  const quizStage = document.getElementById('health-quiz-stage');
  const wheelStage = document.getElementById('health-wheel-stage');
  const resultStage = document.getElementById('health-result-stage');
  const stepEl = document.getElementById('health-step');
  const questionEl = document.getElementById('health-question');
  const optionsEl = document.getElementById('health-options');
  const wheelEl = document.getElementById('health-wheel');
  const wheelCopy = document.getElementById('health-wheel-copy');
  const winningBadge = document.getElementById('health-winning-badge');
  const resultTitle = document.getElementById('health-result-title');
  const resultCopy = document.getElementById('health-result-copy');
  const originalPrice = document.getElementById('health-original-price');
  const discountPercentEl = document.getElementById('health-discount-percent');
  const finalPriceEl = document.getElementById('health-final-price');
  const spinBtn = document.getElementById('health-spin-btn');
  const claimBtn = document.getElementById('health-claim-btn');

  activeHealthDeal = {
    productId,
    planType,
    planPrice,
    score: 0,
    questionIndex: 0,
    discount: 0
  };

  planChip.textContent = `Plan: ${planType === 'subscription' ? 'Subscription' : 'One-Time'}`;
  progressBar.style.width = '20%';
  quizStage.classList.remove('hidden');
  wheelStage.classList.add('hidden');
  resultStage.classList.add('hidden');
  wheelEl.style.transform = 'rotate(0deg)';
  winningBadge.classList.remove('is-visible');
  winningBadge.textContent = '0.0%';
  originalPrice.textContent = `$${planPrice.toFixed(2)}`;
  discountPercentEl.textContent = '0.0%';
  finalPriceEl.textContent = `$${planPrice.toFixed(2)}`;
  wheelEl.innerHTML = `
    <div class="health-wheel-labels">
      ${healthDealConfig.discounts.map((discount, index) => {
        const angle = (360 / healthDealConfig.discounts.length) * index;
        return `<span class="health-wheel-label" data-discount="${discount.toFixed(1)}" style="transform: translate(-50%, -50%) rotate(${angle}deg) translateY(-118px) rotate(${-angle}deg);"><span class="health-wheel-label-text">${discount.toFixed(1)}%</span></span>`;
      }).join('')}
    </div>
  `;

  const renderQuestion = () => {
    const q = healthDealConfig.questions[activeHealthDeal.questionIndex];
    stepEl.textContent = `Round ${activeHealthDeal.questionIndex + 1} / ${healthDealConfig.questions.length}`;
    questionEl.textContent = q.title;
    progressBar.style.width = `${20 + ((activeHealthDeal.questionIndex) / healthDealConfig.questions.length) * 40}%`;
    optionsEl.innerHTML = q.options.map((option) => `
      <button class="health-option" type="button" data-health-score="${option.score}">
        <strong>${option.title}</strong>
        <span>${option.copy}</span>
      </button>
    `).join('');
    optionsEl.querySelectorAll('.health-option').forEach((button) => {
      button.addEventListener('click', () => {
        activeHealthDeal.score += Number(button.dataset.healthScore || 0);
        activeHealthDeal.questionIndex += 1;
        if (activeHealthDeal.questionIndex >= healthDealConfig.questions.length) {
          quizStage.classList.add('hidden');
          wheelStage.classList.remove('hidden');
          progressBar.style.width = '72%';
          const quality = activeHealthDeal.score >= 10 ? 'Elite' : activeHealthDeal.score >= 7 ? 'Strong' : activeHealthDeal.score >= 5 ? 'Improving' : 'Starter';
          const calculatedDiscount = getDiscountByScore(activeHealthDeal.score);
          wheelCopy.textContent = `${quality} health profile detected. Your answers already calculated a ${calculatedDiscount.toFixed(1)}% discount, and the wheel will now reveal that exact number.`;
        } else {
          renderQuestion();
        }
      });
    });
  };

  const getDiscountByScore = (score) => {
    const minScore = healthDealConfig.questions.length;
    const maxScore = healthDealConfig.questions.length * 4;
    const normalizedScore = (score - minScore) / (maxScore - minScore);
    const clampedScore = Math.min(Math.max(normalizedScore, 0), 1);
    const discountIndex = Math.round(clampedScore * (healthDealConfig.discounts.length - 1));
    return healthDealConfig.discounts[discountIndex];
  };

  const spinWheel = () => {
    if (spinBtn.dataset.spinning === 'true') return;
    spinBtn.dataset.spinning = 'true';
    wheelEl.querySelectorAll('.health-wheel-label').forEach((label) => label.classList.remove('is-winner'));
    activeHealthDeal.discount = getDiscountByScore(activeHealthDeal.score);
    const slotIndex = healthDealConfig.discounts.indexOf(activeHealthDeal.discount);
    const segmentAngle = 360 / healthDealConfig.discounts.length;
    const fullSpins = 4;
    const landingAngle = (fullSpins * 360) - (slotIndex * segmentAngle);
    wheelEl.style.transform = `rotate(${landingAngle}deg)`;

    window.setTimeout(() => {
      const discountedPrice = activeHealthDeal.planPrice * (1 - activeHealthDeal.discount / 100);
      const winnerLabel = wheelEl.querySelector(`.health-wheel-label[data-discount="${activeHealthDeal.discount.toFixed(1)}"]`);
      if (winnerLabel) {
        winnerLabel.classList.add('is-winner');
      }
      wheelStage.classList.add('hidden');
      resultStage.classList.remove('hidden');
      progressBar.style.width = '100%';
      resultTitle.textContent = `${activeHealthDeal.discount.toFixed(1)}% healthy-lifestyle discount`;
      resultCopy.textContent = `Your recovery, rhythm, and body-awareness answers directly calculated this ${activeHealthDeal.discount.toFixed(1)}% discount for ${products[activeHealthDeal.productId].name}, and the wheel has revealed that exact earned result.`;
      winningBadge.textContent = `${activeHealthDeal.discount.toFixed(1)}%`;
      winningBadge.classList.add('is-visible');
      discountPercentEl.textContent = `${activeHealthDeal.discount.toFixed(1)}%`;
      finalPriceEl.textContent = `$${discountedPrice.toFixed(2)}`;
      spinBtn.dataset.spinning = 'false';
    }, 4500);
  };

  const claimDiscount = () => {
    const discountedPrice = activeHealthDeal.planPrice * (1 - activeHealthDeal.discount / 100);
    addToCart(activeHealthDeal.productId, activeHealthDeal.planType, Number(discountedPrice.toFixed(2)), activeHealthDeal.discount);
    closeHealthDeal();
  };

  spinBtn.onclick = spinWheel;
  claimBtn.onclick = claimDiscount;

  renderQuestion();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeHealthDeal() {
  const modal = document.getElementById('health-deal-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initHealthDealModal() {
  const modal = document.getElementById('health-deal-modal');
  if (!modal) return;
  modal.querySelectorAll('[data-health-close]').forEach((el) => {
    el.addEventListener('click', closeHealthDeal);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeHealthDeal();
  });
}

function initSiteReviewForm() {
  const form = document.getElementById('site-review-form');
  const starsInput = document.getElementById('review-stars-input');
  const ratingInput = document.getElementById('review-rating');
  const reviewsGrid = document.getElementById('reviews-grid');
  const modal = document.getElementById('review-modal');
  const openBtn = document.getElementById('open-review-modal');
  const useCaseSelect = document.getElementById('review-use-case');
  const useCaseOtherField = document.getElementById('review-use-case-other-field');
  const useCaseOtherInput = document.getElementById('review-use-case-other');
  if (!form || !starsInput || !ratingInput || !reviewsGrid || !modal || !openBtn || !useCaseSelect || !useCaseOtherField || !useCaseOtherInput) return;

  const starButtons = [...starsInput.querySelectorAll('.review-star-button')];

  const closeReviewModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openReviewModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const paintStars = (rating) => {
    starButtons.forEach((button) => {
      const isActive = Number(button.dataset.rating) <= rating;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const syncUseCaseField = () => {
    const isOther = useCaseSelect.value === 'Other';
    useCaseOtherField.classList.toggle('hidden', !isOther);
    useCaseOtherInput.required = isOther;
    if (!isOther) useCaseOtherInput.value = '';
  };

  paintStars(Number(ratingInput.value || 5));
  syncUseCaseField();
  openBtn.addEventListener('click', openReviewModal);
  modal.querySelectorAll('[data-review-close]').forEach((el) => {
    el.addEventListener('click', closeReviewModal);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeReviewModal();
  });
  useCaseSelect.addEventListener('change', syncUseCaseField);

  starButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const rating = Number(button.dataset.rating || 5);
      ratingInput.value = String(rating);
      paintStars(rating);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = (document.getElementById('review-name')?.value || '').trim();
    const message = (document.getElementById('review-message')?.value || '').trim();
    const selectedUseCase = (document.getElementById('review-use-case')?.value || '').trim();
    const customUseCase = (document.getElementById('review-use-case-other')?.value || '').trim();
    const useCase = selectedUseCase === 'Other' ? customUseCase : selectedUseCase;
    const rating = Number(ratingInput.value || 5);
    if (!name || !message || !useCase) return;

    const article = document.createElement('article');
    article.className = 'review-card';

    const tag = document.createElement('span');
    tag.className = 'review-tag';
    tag.textContent = 'Fresh Review';

    const topline = document.createElement('div');
    topline.className = 'review-card-topline';

    const useCasePill = document.createElement('span');
    useCasePill.className = 'review-usecase-pill';
    useCasePill.textContent = useCase;

    const body = document.createElement('p');
    body.textContent = `"${message}"`;

    const meta = document.createElement('div');
    meta.className = 'review-card-meta';

    const author = document.createElement('strong');
    author.textContent = `${name}, site visitor`;

    const stars = document.createElement('span');
    stars.className = 'review-card-stars';
    stars.textContent = `${'в…'.repeat(rating)}${'в†'.repeat(5 - rating)}`;

    topline.append(tag, useCasePill);
    meta.append(author, stars);
    article.append(topline, body, meta);

    reviewsGrid.prepend(article);
    form.reset();
    ratingInput.value = '5';
    paintStars(5);
    syncUseCaseField();
    closeReviewModal();
    showToast('Review submitted. It is now visible in the feedback section.');
  });
}

function initScrollMotion() {
  if (!document.querySelector('.dashboard-hero')) return;

  const revealTargets = [
    ...document.querySelectorAll('.dashboard-hero-copy, .dashboard-preview-main, .floating-note, .watch-photo-card'),
    ...document.querySelectorAll('.home-colors-section, .architecture-strip, .module-showcase, .desirability-strip, .operations-band, .intelligence-grid, .trust-section, .closing-banner'),
    ...document.querySelectorAll('.home-color-card, .architecture-card, .module-card, .desirability-shot, .ops-card, .intelligence-card, .trust-step, .aura-card-watch, .aura-card-content')
  ];

  const seen = new Set();
  revealTargets.forEach((el, index) => {
    if (seen.has(el)) return;
    seen.add(el);
    el.classList.add('scroll-reveal');
    el.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 90, 450)}ms`);
  });

  document.querySelectorAll('.watch-photo-card-side, .floating-note-left').forEach((el) => {
    el.classList.add('reveal-side-left');
  });

  document.querySelectorAll('.watch-photo-card-main, .floating-note-right, .desirability-shot.large').forEach((el) => {
    el.classList.add('reveal-side-right');
  });

  document.querySelectorAll('.aura-card').forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? 'reveal-side-left' : 'reveal-side-right');
  });

  document.querySelectorAll('.watch-photo-card, .desirability-shot, .floating-note, .aura-card-watch, .aura-card-bg img').forEach((el, index) => {
    el.setAttribute('data-parallax', '');
    el.dataset.parallaxSpeed = String(22 + (index % 4) * 14);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  seen.forEach((el) => revealObserver.observe(el));

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  if (!parallaxItems.length) return;

  let ticking = false;
  const updateParallax = () => {
    const viewportHeight = window.innerHeight || 1;
    parallaxItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const speed = Number(el.dataset.parallaxSpeed || 20);
      const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
      el.style.setProperty('--parallax-shift', `${progress * speed * -1}px`);
    });
    ticking = false;
  };

  const requestParallax = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
}

// в”Ђв”Ђв”Ђ CHECKOUT FORM в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', e => { e.preventDefault(); placeOrderAction(); });
}

function placeOrderAction() {
  cart = []; saveCart(); updateCartBadge();
  const inner = document.querySelector('.checkout-inner');
  if (inner) inner.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:80px 20px">
      <div style="font-size:5rem;margin-bottom:24px">рџЋ‰</div>
      <div style="display:inline-block;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);color:var(--green);padding:8px 20px;border-radius:20px;font-size:0.8rem;font-weight:700;letter-spacing:1px;margin-bottom:24px;text-transform:uppercase">Order Confirmed</div>
      <h2 style="font-size:2.5rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:16px">Order Placed!</h2>
      <p style="color:var(--light-gray);margin-bottom:8px;font-size:1rem;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7">
        Your Wellec Band is on its way. Activate your subscription in the app and start earning DeFi yield through Emotional Mining.
      </p>
      <p style="color:var(--gray);font-size:0.85rem;margin-bottom:40px">Estimated delivery: 5вЂ“7 business days В· App setup guide sent to your email.</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
        <a href="index.html" class="btn-primary">Back to Home</a>
        <a href="shop.html" class="btn-outline">Keep Shopping</a>
      </div>
    </div>`;
}

// в”Ђв”Ђв”Ђ INIT в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initNav();
  initHeroWatch();
  initShopWatches();
  initColorSwitcher();
  renderCart();
  renderCheckoutItems();
  initCheckoutForm();
  initHealthDealModal();
  initFitFinder();
  initSiteReviewForm();
  initCollectionZoom();
  initScrollMotion();
  // Animate WVI scores on scroll
  const wviEls = document.querySelectorAll('[data-wvi-animate]');
  if (wviEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateWVI(e.target.id, parseInt(e.target.dataset.wviAnimate)); obs.unobserve(e.target); }
      });
    }, {threshold: 0.5});
    wviEls.forEach(el => obs.observe(el));
  }
});
