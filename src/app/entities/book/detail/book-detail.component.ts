import { Component, OnInit } from '@angular/core';
import { IBook } from '../book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
    book: IBook | null = null;

    constructor(protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({book}) => {
            this.book = book;
        });
    }
}
