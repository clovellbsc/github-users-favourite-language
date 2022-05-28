import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const inputUsername = screen.getByPlaceholderText("Username")

  expect(inputUsername).toBeInTheDocument()

  const submitButton = screen.getByRole("button", { name: "Submit" })

  expect(submitButton).toBeInTheDocument()
});
