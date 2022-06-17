class Api {
    constructor({ baseUrl }) {
        this._url = baseUrl;
    }

    get _headers() {
        return {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    
    // проверка ответа от сервера
    _checkServerResponce(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(res.status)
        }
    }

    // изменение и добавление данных 

    // профиль
    getProfile() {
        return fetch(`${ this._url }/users/me`, {
            headers: this._headers
        }).then((res) =>
            this._checkServerResponce(res)
        )
    }

    editProfile(name, about) {
        return fetch(`${ this._url }/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then((res) =>
            this._checkServerResponce(res)
        )
    }

    // аватар
    changeAvatar(avatar) {
        return fetch(`${ this._url }/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then((res) =>
            this._checkServerResponce(res)
        )
    }

    // карточки
    getInitialCards() {
        return fetch(`${ this._url }/cards`, {
headers: this._headers
        }).then((res) =>
    this._checkServerResponce(res)
)
    }

addCard(name, link) {
    return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
        })
    }).then((res) =>
        this._checkServerResponce(res)
    )
}

// удаление карточки
deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
    }).then((res) =>
        this._checkServerResponce(res)
    )
}

// проверка лайка, добавление и удаление
changeLikeCardStatus(id, isLiked) {
    console.log(isLiked)
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers
    }).then((res) =>
        this._checkServerResponce(res)
    )
}
}

export const api = new Api({
    baseUrl: 'http://localhost:3000'
})