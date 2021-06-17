import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Component, forwardRef } from "@angular/core";
import { FieldControlValueAccessor } from "../common/implementations/field.control-value-accessor";

@Component({
  inputs: ['field'],
  selector: 'mf-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['../common/styles/mat-form-field.sass'],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextFieldComponent),
  }],
})
export class TextFieldComponent extends FieldControlValueAccessor { }