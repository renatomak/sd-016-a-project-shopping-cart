const getContainer = () => document.querySelector('.cart__items');

let actualTotalPrice = 0;

const priceSub = (totalCurrentPrice, actualPrice) => {
  actualTotalPrice = totalCurrentPrice - actualPrice;
  localStorage.setItem('cartPrice', actualTotalPrice);
  return actualTotalPrice.toFixed(2);
};

const priceSum = (totalCurrentPrice, actualPrice) => {
  actualTotalPrice = totalCurrentPrice + actualPrice;
  localStorage.setItem('cartPrice', actualTotalPrice);
  return actualTotalPrice.toFixed(2);
};

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('item__add')) {
    const data = await fetchItem(event.target.parentNode.firstChild.innerText);
    const productPrice = Number(data.price);
    return productPrice;
  }
});

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

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const loadsProductsList = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  const sectionWithAllProducts = document.querySelector('.items');
  results.forEach((result) => sectionWithAllProducts.appendChild(createProductItemElement(result)));
};

loadsProductsList();

async function cartItemClickListener(element) {
  element.parentNode.removeChild(element);
  const cartContainer = getContainer();
  saveCartItems(cartContainer.innerHTML);
  const price = await fetchItem(element.id);
  const result = priceSub(actualTotalPrice, price.price);
  const priceLabel = document.querySelector('.price');
  priceLabel.innerText = `Total Price: ${result}`;
}

 document.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart__item')) {
    cartItemClickListener(event.target);
  }
});

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = `${id}`;
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  return li;
}

const itemToCart = async (item) => {
  const data = await fetchItem(item);
  const cartContainer = getContainer();
  cartContainer.appendChild(createCartItemElement(data));
};

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('item__add')) {
    const item = event.target.parentNode.firstChild;
    await itemToCart(item.innerText);
    const cartContainer = getContainer();
    saveCartItems(cartContainer.innerHTML);
    const price = await fetchItem(event.target.parentNode.firstChild.innerText);
    const result = priceSum(actualTotalPrice, price.price);
    const priceLabel = document.querySelector('.price');
    priceLabel.innerText = `Total Price: ${result}`;
  }
});

const loadsCart = () => {
  const items = getSavedCartItems();
  const cartContainer = getContainer();
  cartContainer.innerHTML = items;
};

const loadsCartPrice = () => {
  const getCartPrice = localStorage.getItem('cartPrice');
  console.log(getCartPrice);
  if (getCartPrice === null) {
    const priceLabel = document.querySelector('.price');
    priceLabel.innerText = `Total price: ${0}`;
  } else {
    const priceLabel = document.querySelector('.price');
    priceLabel.innerText = `Total Price: ${getCartPrice}`;
  }  
};

// localStorage.clear();

window.onload = () => {
  loadsCart();
  loadsCartPrice();
};