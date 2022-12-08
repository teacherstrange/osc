import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Content } from './Content';
import { textContent, textContentHasButtons } from './textContent';
// TODO: sb - test background color -- think we need theme setup in storybook?
test('renders the correct elements', () => {
    render(
        <MemoryRouter>
            <Content value={textContent.body} />
        </MemoryRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    const h3 = screen.getByRole('heading', { level: 3 });
    const h4 = screen.getByRole('heading', { level: 4 });
    const h5 = screen.getByRole('heading', { level: 5 });
    const h6 = screen.getByRole('heading', { level: 6 });
    const textNodes = document.querySelectorAll('.chakra-text');
    const internalLink = screen.getByRole('link', { name: /internal link/i });
    const externalLink = screen.getByRole('link', { name: /external link/i });
    const emailLink = screen.getByRole('link', { name: /email link/i });
    // We could use getByRole but afaik you can't separate ul or ol
    const ul = document.querySelector('ul');
    const ol = document.querySelector('ol');

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
    expect(h4).toBeInTheDocument();
    expect(h5).toBeInTheDocument();
    expect(h6).toBeInTheDocument();

    textNodes.forEach((node) => {
        expect(node).toBeInTheDocument();
    });

    expect(internalLink).toHaveAttribute('href', '/blog/test-post');
    expect(externalLink).toHaveAttribute('href', 'https://example.com');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');

    expect(ul).toBeInTheDocument();
    expect(ol).toBeInTheDocument();
});

test('renders the correct alignment class', () => {
    const { rerender } = render(
        <MemoryRouter>
            <Content value={textContent.body} align="left" />
        </MemoryRouter>
    );
    const contentInner = document.querySelector('.c-content__inner');
    expect(contentInner).toHaveClass('c-content__inner--left');

    rerender(
        <MemoryRouter>
            <Content value={textContent.body} align="centre" />
        </MemoryRouter>
    );
    expect(contentInner).toHaveClass('c-content__inner--centre');

    rerender(
        <MemoryRouter>
            <Content value={textContent.body} align="right" />
        </MemoryRouter>
    );
    expect(contentInner).toHaveClass('c-content__inner--right');
});

test('renders a custom classname', () => {
    render(
        <MemoryRouter>
            <Content value={textContent.body} className="test-class" />
        </MemoryRouter>
    );
    const article = screen.getByRole('article');
    expect(article).toHaveClass('test-class');
});

test('renders the correct padding class', () => {
    const { rerender } = render(
        <MemoryRouter>
            <Content value={textContent.body} paddingTop={10} paddingBottom={10} />
        </MemoryRouter>
    );
    const article = screen.getByRole('article');
    expect(article).toHaveClass('u-pt-10 u-pb-10');

    rerender(
        <MemoryRouter>
            <Content value={textContent.body} paddingTop={50} paddingBottom={110} />
        </MemoryRouter>
    );

    expect(article).toHaveClass('u-pt-50 u-pb-110');
});

test('renders the correct margin class', () => {
    render(
        <MemoryRouter>
            <Content value={textContent.body} marginBottom={10} />
        </MemoryRouter>
    );
    const article = screen.getByRole('article');
    expect(article).toHaveClass('u-mb-10');
});

test('renders the correct buttons', () => {
    render(
        <MemoryRouter>
            <Content value={textContentHasButtons.body} buttons={textContentHasButtons.buttons} />
        </MemoryRouter>
    );

    const buttons = document.querySelectorAll('.c-button');
    expect(buttons).toHaveLength(6);

    const fileDownloadButton = screen.getByRole('link', { name: /file download/i });
    const emailButton = screen.getByRole('link', { name: /email/i });
    const externalButton = screen.getByRole('link', { name: /external link/i });
    const internalLinkButton = screen.getByRole('link', { name: /internal link/i });
    const telephoneButton = screen.getByRole('link', { name: /telephone/i });
    const copyToClipboardButton = screen.getByRole('button', { name: /copy to clipboard/i });

    expect(fileDownloadButton).toHaveAttribute(
        'href',
        'https://cdn.sanity.io/files/v6lebos6/staging/bfd009f500c057195ffde66fae64f92fa5f59b72.pdf'
    );
    expect(emailButton).toHaveAttribute('href', 'mailto:test@example.com');
    expect(externalButton).toHaveAttribute('href', 'https://example.com');
    expect(internalLinkButton).toHaveAttribute('href', '/');
    expect(telephoneButton).toHaveAttribute('href', 'tel:01234567890');
    expect(copyToClipboardButton).toBeInTheDocument();
});
