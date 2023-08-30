import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        data: {title: 'Book'},
        loadChildren: () => import('./book/book.module').then(m => m.BookModule)
      },
      {
        path: 'category',
        data: {title: 'Category'},
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'author',
        data: {title: 'Author'},
        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule)
      }
    ])],
})
export class EntityRoutingModule {
}
