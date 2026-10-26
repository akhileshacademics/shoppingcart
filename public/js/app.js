// Change these values to change the price or starting quantity.
let toteQuantity = 1;
let bottleQuantity = 0;
let scarfQuantity = 0;
let discount = 0;
const totePrice = 38;
const bottlePrice = 18;
const scarfPrice = 29;

function showCart() {
  const subtotal = (totePrice * toteQuantity) + (bottlePrice * bottleQuantity) + (scarfPrice * scarfQuantity);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 7;
  if (subtotal === 0) discount = 0;
  const total = subtotal + shipping - discount;
  let cartItems = '';

  if (toteQuantity > 0) {
    cartItems += `
      <article class="cart-product">
        <div class="product-art art-orange">👜</div>
        <div class="item-info"><h3>Everyday Tote</h3><p>Sand canvas · One size</p><p class="item-price">$${totePrice}.00</p></div>
        <div class="item-actions">
          <button class="remove-button" onclick="removeTote()">Remove</button>
          <div class="quantity-control"><button onclick="changeTote(-1)">−</button><span>${toteQuantity}</span><button onclick="changeTote(1)">+</button></div>
        </div>
      </article>`;
  }

  if (bottleQuantity > 0) {
    cartItems += `<article class="cart-product"><div class="product-art art-green">🫗</div><div class="item-info"><h3>Daily Water Bottle</h3><p>500 ml · Sage</p><p class="item-price">$${bottlePrice}.00</p></div><div class="item-actions"><button class="remove-button" onclick="removeBottle()">Remove</button><div class="quantity-control"><button onclick="changeBottle(-1)">−</button><span>${bottleQuantity}</span><button onclick="changeBottle(1)">+</button></div></div></article>`;
  }

  if (scarfQuantity > 0) {
    cartItems += `<article class="cart-product"><div class="product-art art-blue">🧣</div><div class="item-info"><h3>Oversized Scarf</h3><p>Warm oat</p><p class="item-price">$${scarfPrice}.00</p></div><div class="item-actions"><button class="remove-button" onclick="removeScarf()">Remove</button><div class="quantity-control"><button onclick="changeScarf(-1)">−</button><span>${scarfQuantity}</span><button onclick="changeScarf(1)">+</button></div></div></article>`;
  }

  const totalItems = toteQuantity + bottleQuantity + scarfQuantity;
  document.getElementById('cart-list').innerHTML = cartItems || '<p>Your cart is empty.</p>';
  document.getElementById('header-count').innerHTML = totalItems;
  document.getElementById('item-label').innerHTML = totalItems + ' item(s)';
  document.getElementById('subtotal').innerHTML = '$' + subtotal.toFixed(2);
  document.getElementById('shipping').innerHTML = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
  document.getElementById('discount').innerHTML = '-$' + discount.toFixed(2);
  document.getElementById('total').innerHTML = '$' + total.toFixed(2);
}

function changeTote(number) {
  toteQuantity = toteQuantity + number;
  if (toteQuantity < 0) toteQuantity = 0;
  showCart();
}

function changeBottle(number) {
  bottleQuantity = bottleQuantity + number;
  if (bottleQuantity < 0) bottleQuantity = 0;
  showCart();
}

function changeScarf(number) {
  scarfQuantity = scarfQuantity + number;
  if (scarfQuantity < 0) scarfQuantity = 0;
  showCart();
}

function removeTote() {
  toteQuantity = 0;
  showCart();
}

function removeBottle() {
  bottleQuantity = 0;
  showCart();
}

function removeScarf() {
  scarfQuantity = 0;
  showCart();
}

function addBottle() {
  bottleQuantity = bottleQuantity + 1;
  showCart();
}

function addScarf() {
  scarfQuantity = scarfQuantity + 1;
  showCart();
}

function applyPromo() {
  const code = document.getElementById('promo-code').value;

  if (code === 'SAVE10') {
    discount = ((totePrice * toteQuantity) + (bottlePrice * bottleQuantity) + (scarfPrice * scarfQuantity)) * 0.10;
    document.getElementById('promo-message').innerHTML = '10% discount applied!';
  } else {
    discount = 0;
    document.getElementById('promo-message').innerHTML = 'Try SAVE10';
  }

  showCart();
}

document.getElementById('apply-promo').onclick = applyPromo;
document.getElementById('checkout-button').onclick = function () {
  document.getElementById('toast').innerHTML = 'Checkout is ready. Thank you!';
};

document.getElementById('product-grid').innerHTML = `
  <article class="recommended-product">
    <div class="product-art art-green">🫗</div>
    <h3>Daily Water Bottle</h3><p>500 ml · Sage</p>
    <div class="product-bottom"><strong>$18.00</strong><button class="add-button" onclick="addBottle()">Add to cart</button></div>
  </article>
  <article class="recommended-product">
    <div class="product-art art-blue">🧣</div>
    <h3>Oversized Scarf</h3><p>Warm oat</p>
    <div class="product-bottom"><strong>$29.00</strong><button class="add-button" onclick="addScarf()">Add to cart</button></div>
  </article>`;
showCart();
