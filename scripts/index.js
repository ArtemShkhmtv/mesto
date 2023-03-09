const popupEdit = document.querySelector(".popup-edit");
const buttonEdit = document.querySelector(".profile__edit-botton");
const buttonCloseEdit = document.querySelector(".popup-edit__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formEditElement = document.querySelector(".popup-edit__container");
const nameInput = document.querySelector(".popup-edit__text_type_name");
const descriptionInput = document.querySelector(".popup-edit__text_type_description");

// открытие попапа редактирования профиля

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  enableValidation(enableValidationConfig);
  checkInputValidity(formEditElement, nameInput);
  checkInputValidity(formEditElement, descriptionInput);
});

// закрытие попапа редактирования профиля

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonCloseEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

// закрытие попап щелчком по оверлэй

document.addEventListener('mousedown', function (evt) {
  const overlay = evt.target.classList.contains('popup_opened');
  const wrapper = evt.target.classList.contains('popup__wrapper');
  if (wrapper) {
    closePopup(evt.target.parentElement);
  } else if (overlay) {
    closePopup(evt.target);
  } 
});

// закрытие попапов нажатием Esc

document.addEventListener('keydown', (evt) => {
  const popups = document.querySelectorAll('.popup')
  if (evt.key === 'Escape')  {
    popups.forEach((element) => {closePopup(element);})
 }
});

// инпут профиля по умолчанию и отправка формы

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
}

formEditElement.addEventListener("submit", handleFormSubmit);

// работа с карточкой

const popupAddCard = document.querySelector(".popup-add-card");
const buttonAddCard = document.querySelector(".profile__add-card-botton");
const buttonCloseAddCard = document.querySelector(".popup-add-card__close");
const formAddCardElement = document.querySelector(".popup-add-card__container");
const nameAddCardInput = document.querySelector(".popup-add-card__text_type_name");
const descriptionAddCardInput = document.querySelector(".popup-add-card__text_type_description");

// Открытие попапа добавления карточки

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  nameAddCardInput.value = "";
  descriptionAddCardInput.value = "";
  enableValidation(enableValidationConfig);
  checkInputValidity(formAddCardElement, nameAddCardInput);
  checkInputValidity(formAddCardElement, descriptionAddCardInput);
});

// закрытие попапа добавления карточки

buttonCloseAddCard.addEventListener("click", () => closePopup(popupAddCard));

// Закрытие попап фото

const popupPicture = document.querySelector(".popup-picture");
const buttonClosePicture = popupPicture.querySelector(".popup-picture__close");

buttonClosePicture.addEventListener("click", () => closePopup(popupPicture));

// добавление карточки

const cardsGrid = document.querySelector(".cards-grid");
const popupPictureTitle = popupPicture.querySelector(".popup-picture__title");
const popupPictureImage = popupPicture.querySelector(".popup-picture__image");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardName, cardUrl) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardUrl;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  // лайк карточки

  const likeBotton = cardElement.querySelector(".card__like");
  likeBotton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_favorite");
  });

  // удаление карточки

  const deleteBotton = cardElement.querySelector(".card__delete");
  deleteBotton.addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  // открытие попап фото

  cardImage.addEventListener("click", function () {
    openPopup(popupPicture);
    popupPictureTitle.textContent = cardTitle.textContent;
    popupPictureImage.src = cardImage.src;
    popupPictureImage.alt = cardTitle.textContent;
  });

  return cardElement;
}

// загрузка стартовых карточек

initialCards.forEach(function (card) {
  cardsGrid.prepend(addCard(card.name, card.link));
});

// добавление карточки через форму

const nameCardInput = document.querySelector(".popup-add-card__text_type_name");
const linkCardInput = document.querySelector(".popup-add-card__text_type_description");

function addCardFormSubmit(evt) {
  evt.preventDefault();
  cardsGrid.prepend(addCard(nameCardInput.value, linkCardInput.value));
  closePopup(popupAddCard);
}

formAddCardElement.addEventListener("submit", addCardFormSubmit);
