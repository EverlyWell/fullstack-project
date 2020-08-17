export interface Image{
    url:string,
    id: string,
    fav_id: string
}
export interface ImageCardProps{
   image: Image
}
export interface ImageListProps {
    images: Image[]
}

export interface LoginProps {
    loggedIn: boolean,
    setLoggedIn: (isLoggedIn: boolean)=> void;
}


export interface ImageFiltersProps {
    loadImages: (apiImages: string, filters: Filters)=>void
}

export interface Filters{
    breed_id?: string,
    type_id?: string,
    category_ids?: string
}