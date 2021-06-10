import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { EntityRoutes } from 'src/app/routing/entity-routes';
import { BaseApiService } from 'src/app/services/base.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ISearchResult } from 'src/app/interfaces/search-result.interface';
import { PaginateSearchModel } from 'src/app/models/paginate-search.model';
import { DeleteDialog } from 'src/app/components/delete-dialog/delete.dialog';
import { ISearchResultItem } from 'src/app/interfaces/search-result-item.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  searchTerm = '';
  entityRoute = '';
  searchResult?: ISearchResult;
  layoutMode: 'searching' | 'searchError' | 'showResults' = 'searching';
  searchForm = new FormGroup({ searchTerm: new FormControl(this.searchTerm) });

  constructor(
    private router: Router,
    private dialogService: MatDialog,
    private apiService: BaseApiService,
    private activateRoute: ActivatedRoute,
  ) {
    this.activateRoute.url.subscribe((value: UrlSegment[]) => {
      this.entityRoute = value[0].path;
      this.apiService.setEntityRoute(this.entityRoute);
    });
  }

  ngOnInit(): void {
    this.search();
  }

  getTitle(): string {
    const entity = EntityRoutes.find(c => c.path === this.entityRoute);
    return `Listar ${entity?.title || 'Registros'}`;
  }

  search() {
    this.layoutMode = 'searching';
    const paginatedSearch = this.searchResult?.search || new PaginateSearchModel();
    paginatedSearch.searchTerm = this.searchForm.value['searchTerm'];
    this.searchResult?.search.pageIndex
    this.apiService.paginate(paginatedSearch)
      .subscribe(
        (searchResult: ISearchResult) => {
          this.searchResult = searchResult;
          this.layoutMode = 'showResults';
        },
        (error) => this.layoutMode = 'searchError'
      );
  }

  clearFields() {
    this.searchForm.reset();
    this.search();
  }

  gotoNew(): void {
    this.router.navigate(['0'], { relativeTo: this.activateRoute });
  }

  gotoDetail(event: any): void {
    const entity = event as ISearchResultItem;
    this.router.navigate(
      [entity.id.toString()], 
      { relativeTo: this.activateRoute }
    );
  }

  deleteItem(event: any): void {
    const entity = event as ISearchResultItem;
    const deleteAction = () => this.apiService.delete(entity.id);
    this.dialogService.open(DeleteDialog, { data: { entity, deleteAction }})
      .afterClosed()
      .subscribe((deleted: boolean) => {
        if (deleted) {
          this.search();
        }
      });
  }

}
