import { RefinementList } from '../Widgets/Refinements/RefinementList';
import { RefinementSlider } from '../Widgets/Refinements/RefinementSlider';
import type { RefinementData } from '../types';

export const getRefinementWidget = (refinement: RefinementData, index: number) => {
    switch (refinement.type) {
        case 'checkbox-list':
            return (
                <RefinementList
                    key={index}
                    attribute={refinement.attribute}
                    sortBy={refinement.sortBy}
                    accordionItem={refinement.accordionItem}
                    title={refinement.title}
                    value={refinement.value}
                />
            );
        case 'slider':
            return (
                <RefinementSlider
                    key={index}
                    accordionItem={refinement.accordionItem}
                    accordionValue={refinement?.accordionValue}
                    attribute={refinement.attribute}
                    prefix={refinement.prefix}
                    start={refinement.start}
                    title={refinement.title}
                />
            );
        default:
            return null;
    }
};
