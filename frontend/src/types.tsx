export interface Image{
    url:string,
    id: string
}

export interface ImageListProps {
    images: Image[]
}

export interface ImageProps {
    url: string,
    id: string
}

export interface LoginProps {
    loggedIn: boolean,
    setLoggedIn: (isLoggedIn: boolean)=> void;
}


export interface ImageFiltersProps {
    loadImages: (filters: Filters)=>void
}

export interface Filters{
    breed: string,
    type: string,
    category: string
}