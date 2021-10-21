function fetchProducts($QUERY) {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
}
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
