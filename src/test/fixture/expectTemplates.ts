export const templatesDefault = [
  {
    template: 'import React from "react";\n' +
      '\n' +
      'const Box = () => (\n' +
      '  <div>Box Component</div>\n' +
      ');\n' +
      '\n' +
      'export default Box;\n',
    fileName: 'Box.jsx'
  },
  {
    template: 'import Box from "./Box.jsx";\n\r\nexport default Box;\n',
    fileName: 'index.js'
  }
];

export const templatesWithTypescript = [
  {
    template: 'import React from "react";\n' +
      '\n' +
      'const Box: React.FC = () => (\n' +
      '  <div>Box Component</div>\n' +
      ');\n' +
      '\n' +
      'export default Box;\n',
    fileName: 'Box.tsx'
  },
  {
    template: 'import Box from "./Box.tsx";\n\r\nexport default Box;\n',
    fileName: 'index.ts'
  }
];

export const templatesWithStyle = [
  {
    template: 'import React from "react";\n' +
      'import "./Box.css";\n' +
      '\r\n' +
      'const Box = () => (\n' +
      '  <div className="Box">Box Component</div>\n' +
      ');\n' +
      '\n' +
      'export default Box;\n',
    fileName: 'Box.jsx'
  },
  {
    template: 'import Box from "./Box.jsx";\n\r\nexport default Box;\n',
    fileName: 'index.js'
  },
  { template: '.Box{}', fileName: 'Box.css' }
];

export const templatesWithPreprocessor = [
  {
    template: 'import React from "react";\n' +
      'import "./Box.scss";\n' +
      '\r\n' +
      'const Box = () => (\n' +
      '  <div className="Box">Box Component</div>\n' +
      ');\n' +
      '\n' +
      'export default Box;\n',
    fileName: 'Box.jsx'
  },
  {
    template: 'import Box from "./Box.jsx";\n\r\nexport default Box;\n',
    fileName: 'index.js'
  },
  { template: '.Box{}', fileName: 'Box.scss' }
];

export const templatesWithUseTestEnzyme = [
  {
    template: 'import React from "react";\n' +
      '\n' +
      'const Box = () => (\n' +
      '  <div>Box Component</div>\n' +
      ');\n' +
      '\n' +
      'export default Box;\n',
    fileName: 'Box.jsx'
  },
  {
    template: 'import Box from "./Box.jsx";\n\r\nexport default Box;\n',
    fileName: 'index.js'
  },
  {
    template: 'import React from "react";\n' + 
      'import { shallow } from "enzyme";\n' +
      'import Box from "./Box.jsx";\n' +
      '\n' +
      'describe("<Box />", () => {\n' +
      '  let component;\n\n' + 
      '  beforeEach(() => {\n' + 
      '    component = shallow(<Box />);\n' + 
      '  });\n' + 
      '\n' +
      '  it("It should mount", () => {\n' + 
      '    expect(component.length).toBe(1);\n' + 
      '  });\n' + 
      '});\n',
    fileName: 'Box.spec.jsx'
  }
];
