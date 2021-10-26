const cartSection = document.querySelector('.cart__items');
console.log(cartSection.childNodes);
const total = document.querySelector('.total-price');
let sum = 0;

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const del = event;
  return del.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const products = fetchProducts('computador').then((product) =>
product.results.reduce((acc, item) => {
  acc.push({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
  });
  return acc;
}, []));

function getFetchItem(sku) {
  return fetchItem(sku)
  .then((item) => {
    const { title: name, price: salePrice } = item;
    return { sku, name, salePrice };
  });
}

const arrayToLocalStorage = [];
function productItemToCart({ sku }) {
  getFetchItem(sku)
  .then((productItem) => {
    arrayToLocalStorage.push(productItem);
    saveCartItems(JSON.stringify(arrayToLocalStorage));
    console.log(productItem);
    sum += productItem.salePrice;
    total.innerHTML = sum;
    return createCartItemElement(productItem);
  })
  .then((cartItem) => cartSection.appendChild(cartItem));
  return cartSection;
}

function appendElement(elementClass, callback) {
  products.then((product) =>
  product.forEach((productItem, index) => {
    const sectionItems = document.querySelector(elementClass);
    sectionItems.appendChild(callback(productItem));
    const button = sectionItems.children[index].childNodes[3];
    button.addEventListener('click', () => productItemToCart(productItem));
  }));
}

function getItemFromLocalStorage() {
  const cartItems = JSON.parse(getSavedCartItems());
  total.innerHTML = sum;
  if (cartItems) {
    cartItems.forEach((item) => {
      sum += item.salePrice;
      arrayToLocalStorage.push(item);
      cartSection.appendChild(createCartItemElement(item));
      total.innerHTML = sum;
      console.log(sum);
    });
  }
}

window.onload = () => {
  appendElement('section .items', createProductItemElement);
  getItemFromLocalStorage();
  const cartButton = document.querySelector('.empty-cart');
  cartButton.addEventListener('click', () => {
    cartSection.innerHTML = '';
    sum = 0;
    total.innerHTML = 0;
    localStorage.clear();
  });
};
