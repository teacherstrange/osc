import type { bioCardModule, cardModule, staticCardModule } from '~/types/sanity';
import { BioCard } from './BioCard';
import { SimpleCard } from './SimpleCard';

interface Props {
    module: cardModule;
}

export const Cards = (props: Props) => {
    const { module } = props;

    const cards = module.card.map((card) => {
        switch (card._type) {
            case 'card.bio':
                return <BioCard data={card as bioCardModule} key={card._key} />;

            case 'card.static':
                return <SimpleCard data={card as staticCardModule} key={card._key} />;

            default:
                return null;
        }
    });

    return <>{cards}</>;
};
