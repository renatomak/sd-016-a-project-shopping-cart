const fetchItem = (item) => {
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((data) => data.json())
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
