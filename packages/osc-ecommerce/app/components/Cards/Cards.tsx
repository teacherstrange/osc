import { Carousel, classNames, useSpacing } from 'osc-ui';
import type {
    bioCardModule,
    cardModule,
    collectionCardModule,
    courseCardModule,
    postCardModule,
    staticCardModule,
} from '~/types/sanity';
import { BioCard } from './BioCard';
import { BlogCard } from './BlogCard';
import { CollectionCard } from './CollectionCard';
import { CourseCard } from './CourseCard';
import { SimpleCard } from './SimpleCard';

interface Props {
    module: cardModule;
}

const Card = (props) => {
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

export const Cards = (props: Props) => {
    const { module } = props;
    const marginBottomClass = useSpacing('margin', 'bottom', module?.marginBottom);
    const paddingTopClass = useSpacing('padding', 'top', module?.paddingTop);
    const paddingBottomClass = useSpacing('padding', 'bottom', module?.paddingBottom);

    const classes = classNames(
        module?.backgroundColor && `u-bg-color-${module?.backgroundColor}`,
        module?.marginBottom && marginBottomClass,
        module?.paddingTop && paddingTopClass,
        module?.paddingBottom && paddingBottomClass
    );

    if (module?.layout === 'carousel') {
        return (
            <div className={classes}>
                <Carousel className="o-container" adaptiveHeight>
                    {module.card.map((card) => (
                        <Card card={card} key={card?._key} />
                    ))}
                </Carousel>
            </div>
        );
    }

    // Return grid layout by default
    // TODO: Responsive grid >>> carousel
    return (
        <div className={classes}>
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
        </div>
    );
};
