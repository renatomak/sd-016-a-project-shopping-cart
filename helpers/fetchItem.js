const fetchItem = (id) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
