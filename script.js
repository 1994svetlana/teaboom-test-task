const products = {
  100: { price: '326,40 ₽', old: '349,20 ₽', article: '01306', discount: '−7%' },
  500: { price: '1 432 ₽', old: '1 646 ₽', article: '01307', discount: '−13%' },
  1000: { price: '2 064 ₽', old: '2 592 ₽', article: '01308', discount: '−20%' },
  5000: { price: '6 320 ₽', old: '8 710 ₽', article: '01309', discount: '−27%' }
};

const sizeCards = document.querySelectorAll('.size-card');
const currentPrice = document.getElementById('currentPrice');
const oldPrice = document.getElementById('oldPrice');
const article = document.getElementById('article');
const discount = document.getElementById('discount');
const quantityOutput = document.getElementById('quantity');
const cartCount = document.getElementById('cartCount');
const cartFeedback = document.getElementById('cartFeedback');
const addToCart = document.getElementById('addToCart');
let selectedSize = '100';
let quantity = 1;
let totalItems = 0;

sizeCards.forEach((card) => {
  card.addEventListener('click', () => {
    selectedSize = card.dataset.size;
    const product = products[selectedSize];
    sizeCards.forEach((item) => {
      const selected = item === card;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    currentPrice.textContent = product.price;
    oldPrice.textContent = product.old;
    article.textContent = product.article;
    discount.textContent = product.discount;
    cartFeedback.textContent = '';
  });
});

document.getElementById('minus').addEventListener('click', () => {
  quantity = Math.max(1, quantity - 1);
  quantityOutput.textContent = quantity;
});
document.getElementById('plus').addEventListener('click', () => {
  quantity = Math.min(99, quantity + 1);
  quantityOutput.textContent = quantity;
});

addToCart.addEventListener('click', () => {
  totalItems += quantity;
  cartCount.textContent = totalItems;
  cartFeedback.textContent = `Добавлено: ${quantity} × ${selectedSize} г. Заказ пока демонстрационный.`;
  addToCart.querySelector('span').textContent = 'Добавлено ✓';
  window.setTimeout(() => {
    addToCart.querySelector('span').textContent = 'Добавить в корзину';
  }, 1600);
});

function toggleFavorite(button) {
  const active = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(active));
  button.textContent = active ? '♥' : '♡';
  button.setAttribute('aria-label', active ? 'Убрать из избранного' : 'Добавить в избранное');
}
document.getElementById('favorite').addEventListener('click', (event) => toggleFavorite(event.currentTarget));
document.getElementById('favoriteTop').addEventListener('click', (event) => toggleFavorite(event.currentTarget));

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('.thumbnail').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumbnail').forEach((item) => {
      const selected = item === thumb;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const note = document.querySelector('.gallery-caption span:nth-child(2)');
    const captions = ['Светлый улун с ароматом спелого ананаса', 'Крупный скрученный чайный лист', 'Сочная фруктовая нота в каждом глотке'];
    note.textContent = captions[Array.from(document.querySelectorAll('.thumbnail')).indexOf(thumb)];
  });
});
