import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GroupsPage from './GroupsPage';

describe('<GroupsPage />', () => {
  test('it should mount', () => {
    render(<GroupsPage />);
    
    const groupsPage = screen.getByTestId('GroupsPage');

    expect(groupsPage).toBeInTheDocument();
  });
});