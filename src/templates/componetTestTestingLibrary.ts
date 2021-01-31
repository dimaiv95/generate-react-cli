const ComponetTestTestingLibrary = `import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import [TemplateName] from "./[TemplateName][ext]";

describe("<[TemplateName] />", () => {
  test("It should mount", () => {
    render(<[TemplateName] />);

    const templateText = screen.getByText("[TemplateName] Component");

    expect(templateText).toBeInTheDocument();
  });
});`;

type ComponetTestTestingLibrary = typeof ComponetTestTestingLibrary;

export default ComponetTestTestingLibrary;