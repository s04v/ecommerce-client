
const Cart = {
  add: (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 

    const existedIndex = cart.findIndex((i) => i.id === item.id);
    console.log(existedIndex)
    if(existedIndex !== -1) {
      cart[existedIndex].quantity += item.quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, item]));
    }
  },
  remove: (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    cart = cart.filter((i) => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  removeAll: () => {
    localStorage.setItem('cart', JSON.stringify([]));
  },
  get: () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
}

export default Cart;
 