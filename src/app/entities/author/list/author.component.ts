import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../../category/category.model';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { MatDialog } from '@angular/material/dialog';
import { IAuthor } from '../author.model';
import { AuthorService } from '../service/author.service';
import { ConfirmationDialogComponent } from '../../../core/component/confirmation-dialog/confirmation-dialog.component';
import { AuthorUpdateDialogComponent } from '../update/author-update-dialog.component';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {

  isLoading = false;
  authors: IAuthor[] = [];
  displayedColumns: string[] = ['id', 'avatar', 'name', 'surname', 'actions'];
  private readonly unsubscriptionGetData$ = new Subject();

  constructor(
    private authorService: AuthorService,
    private uiHelperService: UIHelperService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.unsubscriptionGetData$.next(null);
    this.unsubscriptionGetData$.complete();
  }

  load(): void {
    this.isLoading = true;
    this.authorService.query()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.unsubscriptionGetData$)
      )
      .subscribe({
        next: (res) => {
          if (res.body !== null && res.body !== undefined) {
            this.authors = res.body;
          } else {
            this.authors = [];
          }
        },
        error: () => {
          this.isLoading = false;
          this.uiHelperService.showSnackBarMessage('Error while loading categories');
        }
      });
  }

  showAuthorUpdateDialog(selectedAuthor?: IAuthor): void {
    this.matDialog
      .open(AuthorUpdateDialogComponent, {
        data: {
          author: selectedAuthor,
        },
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.load();
        }
      });
  }

  delete(element: IAuthor): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && element.id) {
        this.authorService.delete(element.id)
          .subscribe({
            next: (res) => {
              if (res.ok) {
                this.uiHelperService.showSnackBarMessage('Author deleted successfully');
                this.load();
              }
            },
            error: () => {
              this.uiHelperService.showSnackBarMessage('Error while deleting author');
            }
          })
      }
    });
  }
}
