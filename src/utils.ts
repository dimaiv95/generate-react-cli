import {
  ComponentTemplate,
  SetTemplate,
  TemplateParams,
  TransformParams,
  Transform,
} from "./types";

const transform = (template: ComponentTemplate, context: Transform) => template.replace(/\[(\w+)]/g, (_, name) => context[name]);

const toCorrectName = (str: string): string => str.replace(/[-\.\{\}\(\)\=\+\*\@\!\#\^\`\~\&\%\'\"\:\;]/g, () => "");

const setTemplate = ({ template, fileName }: TemplateParams): SetTemplate => {
  return {
    template,
    transform: {},
    fileName,
    setTransform({ from, to }: TransformParams): SetTemplate {
      this.transform[from] = to;
    
      return this;
    }
  };
};

const getDataBasedOnCondition = <T, U>(
  condition: boolean,
  expectRes: T,
  defaultRes: U
): T | U => condition ? expectRes : defaultRes;

export {
  transform,
  toCorrectName,
  setTemplate,
  getDataBasedOnCondition
};