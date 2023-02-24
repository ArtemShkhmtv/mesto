const popupEdit = document.querySelector('.popup-edit');
const buttonEdit = document.querySelector('.profile__edit-botton');
const buttonCloseEdit = document.querySelector('.popup-edit__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formEditElement = document.querySelector('.popup-edit__container');
const nameInput = document.querySelector('.popup-edit__text_type_name');
const descriptionInput =document.querySelector('.popup-edit__text_type_description');

// открытие попапа редактирования профиля

function openClosePopup (popup) {
  popup.classList.toggle('popup_opened');
}

buttonEdit.addEventListener('click', () => {
  openClosePopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// закрытие попапа редактирования профиля

buttonCloseEdit.addEventListener('click', () => openClosePopup(popupEdit));

// инпут профиля по умолчанию и отправка формы

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  openClosePopup(popupEdit);
}

formEditElement.addEventListener('submit', handleFormSubmit);

// работа с карточкой

const popupAddCard = document.querySelector('.popup-add-card');
const buttonAddCard = document.querySelector('.profile__add-card-botton');
const buttonCloseAddCard = document.querySelector('.popup-add-card__close');
const formAddCardElement = document.querySelector('.popup-add-card__container');
const nameAddCardInput = document.querySelector('.popup-add-card__text_type_name');
const descriptionAddCardInput = document.querySelector('.popup-add-card__text_type_description');

// Открытие попапа добавления карточки

buttonAddCard.addEventListener('click', () => {
  openClosePopup(popupAddCard);
  nameAddCardInput.value = '';
  descriptionAddCardInput.value = '';
});

// закрытие попапа добавления карточки

buttonCloseAddCard.addEventListener('click', () => openClosePopup(popupAddCard));

// Закрытие попап фото

const popupPicture = document.querySelector('.popup-picture');
const buttonClosePicture = popupPicture.querySelector('.popup-picture__close');

buttonClosePicture.addEventListener('click', () => openClosePopup(popupPicture));

// добавление карточки

const cardsGrid = document.querySelector('.cards-grid');
const popupPictureTitle = popupPicture.querySelector('.popup-picture__title');
const popupPictureImage = popupPicture.querySelector('.popup-picture__image');

function addCard(cardName, cardUrl) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardUrl;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  
  // лайк карточки

  const likeBotton = cardElement.querySelector('.card__like');
  likeBotton.addEventListener('click', function (evt) {evt.target.classList.toggle('card__like_favorite');});
  
  // удаление карточки

  const deleteBotton = cardElement.querySelector('.card__delete');
  deleteBotton.addEventListener('click', function (evt) {
    const cardToRemove = evt.target.closest('.card');
    cardToRemove.remove();
  });

// открытие попап фото

  cardImage.addEventListener('click', function () {
    openClosePopup(popupPicture);
    popupPictureTitle.textContent = cardTitle.textContent;
    popupPictureImage.src = cardImage.src;
  })

  cardsGrid.prepend(cardElement);
}

// загрузка стартовых карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach( function (card) {
  addCard(card.name, card.link);
});

// добавление карточки через форму

const nameCardInput = document.querySelector('.popup-add-card__text_type_name');
const linkCardInput = document.querySelector('.popup-add-card__text_type_description');

function addCardFormSubmit (evt) {
  evt.preventDefault();
  addCard(nameCardInput.value, linkCardInput.value);
  openClosePopup(popupAddCard);
}

formAddCardElement.addEventListener('submit', addCardFormSubmit);