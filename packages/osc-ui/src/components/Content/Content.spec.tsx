import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Content } from './Content';
import { textContent, textContentHasButtons } from './textContent';

test('renders the correct elements', () => {
    render(<Content value={textContent.body} />);

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
    const { rerender } = render(<Content value={textContent.body} align="left" />);
    const contentInner = document.querySelector('.c-content__inner');
    expect(contentInner).toHaveClass('c-content__inner--left');

    rerender(<Content value={textContent.body} align="centre" />);
    expect(contentInner).toHaveClass('c-content__inner--centre');

    rerender(<Content value={textContent.body} align="right" />);
    expect(contentInner).toHaveClass('c-content__inner--right');
});

test('renders a custom classname', () => {
    render(<Content value={textContent.body} className="test-class" />);
    const content = document.querySelector('.c-content');
    expect(content).toHaveClass('test-class');
});

test('renders the correct buttons', () => {
    render(<Content value={textContentHasButtons.body} buttons={textContentHasButtons.buttons} />);

    const buttons = document.querySelectorAll('.c-btn');
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
