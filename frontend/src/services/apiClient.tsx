import { API_KEY, API_URL } from './constants'

const responseToImages = (response: any) => {
    const { data } = response

    const images = data.map((image: any) => {
        const {images, title, id} = image
        const { url } = images.downsized_medium
        return { title, id, imageUrl: url }
    })
    return images
}

export default function getGiphyImages(keyword: string) {
    const limit = 15;
    const rating = 'g'; // kids friendly
    const apiURL = `${API_URL}?api_key=${API_KEY}&q=${keyword}&limit=${limit}&rating=${rating}`

    return fetch(apiURL)
        .then((res) => res.json())
        .then(responseToImages)
}
