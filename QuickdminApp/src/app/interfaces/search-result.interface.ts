import { SearchResultItem } from "./search-result-item.model";
import { PaginateSearchModel } from "../models/paginate-search.model";

export interface SearchResult {
  search: PaginateSearchModel & { totalItems: number };
  resultItems: SearchResultItem[];
}