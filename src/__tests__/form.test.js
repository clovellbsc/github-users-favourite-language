import { render, screen } from "@testing-library/react";
import Form from "../components/form";
import userEvent from "@testing-library/user-event";

test("text field is present on the page", () => {
  render(<Form />);
  const inputUsername = screen.getByPlaceholderText("Username");

  expect(inputUsername).toBeInTheDocument();
});

test("submit button is present on the page", () => {
  render(<Form />);
  const submitButton = screen.getByRole("button", "Submit");

  expect(submitButton).toBeInTheDocument();
});

test("text field can be typed into", () => {
  render(<Form />);
  const inputUsername = screen.getByPlaceholderText("Username");

  userEvent.type(inputUsername, "clovellbsc");

  const filledInForm = screen.getByDisplayValue("clovellbsc");

  expect(filledInForm).toBeInTheDocument();
});

test("text field calls handleChange function", () => {
  const mockHandleChange = jest.fn();
  render(<Form handleChange={mockHandleChange} />);
  const inputUsername = screen.getByPlaceholderText("Username");

  userEvent.type(inputUsername, "clovellbsc");

  const filledInForm = screen.getByDisplayValue("clovellbsc");

  expect(filledInForm).toBeInTheDocument();
  expect(mockHandleChange).toHaveBeenCalled();
});

test("submit button is not disabled", () => {
  render(<Form />);
  const submitButton = screen.getByRole("button", "Submit");

  expect(submitButton).toBeEnabled();
});

test("submit button calls handleSubmit function", () => {
  const mockHandleSubmit = jest.fn((event) => event.preventDefault());

  render(<Form handleSubmit={mockHandleSubmit} />);
  const submitButton = screen.getByRole("button", "Submit");

  expect(submitButton).toBeEnabled();

  userEvent.click(submitButton);

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});
