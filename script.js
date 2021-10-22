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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
  // Requisito 1
  const container = document.querySelector('.items');
  fetchProducts('computador').then(({ results }) => {
    results.map(({ id, title, thumbnail }) => {
      container.appendChild(
        createProductItemElement({ sku: id, name: title, image: thumbnail }),
      );
      return true;
    });
  });
  const olCartItems = document.querySelector('.cart__items');
  const items = document.querySelector('.items');
  items.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const id = event.target.parentNode.firstChild.innerText;
      const idItem = fetchItem(id).then(({ id, title, price }) => {
        const data = { id, title, price };
        const cart = createCartItemElement({
          sku: data.id,
          name: data.title,
          salePrice: data.price,
        });
        olCartItems.appendChild(cart);
      });
    }
  });
};
//{ sku, name, salePrice }
