import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ICategory, NewCategory } from '../../category/category.model';
import { IAuthor } from '../author.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IAuthor>;
export type EntityArrayResponseType = HttpResponse<IAuthor[]>;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/authors');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {
  }

  /**
   * Creates a author.
   */
  create(author: NewCategory): Observable<EntityResponseType> {
    return this.http.post<IAuthor>(this.resourceUrl, author, {observe: 'response'});
  }

  /**
   * Updates a author.
   */

  update(author: IAuthor): Observable<EntityResponseType> {
    return this.http.put<IAuthor>(`${this.resourceUrl}/${this.getAuthorIdentifier(author)}`, author, {observe: 'response'});
  }

  /**
   * Returns a author by id.
   * @param id
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAuthor>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  /**
   * Get all authors
   * @param req
   * @private
   */
  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<IAuthor[]>(this.resourceUrl, {params: req, observe: 'response'});
  }

  /**
   * Deletes a author by id.
   * @param id
   */
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private getAuthorIdentifier(author: IAuthor): number | undefined {
    return author.id;
  }
}
