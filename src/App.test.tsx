import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Enhanced Dynamic Form/i); // Change to actual title text
  expect(titleElement).toBeInTheDocument();
});

