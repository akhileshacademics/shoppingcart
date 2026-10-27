"use strict";
// Product quantities and prices.
let toteQuantity = 1;
let bottleQuantity = 0;
let scarfQuantity = 0;
let couponUsed = false;
const totePrice = Number(document.getElementById('tote-price').innerHTML);
const bottlePrice = Number(document.getElementById('bottle-price').innerHTML);
const scarfPrice = Number(document.getElementById('scarf-price').innerHTML);
function updateCart() {
    const subtotal = (toteQuantity * totePrice) + (bottleQuantity * bottlePrice) + (scarfQuantity * scarfPrice);
    const itemCount = toteQuantity + bottleQuantity + scarfQuantity;
    const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 7;
    const discount = couponUsed ? subtotal * 0.10 : 0;
    const total = subtotal + shipping - discount;
    document.getElementById('tote-cart-item').hidden = toteQuantity === 0;
    document.getElementById('bottle-cart-item').hidden = bottleQuantity === 0;
    document.getElementById('scarf-cart-item').hidden = scarfQuantity === 0;
    document.getElementById('empty-cart').hidden = itemCount !== 0;
    document.getElementById('tote-quantity').innerHTML = 'Quantity: ' + toteQuantity;
    document.getElementById('bottle-quantity').innerHTML = 'Quantity: ' + bottleQuantity;
    document.getElementById('scarf-quantity').innerHTML = 'Quantity: ' + scarfQuantity;
    document.getElementById('header-count').innerHTML = String(itemCount);
    document.getElementById('item-label').innerHTML = itemCount + ' item(s)';
    document.getElementById('subtotal').innerHTML = '$' + subtotal.toFixed(2);
    document.getElementById('shipping').innerHTML = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
    document.getElementById('discount').innerHTML = '-$' + discount.toFixed(2);
    document.getElementById('discount-row').hidden = !couponUsed;
    document.getElementById('total').innerHTML = '$' + total.toFixed(2);
}
function addTote() { toteQuantity = toteQuantity + 1; updateCart(); }
function addBottle() { bottleQuantity = bottleQuantity + 1; updateCart(); }
function addScarf() { scarfQuantity = scarfQuantity + 1; updateCart(); }
function removeTote() { toteQuantity = 0; updateCart(); }
function removeBottle() { bottleQuantity = 0; updateCart(); }
function removeScarf() { scarfQuantity = 0; updateCart(); }
function applyCoupon() {
    const code = document.getElementById('promo-code').value;
    couponUsed = code === 'SAVE10';
    document.getElementById('promo-message').innerHTML = couponUsed ? '10% discount applied!' : 'Use SAVE10 for 10% off.';
    updateCart();
}
function checkout() {
    document.getElementById('toast').innerHTML = 'Checkout is ready. Thank you!';
}
updateCart();
