const fse = require("fs-extra");
const config = require("./config");

const jsFunctionComponent = require("./templates/jsFunctionComponent");

const setComponentName = (component, name) => component.replace(/TemplateName/g, name);

const generateComponent = (component, {
    path = config.path
  }) => {

  try{
    fse.emptyDirSync(`${path}/${component}`);
    fse.writeFileSync(`${path}/${component}/${component}.js`, setComponentName(jsFunctionComponent, component));
  }
  catch(e){
    console.error(e);
    process.exit(1)
  }

};

module.exports = generateComponent;