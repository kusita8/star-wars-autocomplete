import { render } from "@testing-library/react";
import { getStarWarsPersons } from "../../../../services/__mocks__/starWarsPersons";
import { ListItem } from "../ListItem";

describe("ListItem", () => {
  test("it should match the snapshot", async () => {
    const { asFragment } = render(<ListItem person={(await getStarWarsPersons()).results[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
