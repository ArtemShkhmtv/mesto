class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async _request(url, options) {
    return await fetch(`${this.url}${url}`, options).then(this._checkResponse);
  }

  // получение данных пользователя
  async getServerUserInfo() {
    const response = await this._request("/users/me", {
      headers: this.headers,
    });
    return response;
  }

  // получение карточек
  async getCards() {
    const response = await this._request("/cards", {
      headers: this.headers,
    });
    return response;
  }

  // сохранение изменений профиля
  async saveUserInfo(newName, newDescription) {
    const response = await this._request("/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription,
      }),
    });
    return response;
  }

  // добавить новую карточку
  async addCard(cardName, cardLink) {
    const response = await this._request("/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    });
    return response;
  }

  // удалить карточку
  async deletCard(cardId) {
    const response = await this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  // поставить лайк карточке
  async likeCard(cardId) {
    const response = await this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
    return response;
  }

  // снять лайк с карточки
  async unlikeCard(cardId) {
    const response = await this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
    return response;
  }

  // смена аватара пользователя
  async updateAvatar(newAvatar) {
    const response = await this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    });
    return response;
  }
}

export { Api };
