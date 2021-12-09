import { GIPHY_API_KEY, GIPHY_API_URL, API_URL } from './constants'

const giphyResponseToImages = (response: any) => {
    const { data } = response

    const images = data.map((image: any) => {
        const {images, title, id} = image
        const { url } = images.downsized_medium
        return { title, id, imageUrl: url }
    })
    return images
}

export function listSavedFavsIds() {
    return fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((response) => { return response.map((fav: any) => fav.giphy_id) })
}

export function getFavedImages() {
    return listSavedFavsIds()
        .then(getGiphyImagesById)
}

export function favImage(giphyId: string) {
  return fetch(API_URL+'?giphy_id='+giphyId, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: giphyId}) // body data type must match "Content-Type" header
  });
}

export function getGiphyImagesById(ids: Array<string>) {
    const idsString = ids.join(', ')
    const apiURL = `${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&ids=${idsString}`

    return fetch(apiURL)
        .then((res) => res.json())
        .then(giphyResponseToImages)
}

export function getGiphyImages(keyword: string) {
    const limit = 15;
    const rating = 'g'; // kids friendly
    const apiURL = `${GIPHY_API_URL}/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=${limit}&rating=${rating}`

    return fetch(apiURL)
        .then((res) => res.json())
        .then(giphyResponseToImages)
}
