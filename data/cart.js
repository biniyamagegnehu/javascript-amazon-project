export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1,
    deliveryOptionId:'1'
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:2,
    deliveryOptionId:'2'
}];

}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addCart(productId) {
    let matchingitem;
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingitem = item;
        }
      });
      if(matchingitem){
        matchingitem.quantity += 1;
      } else {
        cart.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:'1'
        });
        console.log(cart);
      }
      saveToStorage();
  }

  export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartitem) => {
      if (cartitem.productId !== productId){
        newCart.push(cartitem);
      }
    });
    cart = newCart;
    saveToStorage();
  }

export function updateCartQuantity(productId,newQuantity) {
  let matchingitem;

  cart.forEach((item) => {
    if(item.productId === productId){
      matchingitem = item;
    }
  });

  matchingitem.quantity = newQuantity;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;

}
