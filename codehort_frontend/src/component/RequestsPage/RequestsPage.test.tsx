import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestsPage from './RequestsPage';

describe('<RequestsPage />', () => {
  test('it should mount', () => {
    render(<RequestsPage />);
    
    const requestsPage = screen.getByTestId('RequestsPage');

    expect(requestsPage).toBeInTheDocument();
  });
});