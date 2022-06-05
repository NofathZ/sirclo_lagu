import { render, screen, waitFor } from "@testing-library/react";
import Search from "./Search";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Testing search", () => {

  test("button 'cari' clicked when state is null", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const buttonCari = await screen.findByText(/Cari/i, { exact: true });
    await userEvent.click(buttonCari);

    const typeSomething = screen.queryByTestId("type-something");
    const noMatch = screen.queryByTestId("no-match");
    const artistRes = screen.queryByTestId("artist-search-res");
    const songRes = screen.queryByTestId("artist-search-res");

    expect(typeSomething).toBeInTheDocument();
    expect(noMatch).not.toBeInTheDocument();
    expect(artistRes).not.toBeInTheDocument();
    expect(songRes).not.toBeInTheDocument();
  });
  test("button 'cari' clicked when there is state", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const inputField = screen.getByPlaceholderText("Type songs or artist")
    await userEvent.type(inputField, "charlie")
    
    const buttonCari = await screen.findByText(/Cari/i, { exact: true });
    await userEvent.click(buttonCari);

    const typeSomething = screen.queryByTestId("type-something");
    const noMatch = screen.queryByTestId("no-match");
    
    expect(typeSomething).not.toBeInTheDocument();
    expect(noMatch).not.toBeInTheDocument();

    await waitFor(async () => {
      const items = await screen.findAllByTestId("artist-search-res");
      expect(items).toHaveLength(10);
    });

    await waitFor(async () => {
      const items = await screen.findAllByTestId("song-search-res");
      expect(items).toHaveLength(10);
    });
  });
});
