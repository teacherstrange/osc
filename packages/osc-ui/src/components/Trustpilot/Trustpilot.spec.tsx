/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Trustpilot } from './Trustpilot';
import { act, screen, render } from '@testing-library/react';

describe('third party script', () => {
    const bootstrapScript = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

    test('renders the trustpilot bootstrap script', () => {
        render(<Trustpilot />);

        // Not ideal to use testId see: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-the-wrong-query.
        // But okay here as we are rendering from a 3rd-party libaray meaning
        // we don't have much to target.
        const widgetContainer = screen.getByTestId('trustpilot');
        const scriptTag = document.querySelector(`script[src="${bootstrapScript}"]`);

        expect(widgetContainer).toHaveAttribute('data-status', 'loading');

        act(() => {
            scriptTag.dispatchEvent(new Event('load'));
        });

        expect(scriptTag).toBeInTheDocument();
        expect(widgetContainer).toHaveAttribute('data-status', 'ready');
    });

    test('renders the trustpilot bootstrap script only once, multiple components', () => {
        render(
            <>
                <Trustpilot />
                <Trustpilot />
            </>
        );

        const widgetContainers = screen.getAllByTestId('trustpilot');
        const scriptTags = document.querySelectorAll(`script[src="${bootstrapScript}"]`);

        for (const widgetContainer of widgetContainers) {
            expect(widgetContainer).toHaveAttribute('data-status', 'loading');
        }

        expect(scriptTags).toHaveLength(1);

        act(() => {
            scriptTags[0].dispatchEvent(new Event('load'));
        });

        for (const widgetContainer of widgetContainers) {
            expect(widgetContainer).toHaveAttribute('data-status', 'ready');
        }
    });
});

describe('component props', () => {
    test('renders as a slider', () => {
        render(<Trustpilot height="240px" template="slider" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-template-id', '54ad5defc6454f065c28af8b');
        expect(widgetContainer).toHaveAttribute('data-style-height', '240px');
    });

    test('renders as a grid', () => {
        render(<Trustpilot height="500px" template="grid" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-template-id', '539adbd6dec7e10e686debee');
        expect(widgetContainer).toHaveAttribute('data-style-height', '500px');
    });

    test('renders as a microcarousel', () => {
        render(<Trustpilot height="350px" template="minicarousel" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-template-id', '539ad0ffdec7e10e686debd7');
        expect(widgetContainer).toHaveAttribute('data-style-height', '350px');
    });

    test('renders as a microstar', () => {
        render(<Trustpilot height="100px" template="microstar" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-template-id', '5419b732fbfb950b10de65e5');
        expect(widgetContainer).toHaveAttribute('data-style-height', '100px');
    });

    test('renders in darktheme', () => {
        render(<Trustpilot theme="dark" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-theme', 'dark');
    });

    test('renders with only 3 star reviews', () => {
        render(<Trustpilot stars="3" />);

        const widgetContainer = screen.getByTestId('trustpilot');

        expect(widgetContainer).toHaveAttribute('data-stars', '3');
    });
});
