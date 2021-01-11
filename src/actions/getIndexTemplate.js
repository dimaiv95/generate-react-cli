const { setTemplate, getExtention } = require("../utils");

const getIndexTemplate = (componentTemplate, componentName, { useTypescript }) => {
  const extIndex = getExtention(useTypescript, "ts", "js");
  const extComponent = getExtention(useTypescript, "tsx", "jsx");

  const template = setTemplate({
    template: componentTemplate,
    fileName: `index.${extIndex}`
  });

  template
    .setTransform({
      from: "importComponent",
      to: `import ${componentName} from "./${componentName}.${extComponent}";\n\r`
    })
    .setTransform({
      from: "exportComponent",
      to: `export default ${componentName}`
    });

    return template;
};

module.exports = getIndexTemplate;