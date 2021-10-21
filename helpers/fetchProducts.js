const fetchProducts = async (search) => {
  // if (!search) throw new Error("You must provide an url");

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
