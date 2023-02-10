// Открытие попапа

let popup = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit-botton');

editButton.addEventListener('click', (evt) => {evt.preventDefault();
  popup.classList.add('popup_opened');});

// заполнение инпутов

let profileName = document.querySelector('.profile__name');
let editName = document.querySelector('.popup__text_type_name');
editName.placeholder = profileName.textContent;

let profileDescription = document.querySelector('.profile__description');
let editDescription = document.querySelector('.popup__text_type_description');
editDescription.placeholder = profileDescription.textContent;