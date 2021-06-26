import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ModelFormComponent } from "./model-form.component";
import { TextComponent } from "./fields/text/text.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SelectComponent } from "./fields/select/select.component";
import { UploadComponent } from "./fields/upload/upload.component";
import { CheckboxComponent } from "./fields/checkbox/checkbox.component";
import { TextareaComponent } from "./fields/textarea/textarea.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    TextComponent,
    SelectComponent,
    UploadComponent,
    CheckboxComponent,
    TextareaComponent,
    ModelFormComponent,
  ],
  imports:[
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    TextComponent,
    UploadComponent,
    SelectComponent,
    CheckboxComponent,
    TextareaComponent,
    ModelFormComponent,
  ]
})
export class ModelFormModule { }