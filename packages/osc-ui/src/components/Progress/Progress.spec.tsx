import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Progress } from './Progress';

test('should render a progress bar with specific progress level', () => {
    const progressLevel = 50;

    render(<Progress progressLevel={progressLevel} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-value', '50');
});

test('should return an empty DOM element if the progress level is > 100 ', () => {
    const progressLevel = 150;

    const { container } = render(<Progress progressLevel={progressLevel} />);

    expect(container).toBeEmptyDOMElement();
});
