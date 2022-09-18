import { render } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  test("it should match the snapshot", () => {
    const { asFragment } = render(<Input label="hola mundo" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
