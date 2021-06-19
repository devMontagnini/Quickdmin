import { FieldTypeEnum } from "../enums/field-type.enum";

export interface IField {
  value: any;
  name: string;
  label: string;
  hidden?: boolean;
  required?: boolean;
  defaultValue?: any;
  type: FieldTypeEnum;
  nonEditable?: boolean;
  options?: { label: string, value: any }[];
}