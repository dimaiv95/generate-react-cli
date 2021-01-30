import config from '../config';
import { generateComponentTemplate } from "../generateComponent";
import {
  templatesDefault,
  templatesWithTypescript,
  templatesWithStyle,
  templatesWithPreprocessor
} from "./fixture";

import { File } from "../types";

const expectFiles = (receiveFiles: File[], expectFiles: File[], length: number) => {
  expect(receiveFiles).toHaveLength(length);

  receiveFiles.forEach((f, i) => expect(f).toEqual(expectFiles[i]))
};

describe("Generate templates", () => {
  it("should be 2 template files by default", () => {
    const result = generateComponentTemplate("Box", config);

    expectFiles(result, templatesDefault, 2);
  });

  it("should be 3 template files with flag useTypescript", () => {
    const result = generateComponentTemplate("Box", { ...config, useTypescript: true });

    expectFiles(result, templatesWithTypescript, 2);
  });

  it("should be 3 template files with flag withStyle", () => {
     const result = generateComponentTemplate("Box", { ...config, withStyle: true });

     expectFiles(result, templatesWithStyle, 3);
  });

  it("should be 3 template files with flag withStyle and usePreprocessor", () => {
    const result = generateComponentTemplate("Box", { ...config, withStyle: true, usePreprocessor: "scss" });

    expectFiles(result, templatesWithPreprocessor, 3);
  });
});
