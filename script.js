// Общие данные для обеих страниц
const products = [
    {
        id: 1,
        article: '87654321', // Фиксированный артикул
        title: 'Кубик Рубика 3x3',
        price: 250,
        image: '20250712_163402.jpg',
        description: 'Классический кубик Рубика',
        specs: {
            'Размер:': '3x3',
        }
    },
    {
        id: 2,
        article: '12345678',
        title: 'Кубик Рубика 2x2',
        price: 200,
        image: '20250712_163422.jpg',
        description: 'Кубик Рубика',
        specs: {
            'Размер:': '2x2',
        }
    },
    {
        id: 3,
        article: '23456789',
        title: 'Кубик Рубика 4x4',
        price: 350,
        image: '20250712_163347.jpg',
        description: 'Кубик Рубика',
        specs: {
            'Размер:': '4x4',
        }
    },
    {
        id: 4,
        article: '34567890',
        title: 'Пирамида Рубика',
        price: 250,
        image: '20250712_163444.jpg',
        description: 'Пирамида Рубика',
        specs: {
            'Размер:': '3x3',
        }
    },
    {
        id: 5,
        article: '45678901',
        title: 'Кубик Рубика 3x3 мини',
        price: 200,
        image: '20250712_163437.jpg',
        description: 'Кубик Рубика',
        specs: {
            'Размер:': 'МИНИ, 3x3',
        }
    },
    {
        id: 6,
        article: '56789012',
        title: 'Кубик Рубика зеркальный',
        price: 300,
        image: '20250712_163429.jpg',
        description: 'Кубик Рубика',
        specs: {
            'Цвет:': '   Золотой',
        }
    },
    {
        id: 7,
        article: '67890123',
        title: 'Кубик Рубика зеркальный',
        price: 300,
        image: '20250712_163413.jpg',
        description: 'Кубик Рубика',
        specs: {
            'Цвет:': '   Серебряный',
        }
    }
];

// Проверяем, на какой странице мы находимся
const isProductPage = window.location.pathname.includes('product.html');

// Функции для главной страницы
if (!isProductPage) {
    // Отображение товаров на главной странице
    function displayProducts() {
        const productGrid = document.getElementById('productGrid');
        
        if (productGrid) {
            productGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('a');
                productCard.className = 'product-card';
                productCard.href = `product.html?art=${product.article}`;
                
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });
        }
    }

    // Инициализация главной страницы
    document.addEventListener('DOMContentLoaded', displayProducts);
} 
// Функции для страницы товара
else {
    // Загрузка данных товара
    function loadProductData() {
        const params = new URLSearchParams(window.location.search);
        const article = params.get('art');
        
        if (article) {
            const product = products.find(p => p.article === article);
            if (product) {
                displayProduct(product);
            } else {
                displayNotFound();
            }
        } else {
            displayNotFound();
        }
    }

    // Отображение товара
    function displayProduct(product) {
        const productPage = document.getElementById('productPage');
        
        // Создаем HTML для характеристик
        let specsHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        
        productPage.innerHTML = `
            <div class="product-container">
                <a href="index.html" class="back-button">← Назад к каталогу</a>
                
                <div class="product-details">
                    <div>
                        <img src="${product.image}" alt="${product.title}" class="product-main-image">
                    </div>
                    
                    <div>
                        <h1>${product.title}</h1>
                        <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                        
                        <button class="add-to-cart">Добавить в корзину</button>
                        
                        <div class="product-meta">
                            Артикул: <span class="product-article">${product.article}</span>
                        </div>
                        
                        <div class="product-description">
                            <h3>Описание</h3>
                            <p>${product.description}</p>
                        </div>
                        
                        <div class="product-specs">
                            <h3>Характеристики</h3>
                            <table>
                                ${specsHTML}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Обработчик для кнопки "Добавить в корзину"
        document.querySelector('.add-to-cart')?.addEventListener('click', () => {
            alert(`Товар "${product.title}" добавлен в корзину!`);
        });
    }

    // Отображение сообщения, если товар не найден
    function displayNotFound() {
        const productPage = document.getElementById('productPage');
        productPage.innerHTML = `
            <div class="product-container">
                <a href="index.html" class="back-button">← Назад к каталогу</a>
                <h2>Товар не найден</h2>
                <p>Извините, но товар с указанным артикулом не существует.</p>
            </div>
        `;
    }

    // Инициализация страницы товара
    document.addEventListener('DOMContentLoaded', loadProductData);
}