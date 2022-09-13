const fetchProducts = (product) => {
  const url = `api.mercadolibre.com/sites/MLB/search?q=${product}`;
  fetch(url);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
