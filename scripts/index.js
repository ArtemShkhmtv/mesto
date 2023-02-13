let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-botton');
let buttonClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let descriptionInput =document.querySelector('.popup__text_type_description');

// Открытие попапа редактирования профиля

function popupOpen (evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', popupOpen);

// закрытие попапа редактирования профиля

function popupClose (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', popupClose);

// инпут профиля по умолчанию и отправка формы

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose(evt);
}

formElement.addEventListener('submit', handleFormSubmit);
