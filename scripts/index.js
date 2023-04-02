import { initialCards } from "./cards.js";
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { enableValidationConfig } from "./const.js";

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
  profileValidation.checkInputValidity(nameInput);
  profileValidation.checkInputValidity(descriptionInput);
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

// Открытие попапа добавления карточки
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCardElement.reset();

  //проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения и блокировка кнопки
  cardAddValidation.checkInputValidity(nameAddCardInput);
  cardAddValidation.checkInputValidity(descriptionAddCardInput);
  cardAddValidation.disableButton();
});


// Закрытие попап фото
const popupPicture = document.querySelector(".popup-picture");

// добавление карточки
const popupPictureTitle = popupPicture.querySelector(".popup-picture__title");
const popupPictureImage = popupPicture.querySelector(".popup-picture__image");

// открытие попап фото
const handleMagnificationCard = (name, link) => {
  openPopup(popupPicture);
  popupPictureTitle.textContent = name;
  popupPictureImage.src = link;
  popupPictureImage.alt = name;
}

// добавление карточки через форму
const cardAddForm = {};
cardAddForm.nameCardInput = document.querySelector(".popup-add-card__text_type_name");
cardAddForm.linkCardInput = document.querySelector(".popup-add-card__text_type_description");

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(cardAddForm, "#card-template", handleMagnificationCard);
  const cardElement = card.generateCard();
  cardsGrid.prepend(cardElement);
  closePopup(popupAddCard);
}

formAddCardElement.addEventListener("submit", addCardFormSubmit);


// добавление стартовых карточек
const cardsGrid = document.querySelector(".cards-grid");  

initialCards.forEach((item) => {
    const card = new Card(item, "#card-template", handleMagnificationCard);
    const cardElement = card.generateCard();
    cardsGrid.prepend(cardElement);
})

// создание экземпляра валидатора для редактирования профиля
const profileValidation = new FormValidator(enableValidationConfig, popupEdit);
const startProfileValidation = profileValidation.enableValidation();

// создание экземпляра валидатора для добавления карточки
const cardAddValidation = new FormValidator(enableValidationConfig, popupAddCard);
const startcardAddValidation = cardAddValidation.enableValidation();