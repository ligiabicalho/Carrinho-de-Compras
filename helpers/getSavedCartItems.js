const getSavedCartItems = () => {
  const getSavedItem = localStorage.getItem('cartItems');
  if (getSavedItem === 'undefined' || !getSavedItem) {
    return '[]';
  }
  return getSavedItem;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
