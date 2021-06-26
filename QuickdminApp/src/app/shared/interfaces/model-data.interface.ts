import { IField } from "./field.interface";
import { IImageField } from "./image-field.interface";
import { ISelectField } from "./select-field.interface";

export interface IModelData {
  id: number;
  fields: (IField | IImageField | ISelectField)[];
}