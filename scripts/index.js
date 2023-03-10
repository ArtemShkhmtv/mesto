const popupEdit = document.querySelector(".popup-edit");
const buttonEdit = document.querySelector(".profile__edit-botton");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formEditElement = document.querySelector(".popup-edit__container");
const nameInput = document.querySelector(".popup-edit__text_type_name");
const descriptionInput = document.querySelector(".popup-edit__text_type_description");
// открытие попапа редактирования профиля

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

// закрытие попап нажатием Esc

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  // проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения
  checkInputValidity(formEditElement, nameInput, enableValidationConfig);
  checkInputValidity(formEditElement, descriptionInput, enableValidationConfig);
});

// закрытие попапа редактирования профиля

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
}

// закрытие активного попапа щелчком по кнопке или оверлэй
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup__wrapper')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})
  
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
const formAddCardElement = document.querySelector(".popup-add-card__container");
const nameAddCardInput = document.querySelector(".popup-add-card__text_type_name");
const descriptionAddCardInput = document.querySelector(".popup-add-card__text_type_description");
const buttonAddCardSave = popupAddCard.querySelector(".popup__save-botton");
// Открытие попапа добавления карточки

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCardElement.reset();
  disableButton(buttonAddCardSave, enableValidationConfig);
});


// Закрытие попап фото

const popupPicture = document.querySelector(".popup-picture");

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
