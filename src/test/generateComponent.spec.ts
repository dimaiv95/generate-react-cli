import fse from "fs-extra";
import chalk from "chalk";

import config from '../config';
import generateComponent from "../generateComponent";

import { Config } from "../types";

describe("Create component", () => {
  const componentName = "Box";

  let emptyDirSync: jest.SpyInstance,
      writeFileSync: jest.SpyInstance,
      log: jest.SpyInstance,
      error: jest.SpyInstance,
      exit: jest.SpyInstance;

  
  const expectSuccess = (config: Config, writeFileHaveBeenCalledTimes: number) => {
    emptyDirSync.mockImplementation(args => args);
    writeFileSync.mockImplementation(args => args);

    const expectLog = chalk.cyan(`Component ${chalk.cyan.bold(componentName)} was created`)

    generateComponent(componentName, config);

    expect(emptyDirSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenCalledTimes(writeFileHaveBeenCalledTimes);

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(expectLog);
  };

  const expectError = (fn: jest.SpyInstance, errorMessage: string) => {
    fn.mockImplementation(() => { throw new Error(errorMessage); });

    const expectLog = chalk.red(`Error: ${errorMessage}`)

    generateComponent(componentName, config);
    expect(fn).toThrowError(errorMessage);
    
    expect(fn).toThrowError(errorMessage);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(expectLog);
  };

  beforeEach(() => {
    emptyDirSync = jest.spyOn(fse, "emptyDirSync");
    writeFileSync = jest.spyOn(fse, "writeFileSync");
    log = jest.spyOn(console, "log").mockImplementation(args => args);
    error = jest.spyOn(console, "error").mockImplementation(args => args);
    exit = jest.spyOn(process, "exit").mockImplementation((code) => code as never);
  });

  afterEach(() => {
    emptyDirSync.mockRestore();
    writeFileSync.mockRestore();
    log.mockRestore();
    error.mockRestore();
    exit.mockRestore();
  });

  describe("should create component successfully", () => {
    it("by default with 2 files", () => {
      expectSuccess(config, 2);
    });
  
    it("with flag withStyle with 3 files", () => {
      expectSuccess(
        {
          ...config,
          withStyle: true
        },
        3
      );
    });
  });

  it("should throw error during create folder for component", () => {
    expectError(emptyDirSync, "Fail creating folder");
  });

  it("should throw error during create files", () => {
    expectError(writeFileSync, "Fail creating files");
  });
  
})