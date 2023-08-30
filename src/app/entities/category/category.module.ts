import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryUpdateDialogComponent } from './update/category-update-dialog.component';
import { CategoryComponent } from './list/category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryUpdateDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryModule {
}
