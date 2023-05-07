// создание класса карточки

class Card {
  constructor(data, template, onPhotoClick, onUrnClick, likeCard, unlikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.owner._id;
    this.cardId = data._id;
    this._template = template;
    this._onPhotoClick = onPhotoClick;
    this._onUrnClick = onUrnClick;
    this._like = likeCard;
    this._unlike = unlikeCard;
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

  // навешивесить стартовые лайки на карточки
  _likeCard() {
    if (this._likes.some((item) => {
      return item._id === '9a61b2a7912ef1dfdd652884';
    })) {
      this._likeButton.classList.add("card__like_favorite");
  } else {
    this._likeButton.classList.remove("card__like_favorite");
  }


  }

  _deleteCard() {
    this._element.remove();
  }

  getCard() {
    return {id: this.cardId,
            element: this._element
          };
  }

  _setEventListeners() {
    
    this._likeButton.addEventListener('click', async (evt) => {
      if (this._likeButton.classList.contains("card__like_favorite")) { // проверяю есть ли мой лайк
        const data = await this._unlike(this.cardId); // удаляю свой лайк из массива
        this._likes = data.likes; // обновляю массив лайков
        this._likeCounter.textContent = data.likes.length; // отрисовываю счетчик из ответа сервера
        this._likeButton.classList.toggle("card__like_favorite"); //перекрашиваю сердечко
      } else {
        const data = await this._like(this.cardId);
        this._likes = data.likes;
        this._likeCounter.textContent = data.likes.length;
        this._likeButton.classList.toggle("card__like_favorite");
      }
    })

    this._element.querySelector(".card__delete").addEventListener('click', () => {
      this._onUrnClick(this.getCard()); // обработчик клика по урне с данными карточки
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
    this._likeCard();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeCounter.textContent = this._likes.length;
    if (this._userId !== '9a61b2a7912ef1dfdd652884') {this._element.querySelector('.card__delete').remove()};
    return this._element;
  }
}

export {Card};