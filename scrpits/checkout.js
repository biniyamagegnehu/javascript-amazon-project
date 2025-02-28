import { calculateCartQuantity, cart, removeFromCart, updateCartQuantity } from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOption} from '../data/DeliveryOption.js';

const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartHTML = '';
cart.forEach((cartitem) => {
    const productId = cartitem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if(product.id == productId){
            matchingProduct = product;
        }
    });

    const deliveryOptionId = cartitem.deliveryOptionId;

    let deliveryoption;

    deliveryOption.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryoption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryoption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format('ddd, MMMM D');

    cartHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCent/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quntity-input js-quantity-input-${matchingProduct.id}">
                   <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchingProduct.id}">Save
                    </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliverOptionHTML(matchingProduct,cartitem)}
            </div>
          </div>
    `;
});


document.querySelector('.order-summary').innerHTML = cartHTML;

function deliverOptionHTML(matchingProduct,cartitem){
  let html = '';
  
  deliveryOption.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format('ddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0 ?'FREE' : `$${deliveryOption.priceCent} -`;
    
    const isChecked = deliveryOption.id === cartitem.deliveryOptionId;

    html += `
    <div class="delivery-option">
      <input type="radio" 
        ${isChecked ? 'checked': ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
      </div>
    </div>
`
  })
 return html;
}

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    console.log(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
  
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');
    const quantity = container.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantity.value);
    updateCartQuantity(productId,newQuantity);
  });
});


document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    
  });
});
calculateCartQuantity();