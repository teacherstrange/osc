import React from 'react';
import { screen, render } from '@testing-library/react';

import { Alert, AlertDescription, AlertTitle } from './Alert';

describe('Alert component', () => {
    test('should render the correct text/classes for the title and description', async () => {
        render(
            <Alert status="info">
                <AlertTitle title="OSC is going live on August 30th" />
                <AlertDescription description="Make sure you are ready!" />
            </Alert>
        );
        const title = await screen.findByText('OSC is going live on August 30th');
        const description = await screen.findByText('Make sure you are ready!');

        expect(title).toHaveClass('c-alert__title');
        expect(title).toHaveTextContent('OSC is going live on August 30th');
        expect(description).toHaveClass('c-alert__description');
        expect(description).toHaveTextContent('Make sure you are ready!');
    });
    test('should render an SVG for the icon as default', () => {
        const { container } = render(
            <Alert status="warning">
                <AlertTitle title="OSC is going live on August 30th" />
                <AlertDescription description="Make sure you are ready!" />
            </Alert>
        );

        const icon = container.querySelector('svg');
        expect(icon.nodeName).toBe('SVG');
    });
    test('should not render an SVG if icon prop is passed in as "false"', () => {
        const { container } = render(
            <Alert displayIcon={false} status="success">
                <AlertTitle title="OSC is going live on August 30th" />
                <AlertDescription description="Make sure you are ready!" />
            </Alert>
        );
        const icon = container.querySelector('svg');
        expect(icon).toBeNull();
    });
    test('should set aria "alert role" if status is "error" or "warning"', () => {
        const { rerender } = render(
            <Alert status="error">
                <AlertTitle title="OSC is going live on August 30th" />
            </Alert>
        );
        expect(screen.getByRole('alert')).toBeInTheDocument();

        rerender(
            <Alert status="warning">
                <AlertTitle title="OSC is going live on August 30th" />
            </Alert>
        );
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    test('should not set aria "alert role" if status is not "error" or "warning"', () => {
        const { rerender } = render(
            <Alert status="info">
                <AlertTitle title="OSC is going live on August 30th" />
            </Alert>
        );
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        rerender(
            <Alert status="success">
                <AlertTitle title="OSC is going live on August 30th" />
            </Alert>
        );
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    // TODO - Reintroduce test when button component is added
    // test('should render a custom component', () => {
    //     render(
    //         <Alert displayIcon={false} status="error">
    //             <AlertTitle title="OSC is going live on August 30th" />
    //             <AlertDescription description="Make sure you are ready!" />
    //             <Cross2Icon />
    //         </Alert>
    //     );

    //     const closeButton = screen.getByLabelText('Close');
    //     expect(closeButton).toBeInTheDocument();
    // });
});
