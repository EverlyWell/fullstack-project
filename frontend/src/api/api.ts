import axios from 'axios';

export interface LoginSuccessPayload {
    token: string,
    exp: string,
    username: string,
    cat_api_sub_id: string
}


const LogInOrCreateUserName = async (username : string, password : string) => {
    const API_URL = 'http://localhost:3010/api/auth/login';   
    try {
        const result  = await axios.post(API_URL, { username, password });
        return result.data;
    } catch (e) {
        console.log('error: ', e);
    }
};

const CAT_API_URL = 'https://api.thecatapi.com/v1'

export interface SearchCatsParams {
    query: string,  
  };

interface BreedObject {
    id: string,
}

export interface Cat {
    url: string,
    id: string,
};

export interface FaveImageBody { 
    image_id: string,
    sub_id: string,
};

const faveImage = async (body : FaveImageBody)  => {
    const postFavoriteResult  = await axios({
        method: 'post',
        url: `${CAT_API_URL}/favourites`,
        data: { ...body },
        headers: { ["x-api-key"]: '1c059f35-5428-4f45-8c52-2340bc18c7aa' },
    });
};

interface FavoriteImagePayload {
    image: {
        id: string,
        url: string,
    },
}

export interface MyFavoriteParams {
    sub_id: string,
}

const myFavorites = async (params : MyFavoriteParams) => {
    const myFavoritesResults : any = await axios({
        method: 'get',
        url: `${CAT_API_URL}/favourites/`,
        headers: { ["x-api-key"]: '1c059f35-5428-4f45-8c52-2340bc18c7aa' },
        params: {
            sub_id: params.sub_id,
        },
      });

      return myFavoritesResults.data.map((favorite : FavoriteImagePayload) => ({ id: favorite.image.id, url: favorite.image.url }));
};


const searchCats = async (params : SearchCatsParams) => {
    const breedResults : any = await axios({
        method: 'get',
        url: `${CAT_API_URL}/breeds/search`,
        headers: { ["x-api-key"]: '1c059f35-5428-4f45-8c52-2340bc18c7aa' },
        params: {
            q: params.query,
        },
      });

    if(breedResults.data.length === 0) return [];

    const firstBreed : BreedObject = breedResults.data[0];

    const searchByBreedResults : any = await axios({
        method: 'get',
        url: `${CAT_API_URL}/images/search`,
        headers: { ["x-api-key"]: '1c059f35-5428-4f45-8c52-2340bc18c7aa' },
        params: {
            breed_ids: firstBreed.id,
            limit: 8,
        },
    });


    return searchByBreedResults.data.map((cat : Cat) => {
        return { url: cat.url, id: cat.id };
    });
};

export {
    LogInOrCreateUserName,
    searchCats,
    faveImage,
    myFavorites,
};