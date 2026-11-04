// LUMIÈRE — demo shopping bag and accessible notifications
(() => {
  const bagCount = document.getElementById('bag-count');
  const bagButton = document.getElementById('bag-button');
  const toast = document.getElementById('toast');
  const year = document.getElementById('year');
  const items = [];
  let toastTimer;

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  document.querySelectorAll('[data-product]').forEach(button => {
    button.addEventListener('click', () => {
      items.push(button.dataset.product);
      if (bagCount) bagCount.textContent = `(${items.length})`;
      notify(`${button.dataset.product} added to your bag.`);
    });
  });

  if (bagButton) {
    bagButton.addEventListener('click', () => {
      if (!items.length) {
        notify('Your bag is empty. Explore the collection to add a product.');
      } else {
        notify(`Your bag: ${items.join(', ')}. This is a design demo; checkout is not available.`);
      }
    });
  }

  if (year) year.textContent = new Date().getFullYear();
})();
