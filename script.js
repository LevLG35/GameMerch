let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert(`Товар "${name}" додано до кошика!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} грн`;

    const btn = document.createElement('button');
    btn.textContent = 'Видалити';
    btn.className = 'remove-btn';
    btn.onclick = () => removeFromCart(index);

    li.appendChild(btn);
    cartItems.appendChild(li);

    total += item.price;
  });

  cartTotal.textContent = `Разом: ${total} грн`;
}

window.onload = renderCart;

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) {
      alert('Ваш кошик порожній!');
      return;
    }
    window.location.href = 'checkout.html';
  });
}

  function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${productName} додано до кошика!`);
  }

document.addEventListener("DOMContentLoaded", function () {
  const ascBtn = document.getElementById("sort-asc");
  const descBtn = document.getElementById("sort-desc");
  const container = document.querySelector(".row");

  function getPrice(element) {
    return parseFloat(element.querySelector(".card-text").dataset.price);
  }

  function sortProducts(ascending = true) {
    const products = Array.from(container.querySelectorAll(".product"));
    products.sort((a, b) => {
      return ascending ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a);
    });

    // Очистити контейнер і вставити відсортовані товари
    container.innerHTML = "";
    products.forEach((product) => container.appendChild(product));
  }

  ascBtn.addEventListener("click", () => sortProducts(true));
  descBtn.addEventListener("click", () => sortProducts(false));
});

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // блокуємо стандартну відправку форми

      // Тут можна зробити перевірки або зберігання (не обов’язково)
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (name && email && password) {
        // Теоретично можна зберегти в localStorage чи просто перейти
        alert("Реєстрація успішна!");

        // Перенаправлення на сторінку входу
        window.location.href = "login.html";
      } else {
        alert("Будь ласка, заповніть усі поля.");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // зупиняє стандартну відправку форми

      // Тут можна вставити перевірку логіна і пароля (якщо треба)
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Наприклад, умовна перевірка:
      if (email && password) {
        // Зберегти, що користувач "увійшов", у localStorage, якщо потрібно
        localStorage.setItem("userEmail", email);

        // Перенаправлення
        window.location.href = "index.html";
      } else {
        alert("Введіть email та пароль!");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        alert("Дякуємо за ваше звернення!");

        // Переадресація через 1.5 секунди
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        alert("Будь ласка, заповніть усі поля.");
      }
    });
  });




