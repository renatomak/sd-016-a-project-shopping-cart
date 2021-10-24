function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
const olCartItems = document.querySelector('.cart__items');
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
let array = [];
function cartItemClickListener(event) {
  const { target } = event;
  target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const RequirementOne = () => {
  const container = document.querySelector('.items');
  fetchProducts('computador').then(({ results }) => {
    results.map(({ id, title, thumbnail }) => {
      container.appendChild(
        createProductItemElement({ sku: id, name: title, image: thumbnail }),
      );
      return true;
    });
  });
};

const items = document.querySelector('.items');
const RequirementTwo = () => {
  items.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const getId = event.target.parentNode.firstChild.innerText;
      fetchItem(getId).then(({ id, title, price }) => {
        const data = { id, title, price };
        const cart = createCartItemElement({
          sku: data.id,
          name: data.title,
          salePrice: data.price,
        });
        array.push({ id, title, price });
        olCartItems.appendChild(cart);
        saveCartItems(array);
      });
    }
  });
};
function RequirementThree() {
  const olCartItem = document.querySelector('.cart__items');
  olCartItem.addEventListener('click', (event) => {
    cartItemClickListener(event);
    const string = event.target.innerText;
    array.map((value, index) => {
      const { id } = value;
      if (string.indexOf(id)) {
        array.splice(index, 1);
        saveCartItems(array);
      }

      return true;
    });
  });
}
function loadingData() {
  if (getSavedCartItems() !== null) {
    array = getSavedCartItems();
    array.map(({ id, title, price }) => {
      const cart = createCartItemElement({
        sku: id,
        name: title,
        salePrice: price,
      });
      olCartItems.appendChild(cart);
      return true;
    });
  }
}

const button = document.querySelector('.empty-cart');
button.addEventListener('click', () => {
  array.splice(0, array.length);
  saveCartItems(array);
  olCartItems.innerHTML = '';
});

window.onload = () => {
  loadingData();
  RequirementOne();
  RequirementTwo();
  RequirementThree();
};
