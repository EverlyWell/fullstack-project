import axios from 'axios'

export function queryImages(authToken, query) {
  return axios.get('/api/images/search', {
    query,
    headers: {
      'Authorization': authToken
    }
  })
}
