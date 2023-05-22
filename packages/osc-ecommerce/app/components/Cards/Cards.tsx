import { Carousel, classNames, Content, IslandGrid, rem, useMediaQuery } from 'osc-ui';
import { useEffect, useState } from 'react';
import type {
    bioCardModule,
    cardModule,
    collectionCardModule,
    courseCardModule,
    postCardModule,
    staticCardModule,
    TypesOfCard,
} from '~/types/sanity';
import { Row } from '../Row';
import { BioCard } from './BioCard';
import { BlogCard } from './BlogCard';
import { CollectionCard } from './CollectionCard';
import { CourseCard } from './CourseCard';
import { SimpleCard } from './SimpleCard';

const Card = (props: { card: TypesOfCard }) => {
    const { card } = props;

    if (!card) return null;

    switch (card._type) {
        case 'card.bio':
            return <BioCard data={card as bioCardModule} key={card._key} />;

        case 'card.course':
            return <CourseCard product={card as courseCardModule} key={card._key} />;

        case 'card.collection':
            return <CollectionCard data={card as collectionCardModule} key={card._key} />;

        case 'card.post':
            return <BlogCard data={card as postCardModule} key={card._key} />;

        case 'card.static':
            return <SimpleCard data={card as staticCardModule} key={card._key} />;

        default:
            return null;
    }
};

interface CardsProps {
    module: cardModule;
    isFlush?: boolean;
}

export const Cards = (props: CardsProps) => {
    const { module, isFlush } = props;

    const containerIsFull = module.settings?.container === 'full';

    // ! TEMPORARY fix for tokens path not matching dev and prod environments
    // ! Once solution in place we can update this to use design token files instead
    const mq = {
        tab: 768,
        'desk-lrg': 1440,
    };

    const isSmallerThanTab = useMediaQuery(`(max-width: ${rem(mq.tab)}rem)`);
    const [showOnSmallerThanTab, setShowOnSmallerThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnSmallerThanTab(isSmallerThanTab);
    }, [isSmallerThanTab]);

    const perView = (perView: number | undefined) => (perView ? perView : 1);

    if (module?.layout === 'carousel') {
        return (
            <Row
                backgroundColor={module.settings?.backgroundColor || module?.backgroundColor}
                marginBottom={module.settings?.marginBottom || module?.marginBottom}
                paddingBottom={module.settings?.paddingBottom || module?.paddingTop}
                paddingTop={module.settings?.paddingTop || module?.paddingBottom}
                container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
            >
                {module.content?.body ? (
                    <Content
                        align={module.content.horizontalAlignment}
                        backgroundColor={
                            module.content.backgroundColor
                                ? module.content.backgroundColor
                                : undefined
                        }
                        marginBottom={module.content.marginBottom}
                        paddingBottom={module.content.paddingBottom}
                        paddingTop={module.content.paddingTop}
                        value={module.content.body}
                        buttons={module.content.buttons}
                    />
                ) : null}

                <Carousel
                    carouselName={module?.carouselName ? module?.carouselName : ''}
                    arrows={module?.carouselSettings?.arrows}
                    dotNav={module?.carouselSettings?.dotNav}
                    loop={module?.carouselSettings?.loop}
                    autoplay={module?.carouselSettings?.autoplay}
                    slidesPerView={perView(module?.carouselSettings?.slidesPerView?.mobile)}
                    startIndex={
                        module?.carouselSettings?.startIndex
                            ? module?.carouselSettings?.startIndex - 1
                            : 0
                    } // minus 1 so cms users can start at 1
                    breakpoints={{
                        [`(min-width: ${rem(mq['tab'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(module?.carouselSettings?.slidesPerView?.tablet),
                                spacing: 16,
                            },
                        },
                        [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(module?.carouselSettings?.slidesPerView?.desktop),
                                spacing: 16,
                            },
                        },
                    }}
                    adaptiveHeight
                >
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </Carousel>
            </Row>
        );
    }

    if (module.layout === 'island grid') {
        return (
            <Row
                backgroundColor={module.settings?.backgroundColor || module?.backgroundColor}
                marginBottom={module.settings?.marginBottom || module?.marginBottom}
                paddingBottom={module.settings?.paddingBottom || module?.paddingTop}
                paddingTop={module.settings?.paddingTop || module?.paddingBottom}
                container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
            >
                {module.content?.body ? (
                    <Content
                        align={module.content.horizontalAlignment}
                        backgroundColor={
                            module.content.backgroundColor
                                ? module.content.backgroundColor
                                : undefined
                        }
                        marginBottom={module.content.marginBottom}
                        paddingBottom={module.content.paddingBottom}
                        paddingTop={module.content.paddingTop}
                        value={module.content.body}
                        buttons={module.content.buttons}
                    />
                ) : null}

                <IslandGrid>
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </IslandGrid>
            </Row>
        );
    }

    // Return grid layout by default
    return (
        <Row
            backgroundColor={module.settings?.backgroundColor || module?.backgroundColor}
            marginBottom={module.settings?.marginBottom || module?.marginBottom}
            paddingBottom={module.settings?.paddingBottom || module?.paddingTop}
            paddingTop={module.settings?.paddingTop || module?.paddingBottom}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
        >
            {module.content?.body ? (
                <Content
                    align={module.content.horizontalAlignment}
                    backgroundColor={
                        module.content.backgroundColor ? module.content.backgroundColor : undefined
                    }
                    marginBottom={module.content.marginBottom}
                    paddingBottom={module.content.paddingBottom}
                    paddingTop={module.content.paddingTop}
                    value={module.content.body}
                    buttons={module.content.buttons}
                />
            ) : null}

            {/* Only become a carousel on mobile and small tablets AND when the number of cards is greater than three */}
            {showOnSmallerThanTab && module?.card.length > 3 ? (
                <Carousel
                    carouselName={module?.carouselName ? module?.carouselName : ''}
                    slidesPerView={1.2} // Set to 1.2 to peek the next card in the carousel
                >
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </Carousel>
            ) : (
                <ul className="o-grid">
                    {module.card.map((card) => {
                        const postCard = card as postCardModule;
                        const isFullWidth = postCard?.fullWidth;

                        const classes = classNames(
                            'o-grid__col--12',
                            isFullWidth ? '' : 'o-grid__col--6@tab',
                            isFullWidth ? '' : 'o-grid__col--4@desk'
                        );

                        return (
                            <li className={classes} key={card?._key}>
                                <Card card={card} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </Row>
    );
};
