import { useSortBy } from 'react-instantsearch-hooks-web';
import { Select, SelectItem } from 'osc-ui';

interface SortByProps {
    items: {
        value: string;
        label: string;
    }[];
}

export function SortBy(props: SortByProps) {
    const { items } = props;
    const { options, refine, currentRefinement } = useSortBy({ items });

    const handleCheckboxChange = (event: string) => refine(event);

    return (
        <Select
            description={{ label: 'Sort By: ', className: 'u-text-bold' }}
            defaultValue="shopify_products_grouped_by_id_alphabetical_asc"
            name={'sortBy_select'}
            setExternalValue={handleCheckboxChange}
            groupVariants={['inline', 'tertiary']}
            value={currentRefinement}
        >
            {options.map((item, index) => {
                return (
                    <div key={index}>
                        <SelectItem {...item}>{item.label}</SelectItem>
                    </div>
                );
            })}
        </Select>
    );
}
