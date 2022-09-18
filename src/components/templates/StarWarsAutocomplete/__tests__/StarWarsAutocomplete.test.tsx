import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StarWarsAutocomplete } from "../StarWarsAutocomplete";
import * as service from "../../../../services/starWarsPersons";
import { getStarWarsPersons } from "../../../../services/__mocks__/starWarsPersons";

describe("StarWarsAutocomplete", () => {
  test("it should match the snapshot", async () => {
    const { asFragment } = render(<StarWarsAutocomplete />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test("it should search persons and highlight text", async () => {
    const mockGetStarWarsPersons = jest.fn(getStarWarsPersons);
    const spy = jest
      .spyOn(service, "getStarWarsPersons")
      .mockImplementation(mockGetStarWarsPersons);

    const { container } = render(<StarWarsAutocomplete />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    fireEvent.change(container.querySelector("input") as HTMLInputElement, {
      target: {
        value: "luke",
      },
    });

    await waitFor(() => {
      expect(mockGetStarWarsPersons).toHaveBeenCalledWith("luke");
      expect(container.querySelectorAll(".listItem").length).toBe(1);
    });

    expect(container.querySelectorAll(".listItem__highlight")[0].innerHTML).toBe("L");
    expect(container.querySelectorAll(".listItem__highlight").length).toBe(8);

    spy.mockRestore();
  });

  test("it should show not found message when there isn't a match", async () => {
    const { container } = render(<StarWarsAutocomplete />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    fireEvent.change(container.querySelector("input") as HTMLInputElement, {
      target: {
        value: "not a person",
      },
    });

    await waitFor(() => {
      expect(screen.getByText("No results found for not a person")).toBeInTheDocument();
    });
  });

  test("it should display alert when there is an error", async () => {
    const mockAlert = jest.fn();
    const spy1 = jest.spyOn(window, "alert").mockImplementation(mockAlert);
    const spy2 = jest.spyOn(service, "getStarWarsPersons").mockImplementation(() => {
      throw new Error("");
    });

    render(<StarWarsAutocomplete />);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("An error occurred, please try again later");
    });

    spy1.mockRestore();
    spy2.mockRestore();
  });
});
