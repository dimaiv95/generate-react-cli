import { Config, ComponentTemplate, SetTemplate} from "../types";

import { setTemplate, getDataBasedOnCondition } from "../utils";

const getIndexTemplate = (
  componentTemplate: ComponentTemplate,
  componentName: string,
  { useTypescript }: Config
) => {
  const extIndex = getDataBasedOnCondition(useTypescript, "ts", "js");
  const extComponent = getDataBasedOnCondition(useTypescript, "tsx", "jsx");

  const template: SetTemplate = setTemplate({
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

export default getIndexTemplate;