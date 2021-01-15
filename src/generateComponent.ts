import path from "path";
import fse from "fs-extra";
import chalk from "chalk";

import { Config, File, ComponentTemplate, SetTemplate } from "./types";

import { transform } from "./utils";

import {
  ComponetJsFunction,
  ComponetTsFunction,
  ComponetStyle,
  ComponetIndex
} from "./templates";

import {
  getMainTemplate,
  getIndexTemplate,
  getStyleTemplate
} from "./actions";

const { log, error } = console;

const generateComponentTemplate = <A extends Config>(componentName: string, args: A): File[] => {
  const { withStyle, useTypescript } = args;

  const files: File[] = [];

  const ComponentMain: ComponentTemplate = useTypescript ? ComponetTsFunction : ComponetJsFunction

  const templates: SetTemplate[] = [
    getMainTemplate(ComponentMain, componentName, args),
    getIndexTemplate(ComponetIndex, componentName, args),
  ];

  if(withStyle){
    templates.push(getStyleTemplate(ComponetStyle, componentName, args))
  }

  templates.forEach(t => {
    files.push({
      template: transform(t.template, t.transform),
      fileName: t.fileName
    });
  });

  return files;
};

const generateComponent = <A extends Config>(componentName: string, args: A) => {
  const { path: pathDir } = args;

  const componentTemplate = generateComponentTemplate<A>(componentName, args);

  try{
    fse.emptyDirSync(path.join(pathDir, componentName));

    componentTemplate.forEach((component: File) => {   
      fse.writeFileSync(path.join(pathDir, componentName, component.fileName), component.template);
    });

    log(chalk.cyan(`Component ${chalk.cyan.bold.underline(componentName)} was created`));

  }
  catch(e){
    error(chalk.red(e));
    process.exit(1)
  }
};

export default generateComponent;