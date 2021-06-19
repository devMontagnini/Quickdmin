import { IField } from "../interfaces/field.interface";
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class ModelFormControl extends FormControl {
  constructor(
    public field: IField,
    formState?: any, 
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, 
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}