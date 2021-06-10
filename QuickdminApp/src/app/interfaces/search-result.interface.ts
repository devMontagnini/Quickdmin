import { ISearchResultItem } from "./search-result-item.interface";
import { PaginateSearchModel } from "../models/paginate-search.model";

export interface ISearchResult {
  search: PaginateSearchModel & { totalItems: number };
  resultItems: ISearchResultItem[];
}