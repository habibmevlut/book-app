import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from '../list/book.component';
import { BookDetailComponent } from '../detail/book-detail.component';
import { BookRoutingResolverService } from './book-routing-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: BookComponent
  },
  {
    path: ':id/detail',
    component: BookDetailComponent,
    data: {title: 'Book Detail'},
    resolve: {
      book: BookRoutingResolverService
    }
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class BookRoutingModule {
}
