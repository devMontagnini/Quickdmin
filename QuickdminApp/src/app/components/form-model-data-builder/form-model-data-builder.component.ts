import { Component, Input } from "@angular/core";
import { IField } from "../../shared/interfaces/field.interface";
import { FieldTypeEnum } from "../../shared/enums/field-type.enum";

@Component({
  selector: 'app-form-model-data-builder',
  templateUrl: './form-model-data-builder.component.html',
  styleUrls: ['./form-model-data-builder.component.sass'],
})
export class FormModelDataBuilderComponent {
  types = FieldTypeEnum;
  @Input('fields') fields: IField[] = [];
}