class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, method, body) {
    const url = `${this._baseUrl}/${endpoint}`;

    const options = {
      method: method,
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(this._checkResponse);
  }

  async getInfo() {
    return this._request('users/me', 'GET');
  }

  async setUserInfo(data) {
    return this._request('users/me', 'PATCH', {
      name: data.username,
      about: data.description,
    });
  }

  async setUserAvatar(data) {
    return this._request('users/me/avatar', 'PATCH', {
      avatar: data.avatar,
    });
  }

  async getInitialCards() {
    return this._request('cards', 'GET');
  }

  async addNewCardToServer(data) {
    return this._request('cards', 'POST', {
      name: data.name,
      link: data.link,
    });
  }

  async deleteCardFromServer(cardId) {
    return this._request(`cards/${cardId}`, 'DELETE');
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return this._request(`cards/likes/${cardId}`, method);
  }
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
