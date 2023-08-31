export interface IAuthor {
  id?: number;
  name?: string;
  surname?: string;
  avatar?: string;
}


export type NewAuthor = Omit<IAuthor, 'id'> & { id: null };
