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
