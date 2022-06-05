import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopSongs from "./TopSongs";

describe("Check Top Artist", () => {
  test("How many rows rendered when first time opening app", async () => {
    render(<TopSongs />);
    const items = await screen.findAllByTestId("song-item");
    expect(items).toHaveLength(10); // initial state is 10
  });
  test("How many rows rendered after click button 'Show More' once", async () => {
    render(<TopSongs />);
    const ButtonShowMore = await screen.findByText("Show More", {
      exact: false,
    });
    await userEvent.click(ButtonShowMore);

    await waitFor(async () => {
      const items = await screen.findAllByTestId("song-item");
      expect(items).toHaveLength(20); // state increase 10
    });
  });
  test("Check if limit lower than 50 button must be showed", async () => {
    render(<TopSongs />);
    const ButtonShowMore = await screen.findByText("Show More", {
      exact: false,
    });
    expect(ButtonShowMore).toBeInTheDocument();
  });
  test("Check if limit more than equal 50 button must not be showed", async () => {
    render(<TopSongs />);
    const ButtonShowMore = await screen.findByText("Show More", {
      exact: false,
    });
    userEvent.click(ButtonShowMore);
    userEvent.click(ButtonShowMore);
    userEvent.click(ButtonShowMore);
    userEvent.click(ButtonShowMore);
    expect(ButtonShowMore).not.toBeInTheDocument();
  });
});
