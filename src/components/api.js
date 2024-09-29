const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
        authorization: 'a030b8a1-dd7d-45da-b6a8-9dd27ad0c9de',
        'Content-Type': 'application/json'
    }
}

function checkResponse (res) {
    if (res.ok) {
        return res.json();
    } 
    else {
        return Promise.reject(`Error: ${res.status}`);
    }
}

// Получение с сервера информации пользователя
function getUserInfo () {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(checkResponse)
}

// Редактирование профиля с отправкой на сервер
function editUserInfo (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
      })
    })
    .then(checkResponse)
}

// Обновление аватара пользователя
function editAvatar (avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        })
    })
    .then(checkResponse)
}

// Получение с сервера карточек
function getAllCards () {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(checkResponse)
}

// Добавление новой карточки
function createNewCard (name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        })
    })
    .then(checkResponse)
}

// Удаление карточки
function deleteCard (id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(checkResponse)
}

// Добавление лайка
function addLike (id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(checkResponse)
}

// Удаление лайка
function deleteLike (id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(checkResponse)
}

export { 
    getUserInfo, 
    getAllCards, 
    editUserInfo, 
    editAvatar,
    createNewCard,
    deleteCard,
    addLike,
    deleteLike
}