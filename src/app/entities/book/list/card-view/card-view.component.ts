import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../../book.model';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
    @Input() dataSource: IBook[] | null = null;
    @Output() editClick = new EventEmitter();
    @Output() deleteClick = new EventEmitter<IBook>();

    constructor() {
    }

    ngOnInit(): void {
    }

}


