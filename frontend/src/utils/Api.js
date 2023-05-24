class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    // this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  // другие методы работы с API
  editProfile(name, about) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  addCard(name, link) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editAvatar(avatar) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }

  toggleLike(id, isLiked) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(this._getResponseData);
  }
  // addLike(id) {
  //     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //         method: "PUT",
  //         headers: this._headers,
  //     })
  //     .then(this._getResponseData)
  // }
  // deleteLike(id) {
  //     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //         method: "DELETE",
  //         headers: this._headers,
  //     })
  //     .then(this._getResponseData)
  // }
}

export const api = new Api({
  baseUrl: "https://api.projects.nomoredomains.monster",
  // baseUrl: "http://localhost:3000",
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  // headers: {
  //   authorization: "b09e5145-4d0e-4084-8037-03c111312ec0",
  //   "Content-Type": "application/json",
  // },
});
