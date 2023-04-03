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
    this._likeButton.classList.toggle("card__like_favorite");
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard(); 
    })

    this._element.querySelector(".card__delete").addEventListener('click', () => {
      this._deleteCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._onPhotoClick(this._name, this._link);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like");
    this._cardImage = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    return this._element;
  }
}

export {Card};