const fetchProducts = async (product) => {
  try { 
    const urlEndpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const resp = await fetch(urlEndpoint);
    const result = await resp.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
