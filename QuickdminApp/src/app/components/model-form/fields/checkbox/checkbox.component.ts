import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Component, forwardRef, Input } from "@angular/core";
import { ModelFormControl } from "../../../../shared/helpers/model-form-control.helper";

@Component({
  selector: 'mf-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    '../common/styles/mat-form-field.sass',
    './checkbox.component.sass'
  ],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
  }],
})
export class CheckboxComponent {
  @Input() control!: ModelFormControl;
}