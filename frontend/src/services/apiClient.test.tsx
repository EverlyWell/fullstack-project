// @ts-nocheck

import { getGiphyImages } from './apiClient'

describe('getGiphyImages', () => {
    global.fetch = jest.fn(() => {
        
        // @ts-ignore
        const response = { data: [
                {
                    id: '1111',
                    title: 'Missifus',
                    images: {
                        downsized_medium: {
                            url: 'https://picsum.photos/200/300'
                        }
                    }
                }
            ]
        }

        return Promise.resolve({
            json: () => Promise.resolve(response),
        })
    });

    beforeEach(() => {
        fetch.mockClear();
    });

    it('returns images', async () => {
        const images = await getGiphyImages('cats');

        expect(images).toEqual(
            [
                {
                    id: '1111',
                    title: 'Missifus',
                    imageUrl: 'https://picsum.photos/200/300'
                }
            ]
        );
        expect(fetch).toHaveBeenCalledTimes(1);
    });
})
