import { render, screen } from '@testing-library/react';
import React from 'react';
import { ContentMedia } from './ContentMedia';

test('renders ContentMedia', () => {
    render(<ContentMedia>Hello, world!</ContentMedia>);
    const ContentMediaElement = screen.getByText(/Hello, world!/i);
    expect(ContentMediaElement).toBeInTheDocument();
});

