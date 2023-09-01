import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IBook, NewBook } from '../book.model';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { UIHelperService } from '../../../core/service/uihelper.service';

export type EntityResponseType = HttpResponse<IBook>;
export type EntityArrayResponseType = HttpResponse<IBook[]>;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/books');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected uiHelperService: UIHelperService,
  ) {
  }

  /**
   * Creates a book.
   */
  create(book: NewBook): Observable<EntityResponseType> {
    return this.http.post<IBook>(this.resourceUrl, book, {observe: 'response'});
  }

  /**
   * Updates a book.
   */
  update(book: IBook): Observable<EntityResponseType> {
    return this.http.put<IBook>(`${this.resourceUrl}/${this.getBookIdentifier(book)}`, book, {observe: 'response'});
  }

  /**
   * Returns a book by id.
   * @param id
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBook>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  /**
   * Returns the list of books.
   * @param req
   */
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = this.uiHelperService.createRequestOptionMultipleWithoutNull(req);
    return this.http.get<IBook[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  /**
   * Deletes a book by id.
   * @param id
   */
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  /**
   * Returns a book id.
   * @param book
   * @private
   */
  private getBookIdentifier(book: IBook): number | undefined {
    return book.id;
  }
}
