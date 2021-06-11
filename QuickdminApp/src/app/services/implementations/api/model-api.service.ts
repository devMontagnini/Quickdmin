import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IModelService } from '../../interface/model.service.interface';
import { IModelData } from 'src/app/shared/interfaces/model-data.interface';
import { ISearchResult } from 'src/app/shared/interfaces/search-result.interface';
import { HttpHelper } from 'src/app/services/implementations/api/helpers/http.helper';
import { IPaginateSearch } from 'src/app/shared/interfaces/paginate-search.interface';
import { FormDataHelper } from 'src/app/services/implementations/api/helpers/form-data.helper';

@Injectable()
export class ModelApiService implements IModelService {

  private _modelroute: string = '';
  get modelRoute(): string {
    return this._modelroute;
  }

  constructor(protected httpClient: HttpClient) { }

  setModelRoute(value: string): void {
    this._modelroute = `api/${value}`;
  }

  first(): Observable<IModelData> {
    return this.httpClient.get<IModelData>(`${this._modelroute}/first`);
  }

  get(id: number): Observable<IModelData> {
    return this.httpClient.get<IModelData>(`${this._modelroute}/${id}`);
  }

  insert(model: IModelData): Observable<IModelData> {
    const formData = FormDataHelper.fromObject(model);
    return this.httpClient.post<IModelData>(this._modelroute, formData);
  }

  update(model: IModelData): Observable<IModelData> {
    const formData = FormDataHelper.fromObject(model as any);
    return this.httpClient.post<IModelData>(`${this._modelroute}/${model.id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this._modelroute}/${id}`);
  }

  paginate(model: IPaginateSearch): Observable<ISearchResult> {
    const params = HttpHelper.objectToParams(model);
    return this.httpClient.get<ISearchResult>(this._modelroute, { params });
  }
}
