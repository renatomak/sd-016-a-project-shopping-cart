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
  const cartElementLocation = document.querySelector('.cart__items');
  cartElementLocation.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addToCartBtn(allCartAddBtns, allCartAddBtnsId) {
  const btnsLoadedId = allCartAddBtnsId;
  const btnsLoaded = allCartAddBtns;
  const cartLocation = document.querySelector('.cart__items');
  btnsLoaded.forEach((btn, btnIndex) => {
    btn.addEventListener('click', async () => {
      const getThisButtonId = btnsLoadedId[btnIndex].innerText;
      const fetchWithResult = await fetchItem(getThisButtonId);
      const cartObj = {
        sku: fetchWithResult.id,
        name: fetchWithResult.title,
        salePrice: fetchWithResult.price,
      };
      const createCartItem = createCartItemElement(cartObj);
      cartLocation.appendChild(createCartItem);
    });
  });
}

async function queryProducts(QUERY) {
  const queryed = await fetchProducts(QUERY);
  const itemLocation = document.querySelector('.items');
  queryed.results.forEach((product) => {
    const productFinded = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    const productBox = createProductItemElement(productFinded);
    itemLocation.appendChild(productBox);
  });
  const btnsLocation = document.querySelectorAll('.item__add');
  const btnsIds = document.querySelectorAll('.item__sku');
  addToCartBtn(btnsLocation, btnsIds);
}

window.onload = () => {
queryProducts('computador');
};
