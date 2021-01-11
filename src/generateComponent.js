const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const { log, error } = console;

const { transform } = require("./utils");

const {
  componetJsFunction,
  componetTsFunction,
  componetStyle,
  componetIndex
} = require("./templates");

const {
  getMainTemplate,
  getIndexTemplate,
  getStyleTemplate
} = require("./actions");

const generateComponentTemplate = (componentName, args) => {
  const { withStyle, useTypescript } = args;

  const files = [];

  const componentMain = useTypescript ? componetTsFunction : componetJsFunction

  const templates = [
    getMainTemplate(componentMain, componentName, args),
    getIndexTemplate(componetIndex, componentName, args),
  ];

  if(withStyle){
    templates.push(getStyleTemplate(componetStyle, componentName, args))
  }

  templates.forEach(t => {
    files.push({
      template: transform(t.template, t.transform),
      fileName: t.fileName
    });
  });

  return files;
};

const generateComponent = (componentName, args) => {
  const { path: pathDir } = args;

  const componentTemplate = generateComponentTemplate(componentName, args);

  try{
    fse.emptyDirSync(path.join(pathDir, componentName));

    componentTemplate.forEach(component => {   
      fse.writeFileSync(path.join(pathDir, componentName, component.fileName), component.template);
    });

    log(chalk.cyan(`Component ${chalk.cyan.bold.underline(componentName)} was created`));

  }
  catch(e){
    error(chalk.red(e));
    process.exit(1)
  }
};

module.exports = generateComponent;