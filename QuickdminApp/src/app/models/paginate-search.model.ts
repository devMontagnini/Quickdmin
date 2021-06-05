export class PaginateSearchModel {
  constructor(
    public pageIndex: number = 0,
    public itemsByPage: number = 5,
    public searchTerm?: string,
  ) { }
}