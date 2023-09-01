import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './list/book.component';
import { BookDetailComponent } from './detail/book-detail.component';
import { BookUpdateDialogComponent } from './update/book-update-dialog.component';
import { BookRoutingModule } from './route/book-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { BookService } from './service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIHelperService } from '../../core/service/uihelper.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    BookComponent,
    BookDetailComponent,
    BookUpdateDialogComponent
  ],
  imports: [
    BookRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    BookService,
    MatSnackBar,
    UIHelperService
  ]
})
export class BookModule {
}
