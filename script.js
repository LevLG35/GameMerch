function addToCart(productName, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1, image: image });
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
    li.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border-radius: 6px;">
        <div>
          <strong>${item.name}</strong><br>
          <span>${item.quantity} × ${item.price} грн = ${item.price * item.quantity} грн</span>
        </div>
      </div>
    `;

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

  const regForm = document.querySelector("form.register");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (name && email && password) {
        const user = { name, email, password };
        localStorage.setItem('registeredUser', JSON.stringify(user));

        alert("Реєстрація успішна!");
        window.location.href = "login.html";
      } else {
        alert("Будь ласка, заповніть усі поля.");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (!email || !password) {
        alert("Будь ласка, введіть email та пароль.");
        return;
      }

      const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

      if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert(`Вітаємо, ${savedUser.name}! Ви увійшли.`);
        localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
        window.location.href = "index.html";
      } else {
        alert("Невірний email або пароль.");
      }
    });
  }

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

const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    if (!name || !phone || !address) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert("Ваш кошик порожній. Додайте товари перед оформленням.");
      window.location.href = "catalog.html";
      return;
    }

    localStorage.removeItem('cart');

    alert(`Дякуємо, ${name}! Ваше замовлення прийнято. Очікуйте дзвінка.`);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
}


      
