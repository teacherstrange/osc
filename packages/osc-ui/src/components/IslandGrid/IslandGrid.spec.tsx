import { render } from '@testing-library/react';
import React from 'react';
import { IslandGrid } from './IslandGrid';

test('renders IslandGrid with three islands', () => {
    render(
        <IslandGrid>
            <div
                style={{
                    height: '638px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
        </IslandGrid>
    );

    const IslandGridElement = document.querySelector('.c-island-grid');
    const Islands = document.querySelectorAll('.c-island-grid__island');

    expect(IslandGridElement).toBeInTheDocument();
    expect(Islands).toHaveLength(3);
});

test('renders IslandGrid with four islands', () => {
    render(
        <IslandGrid>
            <div
                style={{
                    height: '638px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
        </IslandGrid>
    );

    const IslandGridElement = document.querySelector('.c-island-grid');
    const Islands = document.querySelectorAll('.c-island-grid__island');

    expect(IslandGridElement).toBeInTheDocument();
    expect(Islands).toHaveLength(4);
});

test('renders IslandGrid with custom classname', () => {
    render(
        <IslandGrid className="custom-class">
            <div
                style={{
                    height: '638px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
            <div
                style={{
                    height: '310px',
                    backgroundImage: 'var(--color-gradient-quaternary-90)',
                }}
            />
        </IslandGrid>
    );

    const IslandGridElement = document.querySelector('.c-island-grid');
    expect(IslandGridElement).toHaveClass('custom-class');
});
