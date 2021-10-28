// Variável utilizada para as funções "cartItemClickListener()" e "includeProductOnCart()""
const cartItens = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  cartItens.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function includeProductOnCart(id) {
  const includeProduct = await fetchItem(id);
  const itemOnCart = {
    sku: includeProduct.id,
    name: includeProduct.title,
    salePrice: includeProduct.price,
  };
  cartItens.appendChild(createCartItemElement(itemOnCart)); 
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // Botão não fazia nada?? - Ajuda do Humberto: salvar o retorno deste section.appendChild numa variável para poder incluir um evento de escuta que traga a função de incluir o item no carrinho //
  const Button = section
  .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  Button.addEventListener('click', () => includeProductOnCart(sku));
  section.appendChild(Button);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(itemObject);
    sectionItens.appendChild(section);
  });
}

window.onload = () => { 
  searchProducts('computador');
};
