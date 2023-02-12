// Открытие попапа редактирования профиля

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-botton');
let closeButton = document.querySelector('.popup__close');

editButton.addEventListener('click', (evt) => {evt.preventDefault();
  popup.classList.add('popup_opened');});
console.log(closeButton);

// инпут профиля по умолчанию и отправка формы

let profileName = document.querySelector('.profile__name');
let editName = document.querySelector('.popup__text_type_name');
let profileDescription = document.querySelector('.profile__description');
let editDescription = document.querySelector('.popup__text_type_description');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let descriptionInput =document.querySelector('.popup__text_type_description');

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

// закрытие попапа редактирования профиля

closeButton.addEventListener('click', (evt) => {evt.preventDefault();
  popup.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;});