// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSavedCartItem = () => {
  const getSavedItem = getSavedCartItems();
  if (getSavedItem === 'undefined' || !getSavedItem) {
    return '[]';
  }
  return getSavedItem;
};

const updateTotalPrice = (totalPrice) => {
  const price = document.querySelector('p.total-price');
  price.innerText = `${totalPrice}`;
};

const removeCartItem = (event) => {
  const elementCartItem = event.target;
  const id = elementCartItem.innerText.split('|')[0].split(':')[1].trim();
  elementCartItem.remove();

  const savedItems = getSavedCartItem();
  const arrSavedItems = JSON.parse(savedItems);
  const qmFicou = arrSavedItems.filter((item) => item.id !== id);
  saveCartItems(qmFicou);

  const totalPrice = qmFicou.reduce((acc, curr) => curr.price + acc, 0);
  updateTotalPrice(totalPrice);
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeCartItem);
  return li;
};

const cartItemElement = 'ol.cart__items';

const createTotalPriceElement = () => {
  const pTotal = document.createElement('p');
  pTotal.innerText = 'Subtotal: ';
  const pPrice = document.createElement('p');
  pPrice.className = 'total-price';
  pPrice.innerText = '0';
  const sectionCart = document.querySelector('section.cart');
  sectionCart.appendChild(pTotal);
  sectionCart.appendChild(pPrice);
};
// createTotalPriceElement();

const addCartItem = async (event) => { 
  const elementId = event.target.parentNode.querySelector('span.item_id');
  const result = await fetchItem(elementId.innerText);
  const cartItems1 = document.querySelector(cartItemElement);
  cartItems1.appendChild(createCartItemElement(result));

  const savedItems = getSavedCartItem();
  const arrSavedItems = JSON.parse(savedItems);
  arrSavedItems.push({ id: result.id, title: result.title, price: result.price });
  saveCartItems(arrSavedItems);

  const totalPrice = arrSavedItems.reduce((acc, curr) => curr.price + acc, 0);
  updateTotalPrice(totalPrice);
};

const setCartItemsByLocalStorage = () => {
  const cartItems3 = document.querySelector('ol.cart__items');
  const savedItems = getSavedCartItem();
  const arrSavedItems = JSON.parse(savedItems);
  arrSavedItems.forEach((item) => {
    cartItems3.appendChild(createCartItemElement(item));
  });

  const totalPrice = arrSavedItems.reduce((acc, curr) => curr.price + acc, 0);
  updateTotalPrice(totalPrice);
};
// setCartItemsByLocalStorage();

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const btnAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAddCart.addEventListener('click', addCartItem);
  section.appendChild(btnAddCart);

  return section;
}

const createProductItem = async () => { 
  const resultComputer = await fetchProducts('computador');
  const sectionItems = document.querySelector('section.items');
  resultComputer.results.forEach((product) => {
    const productItemElement = createProductItemElement(product);
    sectionItems.appendChild(productItemElement);
  });
};
// createProductItem();

const emptyCart = () => {
  const liCartItems = document.querySelectorAll('li.cart__item');
  liCartItems.forEach((li) => li.remove());

  saveCartItems([]);
  updateTotalPrice(0);
};
const btnEmptyCart = document.querySelector('.empty-cart');
btnEmptyCart.addEventListener('click', emptyCart);

const showLoading = () => {
  const sectionContainer = document.querySelector('section.container');
  sectionContainer.appendChild(createCustomElement('p', 'loading', 'carregando...'));
};

const removeLoading = () => {
  const loading = document.querySelector('p.loading');
  loading.remove();
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

window.onload = async () => {
  showLoading();
  await createProductItem();
  removeLoading();
  createTotalPriceElement();
  setCartItemsByLocalStorage();
 };
