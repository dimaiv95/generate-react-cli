const { setTemplate, getExtention } = require("../utils");

const getStyleTemplate = (componentTemplate, componentName, { usePreprocessor }) => {
  const extStyle = getExtention(usePreprocessor, usePreprocessor, "css");

  const template = setTemplate({
    template: componentTemplate,
    fileName: `${componentName}.${extStyle}`
  });

  template
    .setTransform({
      from: "TemplateName",
      to: componentName
    })

    return template;
};

module.exports = getStyleTemplate;