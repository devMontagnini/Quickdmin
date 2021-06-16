import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { IField } from "../../../../shared/interfaces/field.interface";

@Component({
  selector: 'app-simple-text-field',
  templateUrl: './simple-text-field.component.html',
  styleUrls: ['./simple-text-field.component.sass'],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SimpleTextFieldComponent),
  }]
})
export class SimpleTextFieldComponent implements ControlValueAccessor {

  @Input('field') field!: IField;
  onChangePropagation = (value: string) => { };
  onTouchedPropagation = () => { };

  writeValue(value: string): void {
    this.field.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangePropagation = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedPropagation = fn;
  }

  onChange(event: Event): void {
    const value = (event.target as any).value;
    this.onChangePropagation(value);
  }

}