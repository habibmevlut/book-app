import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../service/book.service';
import { IBook } from '../book.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../core/component/confirmation-dialog/confirmation-dialog.component';
import { BookUpdateDialogComponent } from '../update/book-update-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICategory } from '../../category/category.model';
import { CategoryService } from '../../category/service/category.service';
import { ITEMS_PER_PAGE, ITEMS_VIEW_CONTENT_COUNT } from '../../../app.constants';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  isLoading = false;
  books: IBook[] = [];
  categories: ICategory[] = [];
  currentView: 'card' | 'table' = 'card';
  searchForm: FormGroup | undefined;
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = ITEMS_VIEW_CONTENT_COUNT;
  private readonly unsubscriptionGetData$ = new Subject();

  constructor(
    private bookService: BookService,
    private uiHelperService: UIHelperService,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    protected categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.initSearchForm();
    this.load();
    this.fetchCategories();

    this.searchForm?.get('category')?.valueChanges.subscribe((value) => {
      this.load();
    });
  }

  ngOnDestroy(): void {
    this.unsubscriptionGetData$.next(null);
    this.unsubscriptionGetData$.complete();
  }

  load(): void {
    this.isLoading = true;
    const searchData = this.searchForm?.getRawValue();
    const req = {
      categoryId: searchData.category?.id ? searchData.category.id : null
    }
    this.bookService.query({
      ...req,
      page: this.currentPage,
      limit: this.itemsPerPage,
    })
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.unsubscriptionGetData$)
      )
      .subscribe({
        next: (res) => {
          if (res.body !== null && res.body !== undefined) {
            this.books = res.body.books as IBook[];
            this.totalItems = res.body.count as number;
          } else {
            this.books = [];
          }
        },
        error: () => {
          this.uiHelperService.showSnackBarMessage('Error while loading books');
        }
      });
  }

  showBookUpdateDialog(selectedBook?: IBook): void {
    this.matDialog
      .open(BookUpdateDialogComponent, {
        data: {
          book: selectedBook,
        },
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.load();
        }
      });
  }

  delete(element: IBook): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && element.id) {
        this.bookService.delete(element.id)
          .subscribe({
            next: (res) => {
              if (res.ok) {
                this.uiHelperService.showSnackBarMessage('Book deleted successfully');
                this.load();
              }
            },
            error: () => {
              this.uiHelperService.showSnackBarMessage('Error while deleting book');
            }
          })
      }
    });
  }

  fetchCategories(): void {
    this.categoryService.query()
      .pipe(takeUntil(this.unsubscriptionGetData$))
      .subscribe({
        next: (res) => {
          if (res.body !== null && res.body !== undefined) {
            this.categories = res.body;
          } else {
            this.categories = [];
          }
        },
        error: () => {
          this.uiHelperService.showSnackBarMessage('Error while loading categories');
        }
      });
  }

  toggleView() {
    this.currentView = this.currentView === 'card' ? 'table' : 'card';
  }

  private initSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      category: new FormControl(null),
    });
  }

  setPageOpts(event: PageEvent) {
    this.currentPage = event.pageIndex === 0 ? 1 : event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.load();
  }
}
