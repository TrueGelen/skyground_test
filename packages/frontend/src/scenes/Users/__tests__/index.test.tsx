import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { UserStatic } from "@/Providers/UserProvider/context";
import Users from "..";
import { axiosClient } from "@/api/axiosClient";
import axiosMockAdapter from "axios-mock-adapter";

describe("Users", () => {
  const usersResponse: UserStatic[] = [
    {
      id: "0",
      firstName: "Vlad",
      lastName: "Filchagin",
      email: "some@ya.ru",
    },
  ];

  const apiClientMock = new axiosMockAdapter(axiosClient, {
    delayResponse: 200,
  });

  it("render loading and then users", async () => {
    apiClientMock.onGet("/users").reply(200, usersResponse);

    render(<Users />);

    expect(screen.getByTestId("scene_spinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/some@ya\.ru/i)).toBeInTheDocument()
    );
  });
});
