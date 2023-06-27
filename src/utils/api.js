class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    });
    return this._checkResponse(res);
  }

  async setUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.description,
      })
    });
    return this._checkResponse(res);
  }

  async setUserAvatar(data) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    });
    return this._checkResponse(res);
  }

  async addNewCardToServer(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    });
    return this._checkResponse(res);
  }

  async deleteCardFromServer(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    });
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    let method= 'DELETE';
    if (isLiked) {
      method = 'PUT';
    }
    return await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers
    })
    .then(this._checkResponse);
  }


  // async addLike(cardId) {
  //   const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._authorization
  //     }
  //   });
  //   return this._checkResponse(res);
  // }

  // async deleteLike(cardId) {
  //   const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._authorization
  //     }
  //   });
  //   return this._checkResponse(res);
  // }
}

// Экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '6ca2f4db-76f0-4668-af2d-24d84bc892a5',
    'Content-Type': 'application/json'
  }
});

export default api;