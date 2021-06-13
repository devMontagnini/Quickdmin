import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPaginateSearch } from "../../shared/interfaces/paginate-search.interface";

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent {

  @Output('onChangePage') onChangePage = new EventEmitter<number>();
  @Input('config') config!: IPaginateSearch & { totalItems: number };

  get totalPages(): number {
    return Math.ceil(this.config.totalItems/this.config.itemsByPage);
  }

  isFirstPage(): boolean {
    return this.config.pageIndex === 0;
  }

  isLastPage(): boolean {
    return this.config.pageIndex + 1 >= this.totalPages;
  }

  changePage(direction: 'prev' | 'next') {
    this.config.pageIndex += direction === 'next' ? 1 : -1;
    this.onChangePage.emit(this.config.pageIndex);
  }
}