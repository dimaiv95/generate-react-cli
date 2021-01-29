import path from "path";
import fse from "fs-extra";
import chalk from "chalk";

import { Config, File, ComponentTemplate, SetTemplate } from "./types";

import { transform, toCorrectName, getDataBasedOnCondition } from "./utils";

import {
  ComponetJsFunction,
  ComponetTsFunction,
  ComponetStyle,
  ComponetIndex,
  ComponetTestEnzyme
} from "./templates";

import {
  getMainTemplate,
  getIndexTemplate,
  getStyleTemplate,
  getTestEnzymeTemplate
} from "./actions";

export const generateComponentTemplate = <A extends Config>(componentName: string, args: A): File[] => {
  const { withStyle, useTypescript, useTest } = args;

  const files: File[] = [];

  const ComponentMain: ComponentTemplate = getDataBasedOnCondition(useTypescript, ComponetTsFunction, ComponetJsFunction)

  const templates: SetTemplate[] = [
    getMainTemplate(ComponentMain, componentName, args),
    getIndexTemplate(ComponetIndex, componentName, args),
  ];

  if(withStyle){
    templates.push(getStyleTemplate(ComponetStyle, componentName, args));
  }

  if(useTest === "enzyme"){
    templates.push(getTestEnzymeTemplate(ComponetTestEnzyme, componentName, args));
  }

  templates.forEach(t => {
    files.push({
      template: transform(t.template, t.transform),
      fileName: t.fileName
    });
  });

  return files;
};

const generateComponent = <A extends Config>(name: string, args: A) => {
  const { path: pathDir } = args;

  const componentName = toCorrectName(name);

  const componentTemplate = generateComponentTemplate<A>(componentName, args);

  try{
    fse.emptyDirSync(path.join(pathDir, componentName));

    componentTemplate.forEach((component: File) => {   
      fse.writeFileSync(path.join(pathDir, componentName, component.fileName), component.template);
    });

    console.log(chalk.cyan(`Component ${chalk.cyan.bold(componentName)} was created`));
  }
  catch(e){
    console.error(chalk.red(e));
    process.exit(1)
  }
};

export default generateComponent;