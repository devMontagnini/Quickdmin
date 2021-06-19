import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Component, forwardRef, Input } from "@angular/core";
import { ModelFormControl } from "../../../../shared/helpers/model-form-control.helper";

@Component({
  selector: 'mf-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: [
    '../common/styles/mat-form-field.sass',
    './textarea.component.sass'
  ],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
  }],
})
export class TextareaComponent {
  @Input() control!: ModelFormControl;
}