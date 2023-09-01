import { Component, OnInit } from '@angular/core';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../service/book.service';
import { IBook } from '../book.model';
import { finalize } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../core/component/confirmation-dialog/confirmation-dialog.component';
import { BookUpdateDialogComponent } from '../update/book-update-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICategory } from '../../category/category.model';
import { CategoryService } from '../../category/service/category.service';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE, ITEMS_VIEW_CONTENT_COUNT, PagingParams } from '../../../app.constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  isLoading = false;
  books: IBook[] = [];
  categories: ICategory[] = [];
  displayedColumns: string[] = ['id', 'avatar', 'name', 'surname', 'actions'];
  pagingParams: PagingParams | undefined;
  pagingOpts: { pageSizeOptions: number[]; length?: number; sort: Sort; } | undefined;
  // @ts-ignore
  searchForm: FormGroup;

  constructor(
    private bookService: BookService,
    private uiHelperService: UIHelperService,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.initPagingOpts();
    this.initSearchForm();
    this.load();
    this.fetchCategories();

    this.searchForm.get('category')?.valueChanges.subscribe((value) => {
      this.load();
    });
  }


  initPagingOpts() {
    /* Get query params from url */
    const qParams = this.activatedRoute.snapshot.queryParams as PagingParams;
    /* Set query paging params for first time */
    this.pagingParams = {
      page: qParams.page ? qParams.page : 1,
      limit: qParams.limit ? qParams.limit : ITEMS_PER_PAGE,
      sort: qParams.sort ? ([qParams.sort] as any) : ['id', 'desc'],
    };
    /* sort paging options */
    this.pagingOpts = {
      pageSizeOptions: ITEMS_VIEW_CONTENT_COUNT,
      sort: {
        active: this.pagingParams?.sort ? this.pagingParams.sort[0].split(',')[0] : '',
        direction: this.pagingParams?.sort ? (this.pagingParams.sort[0].split(',')[1] as SortDirection) : '',
      },
    };
  }

  load(): void {
    const searchData = this.searchForm.getRawValue();
    const req = {
      categoryId: searchData.category?.id ? searchData.category.id : null
    }
    this.isLoading = true;
    this.bookService.query(req)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.body !== null && res.body !== undefined) {
            this.books = res.body;
          } else {
            this.books = [];
          }
        },
        error: () => {
          this.isLoading = false;
          this.uiHelperService.showSnackBarMessage('Error while loading categories');
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

  private initSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      category: new FormControl(null),
    });
  }
}
