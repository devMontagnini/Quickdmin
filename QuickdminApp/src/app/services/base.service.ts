import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelper } from '../helpers/http.helper';
import { FormDataHelper } from '../helpers/form-data.helper';
import { ISearchResult } from '../interfaces/search-result.interface';
import { PaginateSearchModel } from '../models/paginate-search.model';
import { IModelData } from '../interfaces/model-data.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected entityRoute: string = '';

  constructor(protected httpClient: HttpClient) { }

  setEntityRoute(value: string) {
    this.entityRoute = `api/${value}`;
  }

  paginate(model: PaginateSearchModel): Observable<ISearchResult> {
    const params = HttpHelper.objectToParams(model);
    return this.httpClient.get<ISearchResult>(this.entityRoute, { params });
  }

  first(): Observable<IModelData> {
    return this.httpClient.get<IModelData>(`${this.entityRoute}/first`);
  }

  get(id: number): Observable<IModelData> {
    return this.httpClient.get<IModelData>(`${this.entityRoute}/${id}`);
  }

  insert(object: any): Observable<Object> {
    const formData = FormDataHelper.fromObject(object);
    return this.httpClient.post(this.entityRoute, formData);
  }

  update(id: number, object: any): Observable<Object> {
    const formData = FormDataHelper.fromObject(object);
    return this.httpClient.post(`${this.entityRoute}/${id}`, formData);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.entityRoute}/${id}`);
  }
}
