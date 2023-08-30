export interface ICategory {
  id?: number;
  name?: string;
  code?: string;
}


export type NewColor = Omit<ICategory, 'id'> & { id: null };
