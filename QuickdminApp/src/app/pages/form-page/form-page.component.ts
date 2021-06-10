import { Component, ElementRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { BaseApiService } from "src/app/services/base.service";
import { EntityRoutes } from "src/app/routing/entity-routes";
import { IModelData } from "src/app/interfaces/model-data.interface";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.sass'],
})
export class FormPageComponent {

  submittingForm = false;
  modelData?: IModelData;
  entityRoute: string = '';
  identifierRoute: string = '';
  modelForm = new FormGroup({ });
  submitErrorMessage: string = '';
  layoutMode: 'loadingModelData' | 'loadModelDataError' | 'showForm' = 'loadingModelData';
  entityHasListPage = false;

  @ViewChild('formDom') formDom?: ElementRef;

  constructor(
    public location: Location,
    private apiService: BaseApiService,
    private activateRoute: ActivatedRoute,
  ) {
    this.activateRoute.url.subscribe((value: UrlSegment[]) => {
      this.entityRoute = value[0].path;
      this.identifierRoute = value[1]?.path;
      this.apiService.setEntityRoute(this.entityRoute);
      this.entityHasListPage = EntityRoutes.some(c => c.path === this.entityRoute && c.hasMany);
      this.loadModel();
    });
  }

  getTitle(): string {
    const entity = EntityRoutes.find(c => c.path === this.entityRoute);
    return `Cadastrar ${entity?.title || ''}`;
  }

  loadModel(): void {
    this.layoutMode = 'loadingModelData';
    const request = this.identifierRoute === 'first' ? 
      this.apiService.first() : 
      this.apiService.get(parseInt(this.identifierRoute));

    request.subscribe(
      (modelData) => {
        this.modelData = modelData;
        this.setupForm();
        this.layoutMode = 'showForm';
      },
      (error) => this.layoutMode = 'loadModelDataError',
    )
  }

  setupForm(): void {
    const structure = this.modelData!.structure;
    Object.keys(structure).forEach((key: string) => {
      const defaultValue = structure[key].defaultValue;
      this.modelForm.addControl(key, new FormControl(defaultValue));
    });
  }

  onBackPage(event: Event) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit  () { }
}