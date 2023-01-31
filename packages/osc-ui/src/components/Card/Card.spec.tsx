import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { truncate } from '../../utils/truncate';
import { Button } from '../Button/Button';
import { Content } from '../Content/Content';
import { Image } from '../Image/Image';
import {
    BlogCard,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardPriceTag,
    CardTitle,
    CollectionCard,
    CourseCard,
} from './Card';
import { bioCardData, collectionCardDataSml, postCardData } from './cardData';

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
                    <CardTitle as="h3" subtitle>
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

test('block link prop makes whole card clickable', async () => {
    const user = userEvent.setup();

    // Apply a data attribute when button is clicked so we have something to test against.
    const handleClick = (e) => {
        e.currentTarget.dataset.testData = 'test';
    };

    render(
        <Card blockLink>
            <CardInner>
                <CardHeader>
                    <CardTitle>
                        A third of women change their career after having children
                    </CardTitle>
                    <CardTitle as="h3" subtitle>
                        Study tips
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <p>December 29th, 2021</p>
                </CardBody>

                <CardFooter>
                    <Button variant="quinary" onClick={handleClick}>
                        Read more
                    </Button>
                </CardFooter>
            </CardInner>
        </Card>
    );

    const cardBody = document.querySelector('.c-card__body');
    const button = screen.getByRole('button', { name: 'Read more' });

    await user.click(cardBody);

    expect(button.dataset.testData).toBe('test');
});

describe('Card Title', () => {
    test('sets the card title as a h3', () => {
        render(
            <Card>
                <CardTitle as="h3">Title</CardTitle>
            </Card>
        );

        expect(
            screen.getByRole('heading', {
                level: 3,
            })
        ).toBeInTheDocument();
    });

    test('sets the subtitle class on the title', () => {
        render(
            <Card>
                <CardTitle as="h3" subtitle>
                    Title
                </CardTitle>
            </Card>
        );

        expect(
            screen.getByRole('heading', {
                level: 3,
            })
        ).toHaveClass('c-card__subttl');
    });

    test('adds the is-small class to the title', () => {
        render(
            <Card>
                <CardTitle as="h3" isSmall>
                    Title
                </CardTitle>
            </Card>
        );

        expect(
            screen.getByRole('heading', {
                level: 3,
            })
        ).toHaveClass('is-small');
    });
});

describe('Blog card', () => {
    test('adds the featured class to the blog card', () => {
        render(
            <BlogCard variant="featured">
                <CardInner>
                    <CardHeader>
                        <CardTitle>{postCardData.title}</CardTitle>
                        <CardTitle as="h3" subtitle>
                            {postCardData.subtitle}
                        </CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(postCardData.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <time dateTime="2022-10-08" className="u-text-reg">
                            Wednesday 8th October
                        </time>
                        <Button variant="secondary">Read more</Button>
                    </CardFooter>
                </CardInner>
            </BlogCard>
        );

        expect(document.querySelector('.c-card--blog')).toHaveClass('c-card--featured');
    });

    test('adds the is-full class to the blog card', () => {
        render(
            <BlogCard variant="featured" isFull>
                <CardInner>
                    <CardHeader>
                        <CardTitle>{postCardData.title}</CardTitle>
                        <CardTitle as="h3" subtitle>
                            {postCardData.subtitle}
                        </CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(postCardData.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <time dateTime="2022-10-08" className="u-text-reg">
                            Wednesday 8th October
                        </time>
                        <Button variant="secondary">Read more</Button>
                    </CardFooter>
                </CardInner>
            </BlogCard>
        );

        expect(document.querySelector('.c-card--blog')).toHaveClass('is-full');
    });

    test('adds the media-object class to the blog card', () => {
        render(
            <BlogCard variant="media-object">
                <CardInner>
                    <CardHeader>
                        <CardTitle>{postCardData.title}</CardTitle>
                        <CardTitle as="h3" subtitle>
                            {postCardData.subtitle}
                        </CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(postCardData.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <time dateTime="2022-10-08" className="u-text-reg">
                            Wednesday 8th October
                        </time>
                        <Button variant="secondary">Read more</Button>
                    </CardFooter>
                </CardInner>
            </BlogCard>
        );

        expect(document.querySelector('.c-card--blog')).toHaveClass('c-card--media-object');
    });
});

describe('Collection Card', () => {
    test('adds the sm class to the blog card', () => {
        render(
            <CollectionCard size="sm">
                <CardImage>
                    <Image
                        src={collectionCardDataSml.image.secure_url}
                        alt={collectionCardDataSml.image.alt}
                        width={collectionCardDataSml.image.width}
                        height={collectionCardDataSml.image.height}
                    />
                </CardImage>
                <CardInner>
                    <CardHeader>
                        <CardTitle>{collectionCardDataSml.title}</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(collectionCardDataSml.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <span className="u-text-bold">23 courses</span>
                        <Button variant="quaternary">Find our more</Button>
                    </CardFooter>
                </CardInner>
            </CollectionCard>
        );

        expect(document.querySelector('.c-card--collection')).toHaveClass('c-card--sm');
    });
    test('adds the md class to the blog card', () => {
        render(
            <CollectionCard size="md">
                <CardImage>
                    <Image
                        src={collectionCardDataSml.image.secure_url}
                        alt={collectionCardDataSml.image.alt}
                        width={collectionCardDataSml.image.width}
                        height={collectionCardDataSml.image.height}
                    />
                </CardImage>
                <CardInner>
                    <CardHeader>
                        <CardTitle>{collectionCardDataSml.title}</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(collectionCardDataSml.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <span className="u-text-bold">23 courses</span>
                        <Button variant="quaternary">Find our more</Button>
                    </CardFooter>
                </CardInner>
            </CollectionCard>
        );

        expect(document.querySelector('.c-card--collection')).toHaveClass('c-card--md');
    });
    test('adds the lg class to the blog card', () => {
        render(
            <CollectionCard size="lg">
                <CardImage>
                    <Image
                        src={collectionCardDataSml.image.secure_url}
                        alt={collectionCardDataSml.image.alt}
                        width={collectionCardDataSml.image.width}
                        height={collectionCardDataSml.image.height}
                    />
                </CardImage>
                <CardInner>
                    <CardHeader>
                        <CardTitle>{collectionCardDataSml.title}</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <p>{truncate(collectionCardDataSml.body)}</p>
                    </CardBody>

                    <CardFooter>
                        <span className="u-text-bold">23 courses</span>
                        <Button variant="quaternary">Find our more</Button>
                    </CardFooter>
                </CardInner>
            </CollectionCard>
        );

        expect(document.querySelector('.c-card--collection')).toHaveClass('c-card--lg');
    });
});

describe('Course Card', () => {
    test('adds the is-full class to the course card', () => {
        render(
            <CourseCard isFull>
                <CardInner>
                    <CardHeader>
                        <CardTitle>AAT Level 3 Diploma in Accounting</CardTitle>
                        <CardTitle as="h3" subtitle isSmall>
                            Single course
                        </CardTitle>
                    </CardHeader>

                    <CardBody>
                        <h4>Course options available</h4>
                        <ul>
                            <li>Course Material</li>
                            <li>Course Material + Exams</li>
                        </ul>

                        <CardPriceTag>
                            <p>
                                <span className="u-text-bold">From £23</span>/month
                            </p>
                            <p>
                                or from <span className="u-text-bold">£849 in full</span>
                            </p>
                        </CardPriceTag>

                        <Button isFull>View course</Button>
                    </CardBody>
                </CardInner>
            </CourseCard>
        );

        expect(document.querySelector('.c-card--course')).toHaveClass('is-full');
    });
});
