import { Observable } from 'rxjs';
import { IModelData } from '../../shared/interfaces/model-data.interface';
import { ISearchResult } from '../../shared/interfaces/search-result.interface';
import { IPaginateSearch } from '../../shared/interfaces/paginate-search.interface';

export interface IModelService {

  modelRoute: string;

  setModelRoute(value: string): void;

  first(): Observable<IModelData>;

  get(id: number): Observable<IModelData>;

  insert(model: Pick<IModelData, 'fields'>): Observable<IModelData>;

  update(model: IModelData): Observable<IModelData>;

  delete(id: number): Observable<void>;

  paginate(model: IPaginateSearch): Observable<ISearchResult>;
}
