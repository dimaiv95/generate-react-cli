const { setTemplate, getExtention } = require("../utils");

const getMainTemplate = (componentTemplate, componentName, { useTypescript, withStyle, usePreprocessor }) => {
  const extComponent = getExtention(useTypescript, "tsx", "jsx")
  const extStyle = getExtention(usePreprocessor, usePreprocessor, "css");

  const template = setTemplate({
    template: componentTemplate,
    fileName: `${componentName}.${extComponent}`
  });

  template
    .setTransform({
      from: "TemplateName",
      to: componentName
    })
    .setTransform({
      from: "importStyle",
      to: ""
    })
    .setTransform({
      from: "className",
      to: ""
    });

    if(withStyle){
      template
        .setTransform({
          from: "importStyle",
          to: `import "./${componentName}.${extStyle}";\n\r`
        })
        .setTransform({
          from: "className",
          to: ` className="${componentName}"`
        });
    }
      
    return template;
};

module.exports = getMainTemplate;