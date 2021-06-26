import { IField } from "../interfaces/field.interface";
import { IImageField } from "../interfaces/image-field.interface";
import { ISelectField } from "../interfaces/select-field.interface";
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class ModelFormControl extends FormControl {
  constructor(
    public field: IField | IImageField | ISelectField,
    formState?: any, 
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, 
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}