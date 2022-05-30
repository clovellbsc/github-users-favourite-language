import { render, screen, waitFor } from "@testing-library/react";
import FindFavouriteLanguage from "../components/findFavouriteLanguage.js";
import userEvent from "@testing-library/user-event";
import mockAxios from "axios";

jest.mock("axios");

test("ensuring form is rendered", () => {
  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");

  expect(inputUsername).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: "Submit" });

  expect(submitButton).toBeInTheDocument();
});

test("returns JavaScript when one Javascript repository is returned", async () => {
  const mockResponse = { data: [{ language: "JavaScript" }] };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("JavaScript");

  expect(language).toBeInTheDocument();
});

test("returns Ruby when one Ruby repository is returned", async () => {
  const mockResponse = { data: [{ language: "Ruby" }] };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");

  expect(inputUsername).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: "Submit" });

  expect(submitButton).toBeInTheDocument();

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("Ruby");

  expect(language).toBeInTheDocument();
});

test("returns Ruby when Ruby is most used language in the returned repositories", async () => {
  const mockResponse = {
    data: [
      { language: "Ruby" },
      { language: "JavaScript" },
      { language: "Ruby" },
    ],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("Ruby");

  await waitFor(() =>
    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument()
  );
  expect(language).toBeInTheDocument();
});

test("returns Ruby when Ruby is most used language but is not the first language in the returned repositories", async () => {
  const mockResponse = {
    data: [
      { language: "JavaScript" },
      { language: "Ruby" },
      { language: "Ruby" },
    ],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("Ruby");

  await waitFor(() =>
    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument()
  );
  expect(language).toBeInTheDocument();
});

test("where a language returns null, this is ignored", async () => {
  const mockResponse = {
    data: [{ language: null }, { language: "JavaScript" }, { language: null }],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("JavaScript");

  await waitFor(() =>
    expect(screen.queryByText("null")).not.toBeInTheDocument()
  );
  expect(language).toBeInTheDocument();
});

test("returns the most recently used languages when there are multiple favourite languages", async () => {
  const mockResponse = {
    data: [
      { language: "Ruby" },
      { language: "Ruby" },
      { language: "JavaScript" },
      { language: "JavaScript" },
      { language: "Python" },
    ],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const ruby = await screen.findByText("Ruby");

  await waitFor(() =>
    expect(screen.queryByText("Python")).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument()
  );
  expect(ruby).toBeInTheDocument();
});

test("where no data is returned it states on screen the user has no repositories", async () => {
  const mockResponse = {
    data: [],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const languageHeader = await screen.findByText(
    "There is no data for clovellbsc's languages"
  );

  await waitFor(() => expect(screen.queryByRole("listitem")).toBeNull());
  expect(languageHeader).toBeInTheDocument();
});

test("render single favourite language statement", async () => {
  const mockResponse = { data: [{ language: "JavaScript" }] };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const languageHeader = await screen.findByText(
    "clovellbsc's favourite language"
  );

  expect(languageHeader).toBeInTheDocument();
});

test("This user does not exist displayed if a 404 error is returned from the request", async () => {
  const mockResponse = {
    request: {
      status: 404,
    },
  };

  mockAxios.get.mockRejectedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const languageHeader = await screen.findByText("This user does not exist");

  await waitFor(() => expect(screen.queryByRole("listitem")).toBeNull());
  expect(languageHeader).toBeInTheDocument();
});

test("Error: error message returned if error other than 404 or 400", async () => {
  const mockResponse = {
    request: {
      status: 500,
    },
    response: {
      data: {
        message: "500 Internal Server Error",
      },
    },
  };

  mockAxios.get.mockRejectedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const languageHeader = await screen.findByText(
    "Error: 500 Internal Server Error"
  );

  await waitFor(() => expect(screen.queryByRole("listitem")).toBeNull());
  expect(languageHeader).toBeInTheDocument();
});

test("returns the correct values across multiple requests", async () => {
  let mockResponse = {
    data: [
      { language: "JavaScript" },
      { language: "JavaScript" },
      { language: "Ruby" },
    ],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const language = await screen.findByText("JavaScript");

  await waitFor(() =>
    expect(screen.queryByText("null")).not.toBeInTheDocument()
  );
  expect(language).toBeInTheDocument();

  mockResponse = {
    data: [
      { language: "Ruby" },
      { language: "JavaScript" },
      { language: "Ruby" },
    ],
  };

  mockAxios.get.mockResolvedValueOnce(mockResponse);

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const newLanguage = await screen.findByText("JavaScript");

  await waitFor(() =>
    expect(screen.queryByText("null")).not.toBeInTheDocument()
  );
  expect(newLanguage).toBeInTheDocument();
});

test("Error: error message returned if error 400", async () => {
  const mockResponse = {
    message: "Request failed with status code 400",
    request: {
      status: 400,
    },
  };

  mockAxios.get.mockRejectedValueOnce(mockResponse);

  render(<FindFavouriteLanguage />);
  const inputUsername = screen.getByPlaceholderText("Username");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(inputUsername, "clovellbsc");
  userEvent.click(submitButton);

  const languageHeader = await screen.findByText(
    "invalid username (github usernames can only contain alphanumeric characters and hyphens)"
  );

  await waitFor(() => expect(screen.queryByRole("listitem")).toBeNull());
  expect(languageHeader).toBeInTheDocument();
});
