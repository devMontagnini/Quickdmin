import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ModelFormComponent } from "./model-form.component";
import { TextComponent } from "./fields/text/text.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SelectComponent } from "./fields/select/select.component";
import { CheckboxComponent } from "./fields/checkbox/checkbox.component";
import { TextareaComponent } from "./fields/textarea/textarea.component";


@NgModule({
  declarations: [
    TextComponent,
    SelectComponent,
    CheckboxComponent,
    TextareaComponent,
    ModelFormComponent,
  ],
  imports:[
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    TextComponent,
    SelectComponent,
    CheckboxComponent,
    TextareaComponent,
    ModelFormComponent,
  ]
})
export class ModelFormModule { }