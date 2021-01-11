const { program } = require("commander");
const config = require("./config");
const generateComponent = require("./generateComponent");

module.exports = (argv) => {
  program
    .command("component [component...]")
    .option("-p, --path <path>", "", config.path)
    .option("--withStyle", "", config.withStyle)
    .option("--usePreprocessor <preprocessor>", "", config.usePreprocessor)
    .option("--useTypescript", "", config.useTypescript)
    .action((components, args) => {
      components.forEach(c => generateComponent(c, args));
    });

    program.parse(argv);
};