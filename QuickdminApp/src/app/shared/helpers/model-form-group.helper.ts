import { IField } from "../interfaces/field.interface";
import { IModelData } from "../interfaces/model-data.interface";
import { ModelFormControl } from "./model-form-control.helper";
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class ModelFormGroupHelper extends FormGroup {

  modelData?: IModelData;

  constructor(
    controls: { [key: string]: AbstractControl; },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  setModelData(modelData: IModelData): void {
    this.modelData = modelData;
    this.addModelControls();
  }

  private addModelControls() {
    this.modelData?.fields.forEach((field: IField) => {
      const value = field.value || field.defaultValue;
      const validators = field.required ? [Validators.required] : [];
      this.addControl(field.name, new ModelFormControl(field, value, validators,));
    });
  }

}