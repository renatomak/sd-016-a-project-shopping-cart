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
  // coloque seu código aqui
  const cartOl = document.querySelector('.cart__items');
  cartOl.removeChild(event.target);
  // console.log(event);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', async () => {
    const formatedData = await fetchItem(sku);
    const cartElement = createCartItemElement(formatedData);
    const cart = document.querySelector('.cart__items');
    cart.appendChild(cartElement);
  });
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function addItemstoPage() {
  data = await fetchProducts('computador');
  const sectionOfItems = document.querySelector('.items');
  data.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const sectionItem = createProductItemElement({ sku, name, image });
    sectionOfItems.appendChild(sectionItem);
  });
}

window.onload = async () => {
  await addItemstoPage();
};
