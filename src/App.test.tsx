import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hideout tracker app', () => {
  render(<App />);
  expect(document.querySelector('.min-h-screen')).toBeInTheDocument();
});
