import { render, screen } from '@testing-library/react';
import React from 'react';
import { Content } from '../Content/Content';
import { Image } from '../Image/Image';
import { Card, CardBody, CardFooter, CardHeader, CardImage, CardInner, CardTitle } from './Card';
import { bioCardData } from './cardData';

test('renders a Card with sub components', () => {
    render(
        <Card>
            <CardImage>
                <Image
                    src={bioCardData.image.secure_url}
                    alt={bioCardData.image.alt}
                    width={bioCardData.image.width}
                    height={bioCardData.image.height}
                />
            </CardImage>
            <CardInner>
                <CardHeader>
                    <CardTitle as="h3" is="subtitle">
                        {bioCardData.role}
                    </CardTitle>
                    <CardTitle>{bioCardData.name}</CardTitle>
                </CardHeader>

                <CardBody>
                    <Content value={bioCardData.bio} />
                </CardBody>
            </CardInner>
            <CardFooter>
                <a href="/">Read more</a>
            </CardFooter>
        </Card>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(
        screen.getByRole('heading', {
            level: 2,
        })
    ).toBeInTheDocument();

    expect(
        screen.getByRole('heading', {
            level: 3,
        })
    ).toBeInTheDocument();

    expect(document.querySelector('.c-card__body')).toBeInTheDocument();

    expect(
        screen.getByRole('link', {
            name: 'Read more',
        })
    ).toBeInTheDocument();
});
