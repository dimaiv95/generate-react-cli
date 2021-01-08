const { program } = require("commander");

module.exports = (argv) => {
  program
    .command("component <component> [components...]")
    .action((component, components) => {
      console.log( component, components);
    });

  program.parse(argv);
};