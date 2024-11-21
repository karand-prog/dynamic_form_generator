import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('submits form data and downloads JSON file', () => {
  render(<App />);

  // Fill out the form
  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  expect(nameInput).toBeInTheDocument();
  const emailInput = screen.getByPlaceholderText(/example@example.com/i);
  expect(emailInput).toBeInTheDocument();
  const roleSelect = screen.getByLabelText(/role/i);
  expect(roleSelect).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(roleSelect, { target: { value: 'developer' } });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  // Verify the file download
  expect(global.URL.createObjectURL).toHaveBeenCalled();
});