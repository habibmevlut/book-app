import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './list/author.component';
import { AuthorUdateDialogComponent } from './update/author-udate-dialog.component';



@NgModule({
  declarations: [
    AuthorComponent,
    AuthorUdateDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthorModule { }
