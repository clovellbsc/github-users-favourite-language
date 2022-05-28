import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
import mockAxios from 'axios'

jest.mock("axios")

test('renders learn react link', () => {
  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")

  expect(inputUsername).toBeInTheDocument()

  const submitButton = screen.getByRole("button", { name: "Submit" })

  expect(submitButton).toBeInTheDocument()
});

test('returns JavaScript when one Javascript repository is returned', async () => {
  const mockResponse = { data: [ {language: "JavaScript"} ] }

  mockAxios.get.mockResolvedValueOnce(mockResponse)

  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")
  const submitButton = screen.getByRole("button", { name: "Submit" })

  userEvent.type(inputUsername, "clovellbsc")
  userEvent.click(submitButton)

  const language = await screen.findByText("JavaScript")

  expect(language).toBeInTheDocument()
});

test('returns Ruby when one Ruby repository is returned', async () => {
  const mockResponse = { data: [ {language: "Ruby"} ] }

  mockAxios.get.mockResolvedValueOnce(mockResponse)

  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")

  expect(inputUsername).toBeInTheDocument()

  const submitButton = screen.getByRole("button", { name: "Submit" })

  expect(submitButton).toBeInTheDocument()

  userEvent.type(inputUsername, "clovellbsc")
  userEvent.click(submitButton)

  const language = await screen.findByText("Ruby")

  expect(language).toBeInTheDocument()
});

test('returns Ruby when Ruby is most used language in the returned repositories', async () => {
  const mockResponse = { data: [ {language: "Ruby"}, { language: "JavaScript"}, {language: "Ruby"} ] }

  mockAxios.get.mockResolvedValueOnce(mockResponse)

  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")
  const submitButton = screen.getByRole("button", { name: "Submit" })

  userEvent.type(inputUsername, "clovellbsc")
  userEvent.click(submitButton)
  
  const language = await screen.findByText("Ruby")
  
  await waitFor(() => expect(screen.queryByText("JavaScript")).not.toBeInTheDocument())
  expect(language).toBeInTheDocument()
});

test('returns Ruby when Ruby is most used language but is not the first language in the returned repositories', async () => {
  const mockResponse = { data: [ { language: "JavaScript"}, {language: "Ruby"}, {language: "Ruby"} ] }

  mockAxios.get.mockResolvedValueOnce(mockResponse)

  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")
  const submitButton = screen.getByRole("button", { name: "Submit" })

  userEvent.type(inputUsername, "clovellbsc")
  userEvent.click(submitButton)
  
  const language = await screen.findByText("Ruby")
  
  await waitFor(() => expect(screen.queryByText("JavaScript")).not.toBeInTheDocument())
  expect(language).toBeInTheDocument()
});
