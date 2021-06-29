import { IField } from "./fields/field.interface";
import { IImageField } from "./fields/image-field.interface";
import { ISelectField } from "./fields/select-field.interface";

export interface IModelData {
  id: number;
  fields: (IField | IImageField | ISelectField)[];
}