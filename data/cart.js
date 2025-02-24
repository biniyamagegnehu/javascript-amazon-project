export const cart = [];

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
          quantity:1
        });
        console.log(cart);
      }
  }
  
