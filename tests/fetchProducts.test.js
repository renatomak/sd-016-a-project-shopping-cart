const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  it('Executa a função fetchProducts com o argumento "computador" e testa se "fetch" foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts(computadorSearch);
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const expectedUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts(computadorSearch);
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
