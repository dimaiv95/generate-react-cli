import { Config, ComponentTemplate, SetTemplate} from "../types";

import { setTemplate, getDataBasedOnCondition } from "../utils";

const getTestEnzymeTemplate = (
  componentTemplate: ComponentTemplate,
  componentName: string,
  { useTypescript }: Config
) => {
  const extTest = getDataBasedOnCondition(useTypescript, "tsx", "jsx");

  const template: SetTemplate = setTemplate({
    template: componentTemplate,
    fileName: `${componentName}.spec.${extTest}`
  });

  template
    .setTransform({
      from: "TemplateName",
      to: componentName
    })
    .setTransform({
      from: "ext",
      to: `.${extTest}`
    })

    return template;
};

export default getTestEnzymeTemplate;