import { IField } from "./field.interface";

export interface IImageField extends IField {
  filename: string;
  accepts: string[];
}