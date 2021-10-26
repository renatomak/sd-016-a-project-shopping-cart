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

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//  return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  removeLista(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('data-price', `${salePrice}`);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const removeTudo = document.querySelector('.empty-cart');
  removeTudo.addEventListener('click', removerCarrinho);
  totalpreço += salePrice;
  preçosalvo.innerHTML = totalpreço;
  return li;
}

async function searchProducts(product) {
  getSavedCartItems().forEach((element) => {
    selectOl.innerHTML += `<li class='cart__item'>${element}</li>`;
  });
  const searchData = await fetchProducts(product);
  const sectionItens = document.querySelector('.items');
  searchData.results.forEach(async (item, index) => {
    const cadaItem = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(cadaItem);
    sectionItens.appendChild(productItem);
    const salvarBotao = document.querySelectorAll('.item__add')[index];
    const itemAtual = await fetchItem(item.id);
    salvarBotao.addEventListener('click', () =>
      adicionarCarrinho(createCartItemElement(objetoCarrinho(itemAtual))));
  });
}

window.onload = () => { 
  searchProducts('computador');
};
