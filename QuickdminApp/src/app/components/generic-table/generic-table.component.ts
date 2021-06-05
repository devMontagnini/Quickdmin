import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchResultItem } from "../../interfaces/search-result-item.model";

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.sass'],
})
export class GenericTableComponent {
  @Input('dataSource') dataSource: SearchResultItem[] = [];
  @Output('onSelectItem') onSelectItem = new EventEmitter<SearchResultItem>();
  @Output('onDeleteItem') onDeleteItem = new EventEmitter<SearchResultItem>();
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'options' ];
}