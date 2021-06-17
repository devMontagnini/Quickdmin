import { Component, Input } from "@angular/core";
import { FieldTypeEnum } from "../../shared/enums/field-type.enum";
import { ModelFormGroupHelper } from "src/app/shared/helpers/model-form-group.helper";

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.sass'],
})
export class ModelFormComponent {
  types = FieldTypeEnum;
  @Input('formGroup') formGroup!: ModelFormGroupHelper;
}