import { Config, ComponentTemplate, SetTemplate} from "../types";

import { setTemplate, getDataBasedOnCondition } from "../utils";

const getStyleTemplate = (
  componentTemplate: ComponentTemplate,
  componentName: string,
  { usePreprocessor }: Config
) => {
  const extStyle = getDataBasedOnCondition(!!usePreprocessor, usePreprocessor, "css");

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