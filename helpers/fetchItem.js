const fetchItem = async (itemID) => {
  try { 
    const urlEndpoint = `https://api.mercadolibre.com/items/${itemID}`;
    const resp = await fetch(urlEndpoint);
    const result = await resp.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
