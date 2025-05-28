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

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.quantity}) - ${item.price * item.quantity} грн`;

    const btn = document.createElement('button');
    btn.textContent = 'Видалити';
    btn.className = 'remove-btn';
    btn.onclick = () => removeFromCart(index);

    li.appendChild(btn);
    cartItems.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Разом: ${total} грн`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Кошик
  renderCart();

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert('Ваш кошик порожній!');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }

  // Сортування каталогу
  const ascBtn = document.getElementById("sort-asc");
  const descBtn = document.getElementById("sort-desc");
  const container = document.querySelector(".row");

  function getPrice(element) {
    return parseFloat(element.querySelector(".card-text").dataset.price);
  }

  function sortProducts(ascending = true) {
    if (!container) return;
    const products = Array.from(container.querySelectorAll(".product"));
    products.sort((a, b) => ascending ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a));
    container.innerHTML = "";
    products.forEach((product) => container.appendChild(product));
  }

  if (ascBtn && descBtn) {
    ascBtn.addEventListener("click", () => sortProducts(true));
    descBtn.addEventListener("click", () => sortProducts(false));
  }

  // Реєстрація
  const regForm = document.querySelector("form.register");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (name && email && password) {
        alert("Реєстрація успішна!");
        window.location.href = "login.html";
      } else {
        alert("Будь ласка, заповніть усі поля.");
      }
    });
  }

  // Вхід
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (email && password) {
        localStorage.setItem("userEmail", email);
        window.location.href = "index.html";
      } else {
        alert("Введіть email та пароль!");
      }
    });
  }

  // Контакти
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (name && email && message) {
        alert("Дякуємо за ваше звернення!");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        alert("Будь ласка, заповніть усі поля.");
      }
    });
  }
});
