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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const funcFet = (paramItem) => {
  fetchProducts(paramItem)
    .then((promisse) => promisse.forEach(({ id, title, thumbnail }) => {
      const obj = { sku: id, name: title, image: thumbnail };
      document.querySelector('.items').appendChild(createProductItemElement(obj));
    }));
};

const btnAddCart = async (paramItem) => {
  const product = await fetchProducts(paramItem);
  const listOl = document.querySelector('ol');
  document.querySelectorAll('.item__add').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const obj = {
        sku: event.target.parentElement.firstChild.innerText,
        name: event.target.previousSibling.previousSibling.innerText,
      };
      obj.salePrice = product.find(({ id }) => id === obj.sku).price;
      listOl.appendChild(createCartItemElement(obj));
    });
  });
};

window.onload = () => {
  funcFet('computador');
  btnAddCart('computador');
};
