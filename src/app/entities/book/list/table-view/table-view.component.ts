import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../../book.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'coverImage', 'title', 'author', 'category', 'actions'];
  @Input() dataSource: IBook[] | null = null;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter<IBook>();


  constructor() {
  }

  ngOnInit(): void {
  }


}
