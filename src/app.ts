// Product quantities and prices.
let toteQuantity: number = 1;
let bottleQuantity: number = 0;
let scarfQuantity: number = 0;
let couponUsed: boolean = false;

const totePrice: number = Number(document.getElementById('tote-price')!.innerHTML);
const bottlePrice: number = Number(document.getElementById('bottle-price')!.innerHTML);
const scarfPrice: number = Number(document.getElementById('scarf-price')!.innerHTML);

function updateCart(): void {
  const subtotal: number = (toteQuantity * totePrice) + (bottleQuantity * bottlePrice) + (scarfQuantity * scarfPrice);
  const itemCount: number = toteQuantity + bottleQuantity + scarfQuantity;
  const shipping: number = subtotal === 0 || subtotal >= 75 ? 0 : 7;
  const discount: number = couponUsed ? subtotal * 0.10 : 0;
  const total: number = subtotal + shipping - discount;

  document.getElementById('tote-cart-item')!.hidden = toteQuantity === 0;
  document.getElementById('bottle-cart-item')!.hidden = bottleQuantity === 0;
  document.getElementById('scarf-cart-item')!.hidden = scarfQuantity === 0;
  document.getElementById('empty-cart')!.hidden = itemCount !== 0;

  document.getElementById('tote-quantity')!.innerHTML = 'Quantity: ' + toteQuantity;
  document.getElementById('bottle-quantity')!.innerHTML = 'Quantity: ' + bottleQuantity;
  document.getElementById('scarf-quantity')!.innerHTML = 'Quantity: ' + scarfQuantity;
  document.getElementById('header-count')!.innerHTML = String(itemCount);
  document.getElementById('item-label')!.innerHTML = itemCount + ' item(s)';
  document.getElementById('subtotal')!.innerHTML = '$' + subtotal.toFixed(2);
  document.getElementById('shipping')!.innerHTML = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
  document.getElementById('discount')!.innerHTML = '-$' + discount.toFixed(2);
  document.getElementById('discount-row')!.hidden = !couponUsed;
  document.getElementById('total')!.innerHTML = '$' + total.toFixed(2);
}

function addTote(): void { toteQuantity = toteQuantity + 1; updateCart(); }
function addBottle(): void { bottleQuantity = bottleQuantity + 1; updateCart(); }
function addScarf(): void { scarfQuantity = scarfQuantity + 1; updateCart(); }

function removeTote(): void { toteQuantity = 0; updateCart(); }
function removeBottle(): void { bottleQuantity = 0; updateCart(); }
function removeScarf(): void { scarfQuantity = 0; updateCart(); }

function applyCoupon(): void {
  const code: string = (document.getElementById('promo-code') as HTMLInputElement).value;
  couponUsed = code === 'SAVE10';
  document.getElementById('promo-message')!.innerHTML = couponUsed ? '10% discount applied!' : 'Use SAVE10 for 10% off.';
  updateCart();
}

function checkout(): void {
  document.getElementById('toast')!.innerHTML = 'Checkout is ready. Thank you!';
}

updateCart();
