import { GIPHY_API_KEY, GIPHY_API_URL, API_URL } from './constants'

const responseToImages = (response: any) => {
    const { data } = response

    const images = data.map((image: any) => {
        const {images, title, id} = image
        const { url } = images.downsized_medium
        return { title, id, imageUrl: url }
    })
    return images
}

export function favImage(giphyId: string) {
  // Default options are marked with *
  return fetch(API_URL+'?giphy_id='+giphyId, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: giphyId}) // body data type must match "Content-Type" header
  });
}

export function getGiphyImages(keyword: string) {
    const limit = 15;
    const rating = 'g'; // kids friendly
    const apiURL = `${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=${limit}&rating=${rating}`

    return fetch(apiURL)
        .then((res) => res.json())
        .then(responseToImages)
}
