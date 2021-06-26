import { IField } from "./field.interface";

export interface ISelectField extends IField {
  options: { label: string, value: any }[];
}