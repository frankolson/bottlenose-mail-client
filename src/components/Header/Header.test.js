import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('Shows title', () => {
  const { getByText } = render(<Header />);
  const titleElement = getByText(/This is BottlenoseMail/i);
  expect(titleElement).toBeInTheDocument();
});
