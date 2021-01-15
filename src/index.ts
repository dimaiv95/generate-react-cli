import { program } from "commander";

import { Config } from "./types";

import config from "./config";
import generateComponent from "./generateComponent";

export = <T extends string[]>(argv: T): void => {
  program
    .command("component [component...]")
    .option("-p, --path <path>", "", config.path)
    .option("--withStyle", "", config.withStyle)
    .option("--usePreprocessor <preprocessor>", "", config.usePreprocessor)
    .option("--useTypescript", "", config.useTypescript)
    .action((components: string[], args: Config) => {
      components.forEach(c => generateComponent<Config>(c, args));
    });

    program.parse(argv);
};