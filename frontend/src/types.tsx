export interface Image{
    url:string,
    id: string,
    liked: boolean,
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
    loadImages: (filters:Filters)=>void
}

export interface Filters{
    breed_id?: string,
    type_id?: string,
    category_ids?: string
}