import { IAuthor } from '../author/author.model';
import { ICategory } from '../category/category.model';

export interface IBook {
    id?: number
    title?: string;
    author?: IAuthor;
    category?: ICategory;
    coverImageUrl?: string;
    description?: string;
    //It just added for filtering purpose from the mockapi.io
    categoryId?: number;
}


export interface IBookResponseResult {
    count?: number;
    books?: IBook[];
}


export type NewBook = Omit<IBook, 'id'> & { id: null };
