import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../category.model';
import { ConfirmationDialogComponent } from '../../../core/component/confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from '../service/category.service';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CategoryUpdateDialogComponent } from '../update/category-update-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  isLoading = false;
  categories: ICategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'description', 'actions'];
  private readonly unsubscriptionGetData$ = new Subject();

  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.query()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.unsubscriptionGetData$)
      )
      .subscribe({
        next: (res) => {
          if (res.body !== null && res.body !== undefined) {
            this.categories = res.body;
          } else {
            this.categories = [];
          }
        },
        error: () => {
          this.isLoading = false;
          this.uiHelperService.showSnackBarMessage('Error while loading categories');
        }
      });
  }

  showCategoryUpdateDialog(selectedCategory?: ICategory): void {
    this.matDialog
      .open(CategoryUpdateDialogComponent, {
        data: {
          category: selectedCategory,
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

  delete(element: ICategory): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && element.id) {
        this.categoryService.delete(element.id)
          .subscribe({
            next: (res) => {
              if (res.ok) {
                this.uiHelperService.showSnackBarMessage('Category deleted successfully');
                this.load();
              }
            },
            error: () => {
              this.uiHelperService.showSnackBarMessage('Error while deleting category');
            }
          })
      }
    });
  }
}
