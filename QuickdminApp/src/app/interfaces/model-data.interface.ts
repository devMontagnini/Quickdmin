import { StructureTypeEnum } from "../enums/structure-type.enum";

export interface IModelData {
  data: any;
  structure: { 
    [key: string]: {
      hidden: boolean,
      required: boolean,
      defaultValue: any,
      type: StructureTypeEnum,
    }
  };
}