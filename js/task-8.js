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
refs.list.addEventListener('keydown', selectButtonActions);
refs.btn.addEventListener('click', btnModalClose);
refs.overley.addEventListener('click', onBackdropClickCloseModal);


//разметка галереи
const listGalery = createListGaleryItems(imgGalery);
refs.list.innerHTML = listGalery;

function createListGaleryItems(items) {
  return items
    .map(
      ({ original, description, preview }) => `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
        <img class ="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
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
  refs.img.src = evt.target.dataset.source;
  refs.img.alt = evt.target.alt;
}

//закрыть модалку

function btnModalClose() {
  refs.backdrop.classList.remove('is-open');
  refs.img.src = '';
}

// клик в бекдроп с закрытием модалки

function onBackdropClickCloseModal(evt) {
  if (evt.currentTarget === evt.target) {
    btnModalClose();
    // console.log('это клик в бекдроп');
    // console.log(evt.target);
    // console.log(evt.currentTarget);
  }
}

function selectButtonActions(evt) {
  console.log(evt.code);
  if (evt.code === 'Escape') {
    btnModalClose();
  } else if (evt.code === 'ArrowRight') {
    onArrowRight();
  } else if (evt.code === 'ArrowLeft') {
    onArrowLeft();
  }
}

const bigImg = imgGalery.map(({ original }) => original);

let index = 0;

setActiveImage(index);

function onArrowRight() {
  console.log(bigImg.length);
  if (index + 1 >= bigImg.length) {
    return;
  }

  console.log((index += 1));
  setActiveImage(index);
}

function onArrowLeft() {
  if (index - 1 < 0) {
    return;
  }

  console.log((index -= 1));
  setActiveImage(index);
}

function setActiveImage(indexCurrent) {
  const activeImage = bigImg[indexCurrent];
  refs.img.src = activeImage;
}
