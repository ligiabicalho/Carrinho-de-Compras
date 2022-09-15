const saveCartItems = (cartItem) => {
  // const stringCartItem = JSON.stringify(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItem));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
