import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { dataApi } from "../utils/const.js";
import { enableValidationConfig } from "../utils/const.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const popupEdit = document.querySelector(".popup-edit");
const buttonEdit = document.querySelector(".profile__edit-botton");
const nameInput = document.querySelector(".popup-edit__text_type_name");
const descriptionInput = document.querySelector(".popup-edit__text_type_description");
const profileAvatar = document.querySelector(".profile__photo");
const profileOverlay = document.querySelector(".profile__image-wrapper");
const popupUpdateAvatar = document.querySelector(".popup-update-avatar");

// экземпляр класса для смены аватара
const popupUpdateAvatarOpen = new PopupWithForm(".popup-update-avatar", handleFormUpdateAvatar);
popupUpdateAvatarOpen.setEventListeners();

// обработчик сабмита формы обновления аватара
async function handleFormUpdateAvatar(item) {
  const data = await api.updateAvatar (item.link);
  profileInfo.setUserInfo(data.name, data.about, data.avatar );
}

// слушатели аватара
profileAvatar.addEventListener('mouseover', () => {
  profileOverlay.classList.add('popup_opened');
})

profileOverlay.addEventListener('mouseout', () => {
  profileOverlay.classList.remove('popup_opened');
})

profileOverlay.addEventListener('click', () => {
  avatarUpdateValidation.resetValidation(); // сброс валидации предыдущего открытия
  popupUpdateAvatarOpen.open();
})

// слушатель редактирования профиля
buttonEdit.addEventListener("click", () => {
  nameInput.value = profileInfo.getUserInfo().name;
  descriptionInput.value = profileInfo.getUserInfo().info;
  // проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения
  profileValidation.resetValidation();
  popupEditOpen.open();
});

// инпут профиля по умолчанию и отправка формы
async function handleFormSubmit(item) {
  const data = await api.saveUserInfo(item.name, item.link);
  // отобразить те данные, которые вернул сервер
  profileInfo.setUserInfo(data.name, data.about, data.avatar);
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
  const card = new Card(item, "#card-template", handleMagnificationCard, openPopupConfirmation, likeCard, unlikeCard);
  const cardElement = card.generateCard();
  return cardElement;
}

// добавление карточки через форму
async function addCardFormSubmit(item) {
  const data = await api.addCard (item.name, item.link);
  defaultCardList.addItemFromForm(createCard(data));
}

// создание экземпляра валидатора для редактирования профиля
const profileValidation = new FormValidator(enableValidationConfig, popupEdit);
const startProfileValidation = profileValidation.enableValidation();

// создание экземпляра валидатора для добавления карточки
const cardAddValidation = new FormValidator(enableValidationConfig, popupAddCard);
const startcardAddValidation = cardAddValidation.enableValidation();

// создание экземпляра валидатора для редактирования аватарки
const avatarUpdateValidation = new FormValidator(enableValidationConfig, popupUpdateAvatar);
const startAvatarUpdateValidation = avatarUpdateValidation.enableValidation();

// создание экземпляров классов информации о пользователе, открытия попапов
const profileInfo = new UserInfo(".profile__name", ".profile__description", ".profile__photo");
const popupPictureOpen = new PopupWithImage(".popup-picture");
popupPictureOpen.setEventListeners();
const popupEditOpen = new PopupWithForm(".popup-edit", handleFormSubmit);
popupEditOpen.setEventListeners();
const popupAddCardOpen = new PopupWithForm(".popup-add-card", addCardFormSubmit);
popupAddCardOpen.setEventListeners();
const popupDeletCard = new PopupWithConfirmation(".popup-confirmation", deletCard);
popupDeletCard.setEventListeners();

// создание экземпляра класса Апи
const api = new Api(dataApi);

let data; // переменная для хранения данных текущей карточки

// удаление карточки
async function deletCard() {
  await api.deletCard(data.id);
  data.element.remove();
}

// открытие попап и сабмит подтверждения
function openPopupConfirmation(card) {
  popupDeletCard.open();
  data = card;
}

// функции постановки и снятия лайков
async function likeCard (card) {
  return await api.likeCard(card);
}

async function unlikeCard (card) {
  return await api.unlikeCard(card);
}

// загрузка с сервера и отрисовка данных пользователя
async function getProfileInfo () {
  const data = await api.getServerUserInfo();
  profileInfo.setUserInfo(data.name, data.about, data.avatar)
}

getProfileInfo ();

let defaultCardList; //массив карточек

// загрузка с сервера и отрисовка карточек
async function getServerCards () {
  const data = await api.getCards();
  defaultCardList = new Section({items: data, renderer: createCard}, ".cards-grid");
  defaultCardList.renderItems();
}

getServerCards ();