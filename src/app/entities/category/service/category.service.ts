import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ICategory, NewCategory } from '../category.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categories');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {
  }

  /**
   * Creates a category.
   * @param category
   */
  create(category: NewCategory): Observable<EntityResponseType> {
    return this.http.post<ICategory>(this.resourceUrl, category, {observe: 'response'});
  }

  /**
   * Updates a category.
   * @param category
   */
  update(category: ICategory): Observable<EntityResponseType> {
    return this.http.put<ICategory>(`${this.resourceUrl}/${this.getCategoryIdentifier(category)}`, category, {observe: 'response'});
  }

  /**
   * Returns a category by id.
   * @param id
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategory>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  /**
   * Get all categorys
   * @param req
   */
  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<ICategory[]>(this.resourceUrl, {params: req, observe: 'response'});
  }

  /**
   * Deletes a category by id.
   * @param id
   */
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private getCategoryIdentifier(category: ICategory): number | undefined {
    return category.id;
  }
}
