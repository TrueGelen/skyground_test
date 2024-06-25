import { render, screen } from "@testing-library/react";
import SceneSpinner from "..";

describe("SceneSpinner", () => {
  it("renders the CircularProgress and a loading message", async () => {
    render(<SceneSpinner />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
