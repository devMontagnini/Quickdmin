import { Component, Input } from "@angular/core";
import { IField } from "../../../../shared/interfaces/field.interface";

@Component({
  selector: 'app-simple-text-field',
  templateUrl: './simple-text-field.component.html',
  styleUrls: ['./simple-text-field.component.sass'],
})
export class SimpleTextFieldComponent {
  @Input('field') field!: IField;
}