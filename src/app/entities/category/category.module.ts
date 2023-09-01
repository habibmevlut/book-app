import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryUpdateDialogComponent } from './update/category-update-dialog.component';
import { CategoryComponent } from './list/category.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from './service/category.service';
import { UIHelperService } from '../../core/service/uihelper.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {title: 'Category'}
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryUpdateDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    CategoryService,
    MatSnackBar,
    UIHelperService
  ]
})
export class CategoryModule {
}
