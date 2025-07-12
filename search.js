// Функция инициализации поиска
import { initSearch, renderProducts } from './search.js';
function initSearch(products) {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const productGrid = document.getElementById('productGrid');

  // Обработчик поиска при нажатии кнопки
  searchButton.addEventListener('click', () => {
    performSearch(searchInput.value.trim().toLowerCase(), products, productGrid);
  });

  // Обработчик поиска при нажатии Enter
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value.trim().toLowerCase(), products, productGrid);
    }
  });
}

// Функция выполнения поиска
function performSearch(searchTerm, products, productGrid) {
  if (!searchTerm) {
    renderProducts(products, productGrid); // Показываем все товары если поиск пустой
    return;
  }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.article.includes(searchTerm)
  );

  renderProducts(filteredProducts, productGrid);
}

// Функция отрисовки товаров
function renderProducts(productsToRender, productGrid) {
  productGrid.innerHTML = productsToRender.map(product => `
    <a href="product.html?art=${product.article}" class="product-card">
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
        <div class="product-article">Арт: ${product.article}</div>
      </div>
    </a>
  `).join('');
}

// Экспорт функций для использования в других файлах
export { initSearch, performSearch, renderProducts };
export { initSearch, performSearch, renderProducts };