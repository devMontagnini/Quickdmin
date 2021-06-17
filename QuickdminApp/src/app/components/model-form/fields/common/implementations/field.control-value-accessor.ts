import { ControlValueAccessor } from "@angular/forms";
import { IField } from "src/app/shared/interfaces/field.interface";

export abstract class FieldControlValueAccessor implements ControlValueAccessor {

  field!: IField;
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