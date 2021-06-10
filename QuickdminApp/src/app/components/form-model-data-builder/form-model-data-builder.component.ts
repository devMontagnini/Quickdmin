import { Component, Input } from "@angular/core";
import { IModelData } from "src/app/interfaces/model-data.interface";

@Component({
  selector: 'app-form-model-data-builder',
  templateUrl: './form-model-data-builder.component.html',
  styleUrls: ['./form-model-data-builder.component.sass'],
})
export class FormModelDataBuilderComponent {
  @Input('modelData') modelData?: IModelData;
}