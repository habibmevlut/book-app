import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthorComponent } from './list/author.component';
import { AuthorUpdateDialogComponent } from './update/author-update-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthorService } from './service/author.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIHelperService } from '../../core/service/uihelper.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: AuthorComponent
  }
];

@NgModule({
  declarations: [
    AuthorComponent,
    AuthorUpdateDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [
    AuthorService,
    MatSnackBar,
    UIHelperService
  ]
})
export class AuthorModule {
}
