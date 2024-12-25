import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Test from './Test';

describe('<Test />', () => {
  test('it should mount', () => {
    render(<Test />);
    
    const test = screen.getByTestId('Test');

    expect(test).toBeInTheDocument();
  });
});