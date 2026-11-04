/* LUMIÈRE — fictional shopping bag; no checkout or payment processing */
(() => {
  const drawer = document.getElementById('lumiere-bag');
  const overlay = document.getElementById('bag-overlay');
  const openButton = document.getElementById('bag-button');
  const closeButton = document.getElementById('bag-close');
  const list = document.getElementById('bag-items');
  const subtotal = document.getElementById('bag-subtotal');
  const count = document.getElementById('bag-count');
  if (!drawer || !overlay || !openButton || !list || !subtotal || !count) return;
  const catalog = {
    'Éclat Radiance Serum': { price: 42, short: 'éclat', tone: 'lilac' },
    'Nuage Cloud Cream': { price: 38, short: 'nuage', tone: 'peach' },
    'Calme Gentle Cleanser': { price: 28, short: 'calme', tone: 'sage' }
  };
  const cart = {};
  let previousFocus = null;
  const money = n => '$' + n.toFixed(2);
  function render() {
    list.replaceChildren();
    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    const quantity = entries.reduce((sum, [, qty]) => sum + qty, 0);
    const total = entries.reduce((sum, [name, qty]) => sum + catalog[name].price * qty, 0);
    count.textContent = `(${quantity})`;
    subtotal.textContent = money(total);
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.className = 'bag-empty';
      empty.innerHTML = '<div class="bag-empty__icon" aria-hidden="true">✳</div><h3>Your bag is waiting.</h3><p>A little radiance goes a long way.<br>Explore the collection to add your favorites.</p>';
      list.append(empty);
      return;
    }
    entries.forEach(([name, qty]) => {
      const product = catalog[name];
      const row = document.createElement('article');
      row.className = 'bag-item';
      const art = document.createElement('div');
      art.className = 'bag-item__art'; art.dataset.tone = product.tone; art.textContent = product.short;
      const info = document.createElement('div');
      const title = document.createElement('h3'); title.className = 'bag-item__name'; title.textContent = name;
      const price = document.createElement('p'); price.className = 'bag-item__price'; price.textContent = `${money(product.price)} each`;
      const controls = document.createElement('div'); controls.className = 'bag-item__controls';
      const qtyControl = document.createElement('div'); qtyControl.className = 'bag-qty'; qtyControl.setAttribute('aria-label', `Quantity of ${name}`);
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', `Remove one ${name}`);
      minus.addEventListener('click', () => { cart[name] = Math.max(0, cart[name] - 1); render(); });
      const number = document.createElement('span'); number.textContent = qty;
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', `Add one ${name}`);
      plus.addEventListener('click', () => { cart[name]++; render(); });
      qtyControl.append(minus, number, plus);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'bag-remove'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => { delete cart[name]; render(); });
      controls.append(qtyControl, remove); info.append(title, price, controls); row.append(art, info); list.append(row);
    });
  }
  function open() {
    previousFocus = document.activeElement;
    overlay.hidden = false; drawer.hidden = false;
    document.body.classList.add('bag-is-open');
    openButton.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => { overlay.classList.add('is-open'); drawer.classList.add('is-open'); closeButton.focus(); });
  }
  function close() {
    overlay.classList.remove('is-open'); drawer.classList.remove('is-open');
    document.body.classList.remove('bag-is-open');
    openButton.setAttribute('aria-expanded', 'false');
    const finish = () => { if (!drawer.classList.contains('is-open')) { overlay.hidden = true; drawer.hidden = true; } };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else setTimeout(finish, 320);
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  openButton.addEventListener('click', e => { e.stopImmediatePropagation(); open(); }, true);
  document.querySelectorAll('.add-button[data-product]').forEach(button => {
    button.addEventListener('click', e => {
      const name = button.dataset.product;
      if (!catalog[name]) return;
      e.stopImmediatePropagation();
      cart[name] = (cart[name] || 0) + 1;
      render(); open();
    }, true);
  });
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', close);
  drawer.querySelector('[data-bag-continue]').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (drawer.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    const focusable = [...drawer.querySelectorAll('button:not([disabled]),a[href]')];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  render();
})();
