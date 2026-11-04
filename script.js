
const bagCount = document.getElementById('bag-count');
const bagButton = document.getElementById('bag-button');
const toast = document.getElementById('toast');

let items = [];
let toastTimeout;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    items.push(productName);

    if (bagCount) {
      bagCount.textContent = `(${items.length})`;
    }

    showToast(`${productName} added to your bag!`);
  });
});

if (bagButton) {
  bagButton.addEventListener('click', () => {
    if (items.length === 0) {
      showToast('Your shopping bag is empty.');
    } else {
      showToast(
        `Your bag contains: ${items.join(', ')}. Checkout is not available in this demo.`
      );
    }
  });
}

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
