import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FieldTypeEnum } from '../../../shared/enums/field-type.enum';
import { IModelService } from '../../interface/model.service.interface';
import { IModelData } from '../../../shared/interfaces/model-data.interface';
import { ISearchResult } from '../../../shared/interfaces/search-result.interface';
import { IPaginateSearch } from '../../../shared/interfaces/paginate-search.interface';

@Injectable()
export class ModelMockService implements IModelService {

  private _modelroute: string = '';
  get modelRoute(): string {
    return this._modelroute;
  }

  private modelListMock: IModelData[] = [];

  constructor() {
    this.modelListMock = this.generateMockItems(10);
  }

  private generateMockItems(length: number): IModelData[] {
    const nonNegativeLength = length < 1 ? 0 : length;
    return Array.from(Array(nonNegativeLength).keys())
      .map(key => ({
        id: (key + 1),
        fields: [
          {
            name: 'name',
            label: 'Nome',
            required: true,
            type: FieldTypeEnum.simpleText,
            value: `Registro Maneiro ${key + 1}`,
          },
          {
            name: 'createdAt',
            label: 'Data de registro',
            type: FieldTypeEnum.simpleText,
            value: new Date().toDateString(),
            nonEditable: true,
          }
        ]
      }));
  }

  setModelRoute(value: string): void {
    this._modelroute = value;
  }

  first(): Observable<IModelData> {
    return new Observable<IModelData>((subscriber) => 
      subscriber.next(this.modelListMock[0])
    );
  }

  get(id: number): Observable<IModelData> {
    return new Observable<IModelData>((subscriber) => 
      subscriber.next(this.modelListMock.find(c => c.id === id))
    );
  }

  insert(model: Pick<IModelData, 'fields'>): Observable<IModelData> {
    return new Observable<IModelData>((subscriber) => {
      const newModelMock = { ...model, id: Date.now() };
      this.modelListMock.push(newModelMock);
      subscriber.next(newModelMock);
    });
  }

  update(model: IModelData): Observable<IModelData> {
    return new Observable<IModelData>((subscriber) => {
      const registeredModelMock = this.modelListMock.find(c => c.id === model.id);
      if (!registeredModelMock) {
        throw new Error("Registro não encontrado");
      }

      const editableFields = model.fields.filter(c => !c.nonEditable);
      registeredModelMock.fields.forEach(field => {
        const editableFieldMatched = editableFields.find(ec => ec.name === field.name);
        if (editableFieldMatched) {
          field.value = editableFieldMatched.value;
        }
      });
      subscriber.next(registeredModelMock);
    });
  }

  delete(id: number): Observable<void> {
    return new Observable<void>((subscriber) => {
      const registeredModelMockIndex = this.modelListMock.findIndex(c => c.id === id);
      this.modelListMock.splice(registeredModelMockIndex, 1);
      subscriber.next();
    });
  }

  paginate(paginate: IPaginateSearch): Observable<ISearchResult> {
    return new Observable<ISearchResult>((subscriber) => {
      const skipNumber = paginate.pageIndex * paginate.itemsByPage;
      const searchTerm = (paginate.searchTerm || '').trim().toLocaleLowerCase();

      let totalItems = 0;
      const items = this.modelListMock
        .filter(c => {
          const itemNameField = c.fields.find(field => field.name === 'name');
          const itemNameValue = itemNameField?.value?.toLocaleLowerCase();
          const matched = itemNameValue.indexOf(searchTerm) > -1;
          if (matched) totalItems++;
          return matched;
        })
        .slice(skipNumber, skipNumber + paginate.itemsByPage);
        
      subscriber.next({
        search: { ...paginate, totalItems },
        resultItems: items.map(c => ({ 
          id: c.id,
          name: c.fields.find(field => field.name === 'name')?.value,
          createdAt: c.fields.find(field => field.name === 'createdAt')?.value,
         })), 
      });
    });
  }
}
