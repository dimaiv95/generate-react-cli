import { Config, ComponentTemplate, SetTemplate} from "../types";

import { setTemplate, getDataBasedOnCondition } from "../utils";

const getMainTemplate = (
  componentTemplate: ComponentTemplate,
  componentName: string,
  { useTypescript, withStyle, usePreprocessor }: Config
) => {
  const extComponent = getDataBasedOnCondition(useTypescript, "tsx", "jsx")
  const extStyle = getDataBasedOnCondition(!!usePreprocessor, usePreprocessor, "css");

  const template: SetTemplate = setTemplate({
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

export default getMainTemplate;