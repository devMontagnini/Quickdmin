import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Component, forwardRef, Input } from "@angular/core";
import { ModelFormControl } from "../../../../shared/helpers/model-form-control.helper";

@Component({
  selector: 'mf-select',
  templateUrl: './select.component.html',
  styleUrls: ['../common/styles/mat-form-field.sass'],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
  }],
})
export class SelectComponent {
  @Input() control!: ModelFormControl;
}