import getEnvVariable from "./get-env-variable";

export const baseUrl = getEnvVariable('REACT_APP_BASE_URL_CATS_API');

export const authenticationApiUrl = `${baseUrl}/authentication`;
export const catsApiUrl = `${baseUrl}/cats`;
export const favoritesApiUrl = `${baseUrl}/favorites`;
export const categoriesApiUrl = `${baseUrl}/categories`;
