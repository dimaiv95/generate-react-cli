import * as templates from "./templates";

type Templates<T> = T extends { [ key: string ]: infer U } ? U : never;

export type ComponentTemplate = Templates<typeof templates>;

export type TemplateParams = {
  template: ComponentTemplate,
  fileName: string
};

export type Transform = {
  [key: string]: string,
};

export type TransformParams = {
  from: string,
  to: string
};

export type SetTemplate = {
  template: ComponentTemplate,
  transform: Transform,
  fileName: string,
  setTransform(context: TransformParams): SetTemplate
};

export type File = {
  template: string,
  fileName: string
};

export type Config = {
  path: string,
  withStyle: boolean,
  usePreprocessor: string,
  useTypescript: boolean
};