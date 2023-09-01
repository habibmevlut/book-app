export interface IAuthor {
  id?: number;
  name?: string;
  surname?: string;
  profileImage?: string;
}


export type NewAuthor = Omit<IAuthor, 'id'> & { id: null };
