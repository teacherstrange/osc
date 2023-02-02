import { Carousel, classNames, rem, useMediaQuery } from 'osc-ui';
import type {
    bioCardModule,
    cardModule,
    collectionCardModule,
    courseCardModule,
    postCardModule,
    staticCardModule,
    TypesOfCard,
} from '~/types/sanity';
import breakpoints from '../../../../../tokens/media-queries';
import { BioCard } from './BioCard';
import { BlogCard } from './BlogCard';
import { CollectionCard } from './CollectionCard';
import { CourseCard } from './CourseCard';
import { SimpleCard } from './SimpleCard';

const Card = (props: { card: TypesOfCard }) => {
    const { card } = props;

    switch (card._type) {
        case 'card.bio':
            return <BioCard data={card as bioCardModule} key={card._key} />;

        case 'card.course':
            return <CourseCard data={card as courseCardModule} key={card._key} />;

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

export const Cards = (props: { module: cardModule }) => {
    const { module } = props;
    const isSmallerThanTab = useMediaQuery(`(max-width: ${rem(breakpoints.tab)}rem)`);

    const classes = classNames(
        module?.backgroundColor ? `u-bg-color-${module?.backgroundColor}` : '',
        module?.marginBottom ? `u-mb-${module?.marginBottom}` : '',
        module?.paddingTop ? `u-pt-${module?.paddingTop}` : '',
        module?.paddingBottom ? `u-pb-${module?.paddingBottom}` : ''
    );

    if (module?.layout === 'carousel') {
        return (
            <div className={classes}>
                <Carousel
                    carouselName={module?.carouselName ? module?.carouselName : ''}
                    className="o-container"
                    adaptiveHeight
                >
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </Carousel>
            </div>
        );
    }

    // Return grid layout by default
    return (
        <div className={classes}>
            {/* Only become a carousel on mobile and small tablets AND when the number of cards is greater than three */}
            {isSmallerThanTab && module?.card.length > 3 ? (
                <Carousel
                    carouselName={module?.carouselName ? module?.carouselName : ''}
                    className="o-container"
                    adaptiveHeight
                >
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </Carousel>
            ) : (
                <ul className="o-grid o-container">
                    {module.card.map((card) => (
                        <li
                            className="o-grid__col--12 o-grid__col--6@tab o-grid__col--4@desk"
                            key={card?._key}
                        >
                            <Card card={card} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
