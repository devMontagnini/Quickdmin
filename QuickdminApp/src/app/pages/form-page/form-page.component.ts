import { Location } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModelRoutes } from "../../routing/model-routes";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { MODEL_SERVICE_TOKEN } from "../../services/constants";
import { IField } from "../../shared/interfaces/field.interface";
import { IModelData } from "../../shared/interfaces/model-data.interface";
import { IModelService } from "../../services/interface/model.service.interface";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.sass'],
})
export class FormPageComponent {

  submittingForm = false;
  modelData?: IModelData;
  modelRoute: string = '';
  modelHasListPage = false;
  identifierRoute: string = '';
  submitErrorMessage: string = '';
  modelDataForm = new FormGroup({ });
  layoutMode: 'loadingModelData' | 'loadModelDataError' | 'showForm' = 'loadingModelData';

  constructor(
    public location: Location,
    private activateRoute: ActivatedRoute,
    @Inject(MODEL_SERVICE_TOKEN) private apiService: IModelService,
  ) {
    this.activateRoute.url.subscribe((value: UrlSegment[]) => {
      this.modelRoute = value[0].path;
      this.identifierRoute = value[1]?.path;
      this.apiService.setModelRoute(this.modelRoute);
      this.modelHasListPage = ModelRoutes.some(c => c.path === this.modelRoute && c.hasMany);
      this.loadModel();
    });
  }

  getTitle(): string {
    const modelRoute = ModelRoutes.find(c => c.path === this.modelRoute);
    return `Cadastrar ${modelRoute?.title || ''}`;
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
    this.modelData?.fields.forEach((field: IField) => {
      const value = field.value || field.defaultValue;
      this.modelDataForm.addControl(field.name, new FormControl(value));
    });
  }

  onBackPage(event: Event) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.submittingForm = true;
    this.submitErrorMessage = '';
    const data = this.modelDataForm.value;
  }
}