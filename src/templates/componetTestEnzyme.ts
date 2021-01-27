const ComponetTestEnzyme = `import React from "react";
import { shallow } from "enzyme";
import [TemplateName] from "./[TemplateName][ext]";

describe("<[TemplateName] />", () => {
  let component;

  beforeEach(() => {
    component = shallow(<[TemplateName] />);
  });

  it("It should mount", () => {
    expect(component.length).toBe(1);
  });
});
`;

type ComponetTestEnzyme = typeof ComponetTestEnzyme;

export default ComponetTestEnzyme;