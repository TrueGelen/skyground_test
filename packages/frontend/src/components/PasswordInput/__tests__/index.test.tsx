import { render, fireEvent, screen } from "@testing-library/react";
import PasswordInput from "..";

describe("PasswordInput", () => {
  it("renders PasswordInput component", () => {
    render(<PasswordInput value="password" />);

    const inputElement = screen.getByDisplayValue("password");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");

    const visibilityIcon = screen.getByTestId("VisibilityIcon");
    expect(visibilityIcon).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<PasswordInput value="password" />);
    const iconButton = screen.getByRole("button");

    // Initially, the password should be hidden
    const inputElement = screen.getByDisplayValue("password");
    expect(inputElement).toHaveAttribute("type", "password");

    // Click the IconButton to show the password
    fireEvent.click(iconButton);

    // The password should now be visible
    expect(inputElement).toHaveAttribute("type", "text");

    // The visibility icon should change to VisibilityOff
    const visibilityOffIcon = screen.getByTestId(
      "passwordInput__visibility-off-icon"
    );
    expect(visibilityOffIcon).toBeInTheDocument();

    // Click the IconButton again to hide the password
    fireEvent.click(iconButton);

    // The password should now be hidden again
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
