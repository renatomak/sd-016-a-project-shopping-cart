const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it ('Verifica se fetchProducts é uma função', async () => {
    await fetchProducts();
    expect(typeof fetchProducts).toBe('function');
  });

  it ('Verifica se a função fetchProducts recebe "computador" como parametro', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it ('Verifica se a função fetchProducts foi chamada com um argumento específico', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it ('Verifica se a chamada da função fetchProducts("computador") retorna uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it ('Verifica se a chamada da função fetchProducts() retorna uma mensagem de erro', async () => {
    const error = new Error ('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);
  })

});
