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
const descriptionInput = document.querySelector(
  ".popup-edit__text_type_description"
);
const profileAvatar = document.querySelector(".profile__photo");
const profileOverlay = document.querySelector(".profile__image-wrapper");
const popupUpdateAvatar = document.querySelector(".popup-update-avatar");

let userId;

// экземпляр класса для смены аватара
const popupUpdateAvatarOpen = new PopupWithForm(
  ".popup-update-avatar",
  handleFormUpdateAvatar
);
popupUpdateAvatarOpen.setEventListeners();

// обработчик сабмита формы обновления аватара
async function handleFormUpdateAvatar(item) {
  try {
    const data = await api.updateAvatar(item.link);
    profileInfo.setUserInfo(data.name, data.about, data.avatar);
    popupUpdateAvatarOpen.close();
  } catch (error) {
    console.error(error);
  } finally {
    popupUpdateAvatarOpen.renderLoading();
  }
}

// слушатели аватара
profileAvatar.addEventListener("mouseover", () => {
  profileOverlay.classList.add("popup_opened");
});

profileOverlay.addEventListener("mouseout", () => {
  profileOverlay.classList.remove("popup_opened");
});

profileOverlay.addEventListener("click", () => {
  avatarUpdateValidation.resetValidation(); // сброс валидации предыдущего открытия
  popupUpdateAvatarOpen.open();
});

// слушатель редактирования профиля
buttonEdit.addEventListener("click", () => {
  const { name, info } = profileInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = info;
  // проверка валидации для сброса сообщения об ошибке в случае закрытия попап без сохранения
  profileValidation.resetValidation();
  popupEditOpen.open();
});

// инпут профиля по умолчанию и отправка формы
async function handleProfileFormSubmit(item) {
  try {
    const data = await api.saveUserInfo(item.name, item.link);
    // отобразить те данные, которые вернул сервер
    profileInfo.setUserInfo(data.name, data.about, data.avatar);
    popupEditOpen.close();
  } catch (error) {
    console.error(error);
  } finally {
    popupEditOpen.renderLoading();
  }
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
};

//создание карточки
function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    handleMagnificationCard,
    openPopupConfirmation,
    likeCard,
    unlikeCard,
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// добавление карточки через форму
async function handleCardFormSubmit(item) {
  try {
    const data = await api.addCard(item.name, item.link);
    defaultCardList.addItemFromForm(data);
    popupAddCardOpen.close();
  } catch (error) {
    console.error(error);
  } finally {
    popupAddCardOpen.renderLoading();
  }
}

// создание экземпляра валидатора для редактирования профиля
const profileValidation = new FormValidator(enableValidationConfig, popupEdit);
const startProfileValidation = profileValidation.enableValidation();

// создание экземпляра валидатора для добавления карточки
const cardAddValidation = new FormValidator(
  enableValidationConfig,
  popupAddCard
);
const startcardAddValidation = cardAddValidation.enableValidation();

// создание экземпляра валидатора для редактирования аватарки
const avatarUpdateValidation = new FormValidator(
  enableValidationConfig,
  popupUpdateAvatar
);
const startAvatarUpdateValidation = avatarUpdateValidation.enableValidation();

// создание экземпляров классов информации о пользователе, открытия попапов
const profileInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__photo"
);
const popupPictureOpen = new PopupWithImage(".popup-picture");
popupPictureOpen.setEventListeners();
const popupEditOpen = new PopupWithForm(".popup-edit", handleProfileFormSubmit);
popupEditOpen.setEventListeners();
const popupAddCardOpen = new PopupWithForm(
  ".popup-add-card",
  handleCardFormSubmit
);
popupAddCardOpen.setEventListeners();
const popupDeletCard = new PopupWithConfirmation(
  ".popup-confirmation",
  deletCard
);
popupDeletCard.setEventListeners();

// создание экземпляра класса Апи
const api = new Api(dataApi);

let data; // переменная для хранения данных текущей карточки

// удаление карточки
async function deletCard() {
  try {
    await api.deletCard(data.id);
    data.element.remove();
    popupDeletCard.close();
  } catch (error) {
    console.error(error);
  }
}

// открытие попап и сабмит подтверждения
function openPopupConfirmation(card) {
  popupDeletCard.open();
  data = card;
}

// функции постановки и снятия лайков
async function likeCard(card) {
  try {
    return await api.likeCard(card);
  } catch (error) {
    console.error(error);
  }
}

async function unlikeCard(card) {
  try {
    return await api.unlikeCard(card);
  } catch (error) {
    console.error(error);
  }
}

// загрузка с сервера и отрисовка данных пользователя
async function getProfileInfo() {
  try {
    return await api.getServerUserInfo();
  } catch (error) {
    console.error(error);
  }
}

let defaultCardList; //массив карточек

// загрузка с сервера и отрисовка карточек
async function getServerCards() {
  try {
    return await api.getCards();
  } catch (error) {
    console.error(error);
  }
}

Promise.all([getProfileInfo(), getServerCards()])
  .then(([userData, cards]) => {
    // данные профиля
    profileInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    // создание карточек
    defaultCardList = new Section(
      { items: cards, renderer: createCard },
      ".cards-grid"
    );
    defaultCardList.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });
