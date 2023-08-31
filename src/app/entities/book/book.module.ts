import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './list/book.component';
import { BookDetailComponent } from './detail/book-detail.component';
import { BookUpdateDialogComponent } from './update/book-update-dialog.component';
import { BookRoutingModule } from './route/book-routing.module';


@NgModule({
  declarations: [
    BookComponent,
    BookDetailComponent,
    BookUpdateDialogComponent
  ],
  imports: [
    BookRoutingModule,
    CommonModule
  ]
})
export class BookModule {
}
