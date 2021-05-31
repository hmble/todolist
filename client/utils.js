const BASE_PATH = 'http://localhost:5000'
module.exports = {
  fetcher: async (method, path, data) => {
    let token
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }
    let resp
    if (method === 'POST' || method === 'PUT') {
      resp = await fetch(BASE_PATH + path, {
        method: method,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }
    if (method === 'GET' || method === 'DELETE') {
      resp = await fetch(BASE_PATH + path, {
        method: method,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
    }
    const d = await resp.json()
    return d
  },
  upload: async (file) => {
    let token
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    const resp = await fetch(BASE_PATH + '/api/upload/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: file,
    })
    const data = await resp.json()
    return data
  },
}
