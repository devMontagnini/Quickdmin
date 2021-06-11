import { IPaginateSearch } from "./paginate-search.interface";
import { ISearchResultItem } from "./search-result-item.interface";


export interface ISearchResult {
  search: IPaginateSearch & { totalItems: number };
  resultItems: ISearchResultItem[];
}