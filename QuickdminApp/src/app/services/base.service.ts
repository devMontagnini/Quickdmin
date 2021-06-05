import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelper } from '../helpers/http.helper';
import { SearchResult } from '../interfaces/search-result.interface';
import { PaginateSearchModel } from '../models/paginate-search.model';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected entityRoute: string = '';

  constructor(protected httpClient: HttpClient) { }

  setEntityRoute(value: string) {
    this.entityRoute = `api/${value}`;
  }

  paginate(model: PaginateSearchModel): Observable<SearchResult> {
    const params = HttpHelper.objectToParams(model);
    return this.httpClient.get<SearchResult>(this.entityRoute, { params });
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.entityRoute}/${id}`);
  }
}
