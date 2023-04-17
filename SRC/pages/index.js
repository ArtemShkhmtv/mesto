import { initialCards } from "../components/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { enableValidationConfig } from "../components/const.js";
import { Section } from "../components/Section.js";
import {PopupWithImage} from "../components/PicturePopup.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
const popupEdit = document.querySelector(".popup-edit");
const buttonEdit = document.querySelector(".profile__edit-botton");
const nameInput = document.querySelector(".popup-edit__text_type_name");
const descriptionInput = document.querySelector(".popup-edit__text_type_description");

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileInfo.getUserInfo().name;
  descriptionInput.value = profileInfo.getUserInfo().info;
  // проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения
  profileValidation.resetValidation();
  popupEditOpen.open();
});

// инпут профиля по умолчанию и отправка формы
function handleFormSubmit(item) {
  profileInfo.setUserInfo(item[0].name, item[0].link)
}

// работа с карточкой
const popupAddCard = document.querySelector(".popup-add-card");
const buttonAddCard = document.querySelector(".profile__add-card-botton");

// Открытие попапа добавления карточки
buttonAddCard.addEventListener("click", () => {
  popupAddCardOpen.open();
  //проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения и блокировка кнопки
  cardAddValidation.resetValidation();
});

// открытие попап фото
const handleMagnificationCard = (name, link) => {
  popupPictureOpen.open(name, link);
}

//создание карточки
function createCard(item) {
  const card = new Card(item, "#card-template", handleMagnificationCard);
  const cardElement = card.generateCard();
  return cardElement;
}

// добавление карточки через форму
function addCardFormSubmit(item) {
  const newCard = new Section({items: item, renderer: createCard}, '.cards-grid');
  newCard.renderItems();
}

// создание экземпляра валидатора для редактирования профиля
const profileValidation = new FormValidator(enableValidationConfig, popupEdit);
const startProfileValidation = profileValidation.enableValidation();

// создание экземпляра валидатора для добавления карточки
const cardAddValidation = new FormValidator(enableValidationConfig, popupAddCard);
const startcardAddValidation = cardAddValidation.enableValidation();

// отрисовка стартовых карточек
const defaultCardList = new Section({items: initialCards, renderer: createCard}, ".cards-grid");
defaultCardList.renderItems();

// создание экземпляров классов информации о пользователе, открытия попапов
const profileInfo = new UserInfo(".profile__name", ".profile__description");
const popupPictureOpen = new PopupWithImage(".popup-picture");
popupPictureOpen.setEventListeners();
const popupEditOpen = new PopupWithForm(".popup-edit", handleFormSubmit);
popupEditOpen.setEventListeners();
const popupAddCardOpen = new PopupWithForm(".popup-add-card", addCardFormSubmit);
popupAddCardOpen.setEventListeners();