import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateChallenge from './CreateChallenge';

describe('<CreateChallenge />', () => {
  test('it should mount', () => {
    render(<CreateChallenge />);
    
    const createChallenge = screen.getByTestId('CreateChallenge');

    expect(createChallenge).toBeInTheDocument();
  });
});