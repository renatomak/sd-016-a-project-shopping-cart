const cartOl = document.querySelector('.cart__items');
const btnEraseAll = document.querySelector('.empty-cart');

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

function eraseAll() {
  const li = document.querySelectorAll('ol li');
  li.forEach((index) => index.remove());
}
btnEraseAll.addEventListener('click', eraseAll);

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(cartOl.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function selectedItem(click) {
  const id = click.path[1].childNodes[0].innerHTML;
  const item = await fetchItem(id);
  
  const { id: sku, title: name, price: salePrice } = item;

  const cartItem = {
    sku,
    name,
    salePrice,
  };

  const result = createCartItemElement(cartItem);
  result.addEventListener('click', cartItemClickListener);
  cartOl.appendChild(result);
  saveCartItems(cartOl.innerHTML);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionProduct = document.querySelector('.items');

  searchData.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const productObj = {
      sku,
      name,
      image,
    };
    const productItem = createProductItemElement(productObj);
    sectionProduct.appendChild(productItem);
  });
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((item) => item.addEventListener('click', selectedItem));
}

window.onload = () => {
  searchProducts('computador');
  if (localStorage.getItem('cartItems')) {
    cartOl.innerHTML = getSavedCartItems();
    cartOl.childNodes.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
};
