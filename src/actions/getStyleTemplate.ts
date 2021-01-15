import { Config, ComponentTemplate, SetTemplate} from "../types";

import { setTemplate, getExtention } from "../utils";

const getStyleTemplate = (
  componentTemplate: ComponentTemplate,
  componentName: string,
  { usePreprocessor }: Config
) => {
  const extStyle = getExtention(!!usePreprocessor, usePreprocessor, "css");

  const template: SetTemplate = setTemplate({
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

export default getStyleTemplate;