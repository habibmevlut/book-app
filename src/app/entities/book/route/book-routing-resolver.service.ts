import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IBook } from '../book.model';
import { BookService } from '../service/book.service';
import { HttpResponse } from '@angular/common/http';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookRoutingResolverService implements Resolve<IBook | null> {
  constructor(
    protected service: BookService,
    protected router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBook | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((city: HttpResponse<IBook>) => {
          if (city.body) {
            return of(city.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
