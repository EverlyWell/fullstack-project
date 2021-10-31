export interface ICategory {
  id: number;
  name: string;
}

export interface ICat {
  id: string;
  breeds: string[];
  url: string;
  width: number;
  height: number;
}

export interface IFav {
  id: string;
  created_at: string;
  image: IImage;
  image_id: string;
  sub_id: string;
  user_id: string;
}

export interface IImage {
  id: string;
  url: string;
}

export interface IPagination {
  count: number;
  page: number;
  limit: number;
}
