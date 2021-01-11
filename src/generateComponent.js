const path = require("path");
const fse = require("fs-extra");

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

    console.log(`Component ${componentName} was created`);
  }
  catch(e){
    console.error(e);
    process.exit(1)
  }
};

module.exports = generateComponent;