import { Checkbox } from 'osc-ui';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import type { UseRefinementListProps } from 'react-instantsearch-hooks-web';
import { AccordionHeader, AccordionItem, AccordionPanel } from 'osc-ui';

interface RefinementListProps extends UseRefinementListProps {
    accordionItem: boolean;
    title: string;
    value: string;
}

export const RefinementList = (props: RefinementListProps) => {
    const { accordionItem = false, sortBy, title, value } = props;

    const { items, refine } = useRefinementList({ ...props, sortBy, limit: 100 });

    const handleCheckboxChange = (name: string) => refine(name);

    const FacetListItems = items.map((item) => (
        <Checkbox
            count={item.count}
            key={`${item.value}_${item.isRefined}`}
            id={`refinement-${item.value}`}
            name={item.label}
            value={item.value}
            checked={item.isRefined}
            onValueChange={() => handleCheckboxChange(item.label)}
        />
    ));

    if (accordionItem) {
        return (
            <div>
                <AccordionItem value={value}>
                    <AccordionHeader icon="chevron">{title}</AccordionHeader>
                    <AccordionPanel>{FacetListItems}</AccordionPanel>
                </AccordionItem>
            </div>
        );
    }

    return <div>{FacetListItems}</div>;
};
