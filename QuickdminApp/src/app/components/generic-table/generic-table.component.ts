import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ISearchResultItem } from "../../shared/interfaces/search-result-item.interface";

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.sass'],
})
export class GenericTableComponent {
  @Input('dataSource') dataSource: ISearchResultItem[] = [];
  @Output('onSelectItem') onSelectItem = new EventEmitter<ISearchResultItem>();
  @Output('onDeleteItem') onDeleteItem = new EventEmitter<ISearchResultItem>();
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'options' ];
}