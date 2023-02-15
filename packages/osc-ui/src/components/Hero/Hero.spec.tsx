import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import { Hero, HeroContent, HeroImage, HeroInner, HeroTitle } from './Hero';

test('renders the Hero', () => {
    render(
        <Hero variant="primary" backgroundColor="gradient-nonary-270">
            <HeroInner>
                <HeroTitle>Save on your study</HeroTitle>
                <HeroContent>
                    <div className="c-content">
                        <div className="c-content__inner c-content__inner--left">
                            <p className="t-font-l">
                                With flexible payment plans and a range of special offers it's never
                                been simpler to study.
                            </p>

                            <div className="c-btn-group">
                                <Button>Special Offers</Button>
                            </div>
                        </div>
                    </div>
                </HeroContent>

                <HeroImage>
                    <Image
                        src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675932183/c029363030ddd0a2ec5cb7d0541f4bba_yhznnx_p6av0z.png"
                        width={444}
                        height={480}
                        alt="A smiling man, dancing with his left hand raised in the air"
                    />
                </HeroImage>
            </HeroInner>
        </Hero>
    );

    const hero = document.querySelector('.c-hero');
    const background = document.querySelector('.c-hero__background');
    const content = document.querySelector('.c-hero__content');
    const image = document.querySelector('.c-hero__img');
    const title = screen.getByRole('heading', { name: 'Save on your study' });

    expect(hero).toBeInTheDocument();
    expect(background).toBeInTheDocument();
    expect(background).toHaveClass('u-bg-color-gradient-nonary-270');
    expect(content).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
});

test('renders the HeroTitle as different heading levels', () => {
    render(
        <Hero variant="primary" backgroundColor="gradient-nonary-270">
            <HeroTitle>Heading 2</HeroTitle>
            <HeroTitle as="h3">Heading 3</HeroTitle>
            <HeroTitle as="h3" subtitle>
                SubHeading 3
            </HeroTitle>
        </Hero>
    );

    const titleLvl2 = screen.getByRole('heading', { level: 2 });
    const titleLvl3 = screen.getByRole('heading', { level: 3, name: 'Heading 3' });
    const subtitleLvl3 = screen.getByRole('heading', { level: 3, name: 'SubHeading 3' });

    expect(titleLvl2).toBeInTheDocument();
    expect(titleLvl3).toBeInTheDocument();
    expect(subtitleLvl3).toBeInTheDocument();
    expect(subtitleLvl3).toHaveClass('c-hero__subttl');
});

test('renders different font sizes for each variant', () => {
    const { rerender } = render(
        <Hero variant="primary" backgroundColor="gradient-nonary-270">
            <HeroTitle>Title</HeroTitle>
        </Hero>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toHaveClass('t-font-kilo');

    rerender(
        <Hero variant="secondary" backgroundColor="gradient-nonary-270">
            <HeroTitle>Title</HeroTitle>
        </Hero>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toHaveClass('t-font-mega');

    rerender(
        <Hero variant="tertiary" backgroundColor="gradient-nonary-270">
            <HeroTitle>Title</HeroTitle>
        </Hero>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toHaveClass('t-font-beta');
});
