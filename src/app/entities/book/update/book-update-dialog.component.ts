import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../../author/service/author.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { BookService } from '../service/book.service';
import { IBook, NewBook } from '../book.model';
import { ICategory } from '../../category/category.model';
import { CategoryService } from '../../category/service/category.service';
import { HttpResponse } from '@angular/common/http';
import { IAuthor } from '../../author/author.model';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-book-update-dialog',
    templateUrl: './book-update-dialog.component.html',
    styleUrls: ['./book-update-dialog.component.scss']
})
export class BookUpdateDialogComponent implements OnInit {
    creatAndEditBookForm: FormGroup | undefined;
    isSaving: boolean = false;
    bookData: IBook | undefined;
    categories: ICategory[] = [];
    authors: IAuthor[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private dialogRef: MatDialogRef<BookUpdateDialogComponent>,
        private uiHelperService: UIHelperService,
        private authorService: AuthorService,
        private categoryService: CategoryService,
        @Inject(MAT_DIALOG_DATA) data: { book: IBook },
    ) {
        this.bookData = data.book;
    }

    ngOnInit(): void {
        this.initForm();
        this.loadRelationshipsOptions();
        this.creatAndEditBookForm?.get('category')?.valueChanges.subscribe((value) => {
            this.creatAndEditBookForm?.patchValue({
                categoryId: value?.id
            });
        });
    }

    compareCategory = (o1: ICategory | null, o2: ICategory | null): boolean => {
        return o1?.id === o2?.id;
    }
    compareAuthor = (o1: IAuthor | null, o2: IAuthor | null): boolean => {
        return o1?.id === o2?.id;
    }

    save() {
        if (this.creatAndEditBookForm?.invalid || this.isSaving) {
            return;
        }
        this.isSaving = true;
        const bookFormData = this.creatAndEditBookForm?.getRawValue();
        const data = {
            ...bookFormData,
            categoryId: bookFormData.category?.id,
        };

        if (data.id) {
            this.bookService.update(data)
                .pipe(finalize(() => (this.isSaving = false)))
                .subscribe({
                    next: (res) => {
                        if (res.ok) {
                            this.dialogRef.close(res.body);
                            this.uiHelperService.showSnackBarMessage('Book updated successfully')
                        }
                    },
                    error: () => {
                        this.isSaving = false;
                        this.uiHelperService.showSnackBarMessage('Error while updating book');
                    }
                });
        } else {
            this.bookService.create(data)
                .pipe(finalize(() => (this.isSaving = false)))
                .subscribe({
                    next: (res) => {
                        if (res.ok) {
                            this.dialogRef.close(res.body);
                            this.uiHelperService.showSnackBarMessage('Book saved successfully');
                        }
                    },
                    error: () => {
                        this.isSaving = false;
                        this.uiHelperService.showSnackBarMessage('Error while saving book');
                    },
                });
        }
    }

    private initForm(): void {
        this.creatAndEditBookForm = this.formBuilder.group({
            id: new FormControl(this.bookData?.id ?? null),
            title: new FormControl(this.bookData?.title ?? null, [Validators.required]),
            author: new FormControl(this.bookData?.author ?? null, [Validators.required]),
            category: new FormControl(this.bookData?.category ?? null, [Validators.required]),
            coverImageUrl: new FormControl(this.bookData?.coverImageUrl ?? null),
            description: new FormControl(this.bookData?.description ?? null),
            categoryId: new FormControl(this.bookData?.categoryId ?? null),
        });
    }

    protected loadRelationshipsOptions(): void {
        this.categoryService
            .query()
            .subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body ?? []));

        this.authorService
            .query()
            .subscribe((res: HttpResponse<IAuthor[]>) => (this.authors = res.body ?? []));
    }
}
