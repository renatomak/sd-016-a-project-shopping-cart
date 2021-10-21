// Feito com o auxilio do vídeo gravado pelo Instrutor Bernardo Salgueiro.
const fetchProducts = (products) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${products}`)
  .then((response) => response.json())
  .catch((error) => error);      
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
