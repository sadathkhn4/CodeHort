import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Challenges from './Challenges';

describe('<Challenges />', () => {
  test('it should mount', () => {
    render(<Challenges />);
    
    const challenges = screen.getByTestId('Challenges');

    expect(challenges).toBeInTheDocument();
  });
});