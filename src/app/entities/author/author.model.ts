export interface IAuthor {
  id?: number;
  name?: string;
  surname?: string;
}


export type NewColor = Omit<IAuthor, 'id'> & { id: null };
