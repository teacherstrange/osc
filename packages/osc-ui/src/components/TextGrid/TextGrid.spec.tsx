import { render, screen } from '@testing-library/react';
import React, { Fragment } from 'react';
import { TextGrid } from './TextGrid';
import data from './textGridData';

test('renders TextGrid items', () => {
    render(
        <TextGrid>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <h3 className="t-font-epsilon u-text-bold">{item.title}</h3>
                    <p>{item.content}</p>
                </Fragment>
            ))}
        </TextGrid>
    );

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(data.length);
});

test('renders the heading outside of the grid', () => {
    render(
        <TextGrid heading="How an online college works">
            {data.map((item, index) => (
                <Fragment key={index}>
                    <h3 className="t-font-epsilon u-text-bold">{item.title}</h3>
                    <p>{item.content}</p>
                </Fragment>
            ))}
        </TextGrid>
    );

    const mainHeading = screen.getByRole('heading', { level: 2 });
    const headingInline = document.querySelector('.c-text-grid__items > .c-text-grid__heading');

    expect(mainHeading).toHaveTextContent(/how an online college works/i);
    expect(headingInline).not.toBeInTheDocument();
});

test('renders the heading inline with the grid', () => {
    render(
        <TextGrid heading="How an online college works" hasInlineHeading>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <h3 className="t-font-epsilon u-text-bold">{item.title}</h3>
                    <p>{item.content}</p>
                </Fragment>
            ))}
        </TextGrid>
    );

    const mainHeading = screen.getByRole('heading', { level: 2 });
    const headingInline = document.querySelector('.c-text-grid__items > .c-text-grid__heading');

    expect(mainHeading).toHaveTextContent(/how an online college works/i);
    expect(headingInline).toBeInTheDocument();
});
