import {
  ComponetJsFunction,
  ComponetTsFunction,
  ComponetIndex,
  ComponetStyle
} from "./templates";

export type ComponentTemplate = ComponetJsFunction | ComponetTsFunction | ComponetIndex | ComponetStyle;

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