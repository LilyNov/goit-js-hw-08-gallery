import imgGalery from './gallery-items.js';
//console.log(imgGalery);

const refs = {
  list: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  overley: document.querySelector('.lightbox__overlay'),
  img: document.querySelector('.lightbox__image'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
};

//слушатели
refs.list.addEventListener('click', onImgClickModalOpen);
refs.btn.addEventListener('click', onBtnModalClose);
refs.backdrop.addEventListener('click', onBackdropClickCloseModal);

//разметка галереи
const listGalery = createListGaleryItems(imgGalery);
refs.list.innerHTML = listGalery;

function createListGaleryItems(items) {
  return items
    .map(
      ({ original, description, preview }) => `<li class="gallery__item">
            <a href="${original}"  class="gallery__link">
        <img class ="lightbox__image" src="${preview}" alt="${description}">
            </a>
        </li>`,
    )
    .join('');
}

//Делегирование
function onImgClickModalOpen(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  refs.backdrop.classList.add('is-open');
  refs.img.src = evt.target.src;
  refs.img.alt = evt.target.alt;
  // console.log((refs.img.src = evt.target.src));
  // console.log((refs.img.alt = evt.target.alt));
}

//закрыть модалку

function onBtnModalClose() {
  // evt.preventDefault();
  refs.box.classList.toggle('is-open');
}

// клик в бекдроп с закрытием модалки

function onBackdropClickCloseModal(evt) {
  if (evt.target === evt.currentTarget);
  console.log('это клик в бекдроп');
}
