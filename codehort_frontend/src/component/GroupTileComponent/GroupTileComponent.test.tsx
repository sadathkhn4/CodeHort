import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GroupTileComponent from './GroupTileComponent';

describe('<GroupTileComponent />', () => {
  test('it should mount', () => {
    render(<GroupTileComponent />);
    
    const groupTileComponent = screen.getByTestId('GroupTileComponent');

    expect(groupTileComponent).toBeInTheDocument();
  });
});