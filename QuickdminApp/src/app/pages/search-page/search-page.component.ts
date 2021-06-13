import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ModelRoutes } from '../../routing/model-routes';
import { MODEL_SERVICE_TOKEN } from '../../services/constants';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { DeleteDialog } from '../../components/delete-dialog/delete.dialog';
import { ISearchResult } from '../../shared/interfaces/search-result.interface';
import { IModelService } from '../../services/interface/model.service.interface';
import { ISearchResultItem } from '../../shared/interfaces/search-result-item.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  modelRoute = '';
  searchResult?: ISearchResult;
  layoutMode: 'searching' | 'searchError' | 'showResults' = 'searching';
  searchForm = new FormGroup({ searchTerm: new FormControl() });

  constructor(
    private router: Router,
    private dialogService: MatDialog,
    private activateRoute: ActivatedRoute,
    @Inject(MODEL_SERVICE_TOKEN) private modelService: IModelService,
  ) {
    this.activateRoute.url.subscribe((value: UrlSegment[]) => {
      this.modelRoute = value[0].path;
      this.modelService.setModelRoute(this.modelRoute);
    });
  }

  ngOnInit(): void {
    this.search();
  }

  getTitle(): string {
    const modelRoute = ModelRoutes.find(c => c.path === this.modelRoute);
    return `Listar ${modelRoute?.title || 'Registros'}`;
  }

  search() {
    this.layoutMode = 'searching';
    const paginatedSearch = {
      searchTerm : this.searchForm.value.searchTerm,
      pageIndex: this.searchResult?.search?.pageIndex || 0,
      itemsByPage: this.searchResult?.search?.itemsByPage || 5,
    };
    
    this.modelService.paginate(paginatedSearch)
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
  }

  onSearchFormSubmit() {
    if (this.searchResult)
      this.searchResult!.search.pageIndex = 0;
    this.search();
  }

  gotoNew(): void {
    this.router.navigate(['0'], { relativeTo: this.activateRoute });
  }

  gotoDetail(event: any): void {
    const model = event as ISearchResultItem;
    this.router.navigate(
      [model.id.toString()], 
      { relativeTo: this.activateRoute }
    );
  }

  deleteItem(event: any): void {
    const model = event as ISearchResultItem;
    const deleteAction = () => this.modelService.delete(model.id);
    this.dialogService.open(DeleteDialog, { data: { model, deleteAction }})
      .afterClosed()
      .subscribe((deleted: boolean) => {
        if (deleted) {
          this.search();
        }
      });
  }

}
