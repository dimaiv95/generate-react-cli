const fse = require("fs-extra");

const componetJsFunction = require("./templates/componetJsFunction");
const componetTsFunction = require("./templates/componetTsFunction");
const componetIndex = require("./templates/componetIndex");
const componetStyle = require("./templates/componetStyle");

const getComponentTemplate = (useTypescript) => useTypescript ? componetTsFunction : componetJsFunction;

const transform = (template, context) => template.replace(/\[(\w+)]/g, (_, name) => context[name]);

const setTransform = function({ key, value }) {
  this.transform[key] = value;

  return this;
};

const setTemplate = ({ template, fileName }) => {
  return {
    template,
    transform: {},
    fileName,
    setTransform
  };
};

const getExtention = (condition, expectExt, defaultExt) => condition ? expectExt : defaultExt;

const getMainTemplate = (componentName, { useTypescript, withStyle, usePreprocessor }) => {
  const extComponent = getExtention(useTypescript, "tsx", "jsx")
  const extStyle = getExtention(usePreprocessor, usePreprocessor, "css");

  const componentTemplate = getComponentTemplate(useTypescript);

  const template = setTemplate({
    template: componentTemplate,
    fileName: `${componentName}.${extComponent}`
  });

  template
    .setTransform({
      key: "TemplateName",
      value: componentName
    })
    .setTransform({
      key: "importStyle",
      value: ""
    })
    .setTransform({
      key: "className",
      value: ""
    });

    if(withStyle){
      template
        .setTransform({
          key: "importStyle",
          value: `import "./${componentName}.${extStyle}";\n\r`
        })
        .setTransform({
          key: "className",
          value: ` className="${componentName}"`
        });
    }
      
    return template;
};

const getIndexTemplate = (componentName, { useTypescript }) => {
  const extIndex = getExtention(useTypescript, "ts", "js");
  const extComponent = getExtention(useTypescript, "tsx", "jsx");

  const template = setTemplate({
    template: componetIndex,
    fileName: `index.${extIndex}`
  });

  template
    .setTransform({
      key: "importComponent",
      value: `import ${componentName} from "./${componentName}.${extComponent}";\n\r`
    })
    .setTransform({
      key: "exportComponent",
      value: `export default ${componentName}`
    });

    return template;
};

const getStyleTemplate = (componentName, { usePreprocessor }) => {
  const extStyle = getExtention(usePreprocessor, usePreprocessor, "css");

  const template = setTemplate({
    template: componetStyle,
    fileName: `${componentName}.${extStyle}`
  });

  template
    .setTransform({
      key: "TemplateName",
      value: componentName
    })

    return template;
};

const generateComponentTemplate = (componentName, args) => {
  const { withStyle } = args;

  const files = [];

  const templates = [
    getMainTemplate(componentName, args),
    getIndexTemplate(componentName, args),
  ];

  if(withStyle){
    templates.push(getStyleTemplate(componentName, args))
  }

  templates.forEach(t => {
    files.push({
      template: transform(t.template, t.transform),
      fileName: t.fileName
    });
  });

  return files;
};

const generateComponent = (componentName, ...args) => {
  const { path } = args[0];

  const componentTemplate = generateComponentTemplate(componentName, ...args);

  try{
    fse.emptyDirSync(`${path}/${componentName}`);

    componentTemplate.forEach(component => {   
      fse.writeFileSync(`${path}/${componentName}/${component.fileName}`, component.template);
    });
  }
  catch(e){
    console.error(e);
    process.exit(1)
  }
};

module.exports = generateComponent;