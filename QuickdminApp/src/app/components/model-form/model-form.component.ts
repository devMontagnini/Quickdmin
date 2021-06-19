import { Component, Input } from "@angular/core";
import { FieldTypeEnum } from "../../shared/enums/field-type.enum";
import { ModelFormControl } from "src/app/shared/helpers/model-form-control.helper";
import { ModelFormGroupHelper } from "src/app/shared/helpers/model-form-group.helper";

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.sass'],
})
export class ModelFormComponent {

  types = FieldTypeEnum;
  @Input('formGroup') formGroup!: ModelFormGroupHelper;

  getControls(): ModelFormControl[] {
    return Object
      .keys(this.formGroup.controls)
      .map((key) => this.formGroup.controls[key] as ModelFormControl);
  }
}