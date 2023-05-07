class Api {
  constructor ({baseUrl, headers}) {
    this.url = baseUrl;
    this.headers = headers;
  }

  // получение данных пользователя
  async getServerUserInfo () {
    try {
      const response = await fetch(`${this.url}/users/me`, {
        headers: this.headers
      })
        const res = await response.json()
        return res;
    } catch (error) {
      console.error(error);
    }
  }

  // получение карточек
  async getCards () {
    try {
      const response = await fetch(`${this.url}/cards`, {
        headers: this.headers
      })
        const res = await response.json()
        return res; 
    } catch (error) {
      console.error(error);
    }
  }

  // сохранение изменений профиля
  async saveUserInfo (newName, newDescription) {
    try {
      const response = await fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: newName,
          about: newDescription
        })
      })
      const res = await response.json()
      return res; 
    } catch (error) {
      console.error(error);
    }
  }


  // добавить новую карточку
  async addCard (cardName, cardLink) {
    try {
      const response = await fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      const res = await response.json()
      return res; 
    } catch (error) {
      console.error(error);
    }
  }

  // удалить карточку
  async deletCard (cardId) {
    try {
      const response = await fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
    } catch (error) {
      console.error(error);
    }
  }

  // поставить лайк карточке
  async likeCard (cardId) {
    try {
      const response = await fetch(`${this.url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  // снять лайк с карточки
  async unlikeCard (cardId) {
    try {
      const response = await fetch(`${this.url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  // смена аватара пользователя
  async updateAvatar (newAvatar) {
    try {
      const response = await fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: newAvatar
        })
      })
      const res = await response.json()
      return res; 
    } catch (error) {
      console.error(error);
    }
  }
}

export {Api};