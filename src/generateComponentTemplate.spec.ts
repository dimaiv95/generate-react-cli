import config from './config';
import { generateComponentTemplate } from "./generateComponent";
import {
  templatesDefault,
  templatesWithTypescript,
  templatesWithStyle,
  templatesWithPreprocessor
} from "./test/expectTemplates";

import { File } from "./types";

const expectFiles = (recieveFiles: File[], expectFiles: File[]) => {
  expect(recieveFiles).toHaveLength(recieveFiles.length);
  recieveFiles.forEach((f, i) => expect(f).toEqual(expectFiles[i]))
};

describe("Generate templates", () => {
  it("should be 2 template files by default", () => {
    const result = generateComponentTemplate("Box", config);

    expectFiles(result, templatesDefault);
  });

  it("should be 3 template files with flag useTypescript", () => {
    const result = generateComponentTemplate("Box", { ...config, useTypescript: true });

    expectFiles(result, templatesWithTypescript);
  });

  it("should be 3 template files with flag withStyle", () => {
     const result = generateComponentTemplate("Box", { ...config, withStyle: true });

     expectFiles(result, templatesWithStyle);
  });

  it("should be 3 template files with flag withStyle and usePreprocessor", () => {
    const result = generateComponentTemplate("Box", { ...config, withStyle: true, usePreprocessor: "scss" });

    expectFiles(result, templatesWithPreprocessor);
  });
});