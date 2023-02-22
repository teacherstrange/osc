import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalloutBanner } from './calloutBanner';

test('renders calloutBanner', () => {
    render(<CalloutBanner>Hello, world!</CalloutBanner>);
    const calloutBannerElement = screen.getByText(/Hello, world!/i);
    expect(calloutBannerElement).toBeInTheDocument();
});
