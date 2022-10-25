import {api_url, token} from './utils';

class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "authorization": this._token,
            },
          })
          .then((res) => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                "authorization": this._token,
            }
         })
        .then((res) => this._checkResponse(res));
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: {
            "authorization": this._token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
        })
        .then((res) => this._checkResponse(res));
    }
    
    addCard(data) {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: {
            "authorization": this._token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        })
        .then((res) => this._checkResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: "DELETE",
          headers: {
            "authorization": this._token,
          }
        })
        .then((res) => this._checkResponse(res));
    }

      changeUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: "PATCH",
          headers: {
            "authorization": this._token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        })
        .then((res) => this._checkResponse(res));
      }

      changeLikeStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: {
            "authorization": this._token,
          },
        }).then((res) => this._checkResponse(res));
      }
}

const api = new Api(api_url, token);

export default api;
