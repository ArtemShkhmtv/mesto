// создание класса карточки
class Card {
  constructor(data, template, onPhotoClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._onPhotoClick = onPhotoClick;
  }

  // получить шаблон карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector(".card")
    .cloneNode(true);
    return cardElement;
}

  _likeCard() {
    this._element.querySelector(".card__like").classList.toggle("card__like_favorite");
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener('click', () => {
      this._likeCard(); 
    })

    this._element.querySelector(".card__delete").addEventListener('click', () => {
      this._deleteCard();
    })

    this._element.querySelector(".card__image").addEventListener('click', () => {
      this._onPhotoClick(this._name, this._link);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__image").src = this._link;
    return this._element;
  }
}

export {Card};