import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src//App'; // Ensure this path is correct for your file structure

test('renders JSON editor and handles invalid JSON gracefully', () => {
  render(<App />);

  // Verify the JSON editor is rendered
  const jsonEditor = screen.getByRole('textbox');
  expect(jsonEditor).toBeInTheDocument();

  // Enter invalid JSON
  fireEvent.change(jsonEditor, { target: { value: '{ invalid' } });
  const errorMessage = screen.getByText(/invalid json/i);
  expect(errorMessage).toBeInTheDocument();
});

// Ensure the file is treated as a module
export {};
