import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ModelFormComponent } from "./model-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TextFieldComponent } from "./fields/text-field/text-field.component";


@NgModule({
  declarations: [
    ModelFormComponent,
    TextFieldComponent,
  ],
  imports:[
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModelFormComponent,
    TextFieldComponent,
  ]
})
export class ModelFormModule { }