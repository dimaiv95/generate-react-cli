const transform = (template, context) => template.replace(/\[(\w+)]/g, (_, name) => context[name]);

const setTransform = function({ from, to }) {
  this.transform[from] = to;

  return this;
};

const setTemplate = ({ template, fileName }) => {
  return {
    template,
    transform: {},
    fileName,
    setTransform
  };
};

const getExtention = (condition, expectExt, defaultExt) => condition ? expectExt : defaultExt;

exports.transform = transform;
exports.setTemplate = setTemplate;
exports.getExtention = getExtention;