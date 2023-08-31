export interface ICategory {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
}


export type NewCategory = Omit<ICategory, 'id'> & { id: null };
