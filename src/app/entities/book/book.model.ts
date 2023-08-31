export interface IBook {
  id?: number
  name?: string;
  code?: string;
}


export type NewColor = Omit<IBook, 'id'> & { id: null };
