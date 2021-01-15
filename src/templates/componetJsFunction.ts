const ComponetJsFunction = `import React from "react";
[importStyle]
const [TemplateName] = () => (
  <div[className]></div>
);

export default [TemplateName];
`;

type ComponetJsFunction = typeof ComponetJsFunction;

export default ComponetJsFunction;