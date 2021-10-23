const classCartItems = document.querySelector('.cart__items');

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

function getSkuFromProductItem(item) {
  
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function clearAllCar() {
  const buttonClick = document.querySelector('.empty-cart');
  function clear() {
    classCartItems.innerText = '';
  }
  buttonClick.addEventListener('click', clear);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  classCartItems.appendChild(li);
  
  return li;
}

let sum = 0;

const divPriceTotal = () => {
  const divContainer = document.querySelector('.price');
  const divPrice = document.createElement('div');
  divPrice.classList.add('total-price');
  divContainer.appendChild(divPrice);
};

function priceTotal(price) { 
  const div = document.querySelector('.total-price');
  const atual = (sum += price).toPrecision();
  div.innerText = atual;
}

async function adicionaCar(object) {
  const valores = object.sku;
  const itemSection = document.querySelector('.cart__items'); 
  const data = await fetchItem(valores);
  const itemObject = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
    const section = createCartItemElement(itemObject);
    itemSection.appendChild(section);
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    adicionaCar({ sku, name, image });
    priceTotal(salePrice);
  });
  
  clearAllCar();
  section.appendChild(button);
  
  return section;
}

async function carregaProdutos(produto) {
  const data = await fetchProducts(produto);
  const itemSection = document.querySelector('.items'); 
  data.results.forEach((item) => {
   const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    };
    const section = createProductItemElement(itemObject);
    itemSection.appendChild(section);
  });
}

const getFromLocalStorage = () => {
  const itemsList = JSON.parse(getSavedCartItems());
  if (itemsList) {
    itemsList.forEach((item) => {
      createCartItemElement(item);
    });
  }
};

window.onload = () => { 
  carregaProdutos('computador');
  divPriceTotal();
  getFromLocalStorage();
};
