import { Checkbox } from 'osc-ui';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import type { UseRefinementListProps } from 'react-instantsearch-hooks-web';
import { AccordionHeader, AccordionItem, AccordionPanel } from 'osc-ui';

interface RefinementListProps extends UseRefinementListProps {
    accordionItem?: boolean;
    title?: string;
    value?: string;
}

export const RefinementList = (props: RefinementListProps) => {
    const { accordionItem = false, sortBy, title, value } = props;

    const { items, refine } = useRefinementList({ ...props, sortBy, limit: 100 });

    const handleCheckboxChange = (name: string) => refine(name);

    const FacetListItems = items.map((item) => (
        <div className="o-flex" key={`${item.value}_${item.isRefined}`}>
            <Checkbox
                id={`refinement-${item.value}`}
                name={item.label}
                value={item.value}
                checked={item.isRefined}
                onValueChange={() => handleCheckboxChange(item.label)}
            />
            <span className="u-pl-2xs u-color-neutral-500">({item.count})</span>
        </div>
    ));

    if (accordionItem) {
        if (!value) {
            console.error('Value required for accordion');
            return null;
        }
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
