export interface ISchema {
  deck: number;
  keys: number;
  duals: number;
}

export interface IContent {
  deck: number;
  keys: string[][];
  duals: string[][];
}

export interface PagesSchemaKneeFest {
  iSchema: ISchema;
  iContent: IContent[];
}
