import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Progress, CircularProgress, ProgressContent } from './Progress';

const PROGRESS_LEVEL = 50;
const INVALID_PROGRESS_LEVEL = 150;

test('should render a progress bar with specific progress level', () => {
    render(<Progress colorVariant="primary" progressLevel={PROGRESS_LEVEL} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-value', '50');
});

test('should return an empty DOM element if the progress level is > 100 ', () => {
    const { container } = render(
        <Progress colorVariant="primary" progressLevel={INVALID_PROGRESS_LEVEL} />
    );

    expect(container).toBeEmptyDOMElement();
});

test('should render a circular progress bar with specific progress level', () => {
    render(<CircularProgress colorVariant="primary-gradient" progressLevel={PROGRESS_LEVEL} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
});
test('should render a circular progress bar with inner content', () => {
    render(
        <CircularProgress colorVariant="primary-gradient" progressLevel={PROGRESS_LEVEL}>
            <ProgressContent>
                <div>{PROGRESS_LEVEL}% Complete</div>
            </ProgressContent>
        </CircularProgress>
    );

    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
});
test('should return an empty DOM element if the Circular progress level is > 100', () => {
    const { container } = render(
        <CircularProgress colorVariant="primary-gradient" progressLevel={INVALID_PROGRESS_LEVEL} />
    );

    expect(container).toBeEmptyDOMElement();
});
