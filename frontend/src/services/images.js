import axios from 'axios'

export function queryImages(authToken, query) {
  return axios.get('/api/images/search', {
    params: { query },
    headers: {
      'Authorization': authToken
    }
  })
}

export function getFavorites(authToken) {
  return axios.get('/api/favorites', {
    headers: {
      'Authorization': authToken
    }
  })
}

export function markFavorite(authToken, image) {
  return axios.post('/api/favorites', { image }, {
    headers: {
      'Authorization': authToken
    }
  })
}

export function removeFavorite(authToken, image) {
  return axios.delete(`/api/favorites/${image.id}`, {
    headers: {
      'Authorization': authToken
    }
  })
}
