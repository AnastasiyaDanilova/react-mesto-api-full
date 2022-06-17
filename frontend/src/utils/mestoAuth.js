export const BASE_URL = 'https://api.mesto.nomoredomains.xyz';

// проверка ответа от сервера
export const checkServerResponce = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
}

export const register = (email, password) => {
  console.log(email, password)
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) =>
    checkServerResponce(res)
  )
}

export const autorize = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) =>
    checkServerResponce(res)
  )
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) =>
      checkServerResponce(res)
    )
}