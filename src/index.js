const { program } = require("commander");
const generateComponent = require("./generateComponent");

module.exports = (argv) => {
  program
    .command("component [component...]")
    .option("-p, --path <path>", "")
    .action((components, args) => {
      components.forEach(c => generateComponent(c, args));
    });

  program.parse(argv);
};