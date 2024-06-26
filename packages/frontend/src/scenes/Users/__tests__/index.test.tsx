import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axiosMockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";
import Users from "..";

const mockedAxios = new axiosMockAdapter(axiosClient);
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );

describe("Users", () => {
  afterEach(() => {
    queryClient.clear();
    mockedAxios.reset();
  });

  it("show loading spinner while fetching data", () => {
    mockedAxios.onGet("/users").reply(200);
    renderComponent();
    expect(screen.getByTestId("scene_spinner")).toBeInTheDocument();
  });

  it("render user data after fetching", async () => {
    const users: User[] = [
      {
        id: "0",
        email: "john@ya.ru",
        firstName: "John",
        lastName: "Ddd",
      },
      {
        id: "1",
        email: "anna@ya.ru",
        firstName: "Anna",
        lastName: "Aaa",
      },
    ];
    mockedAxios.onGet("/users").reply(200, users);

    renderComponent();

    await waitFor(() => {
      const firstUser = screen.getByText(users[0].email);
      expect(firstUser).toBeInTheDocument();
    });

    users.forEach((user) => {
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(
        screen.getByText(`${user.firstName} ${user.lastName}`)
      ).toBeInTheDocument();
    });
  });

  it("should show error toast when fetching fails", async () => {
    const toastSpy = vi.spyOn(toast, "error");
    mockedAxios.onGet("/users").reply(500);

    renderComponent();

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith("Something went wrong :(");
    });

    toastSpy.mockRestore();
  });
});
