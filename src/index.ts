import { program } from "commander";

import { Config } from "./types";

import config from "./config";
import generateComponent from "./generateComponent";

export = <T extends string[]>(argv: T): void => {
  program
    .command("component [component...]")
    .option("-p, --path <path>", "The path where you want the component to be generated.", config.path)
    .option("--withStyle", "Creates a stylesheet file with this component.", config.withStyle)
    .option("--usePreprocessor <preprocessor>", "Creates a stylesheet file used a preprocessor such as scss with this component.", config.usePreprocessor)
    .option("--useTypescript", "Creates the typescript component.", config.useTypescript)
    .option("--useTest <test>", "Creates test file with this component.", config.useTest)
    .action((components: string[], args: Config) => {
      components.forEach(c => generateComponent<Config>(c, args));
    });

    program.parse(argv);
};