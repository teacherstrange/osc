import { Checkbox } from 'osc-ui';
import { useRefinementList } from 'react-instantsearch-hooks-web';

export const RefinementList = (props) => {
    console.log('PROPS', props);
    const { items, refine } = useRefinementList(props);
    console.log('ITEMS', items);
    // const handleCheckboxChange = (event) => {
    //     if (event !== 'Course') refine(event);
    // };

    return (
        <div>
            {items.map((item) => (
                <Checkbox
                    key={`${item.value}_${item.isRefined}`}
                    id={`refinement-${item.value}`}
                    name={item.label}
                    value={item.value}
                    checked={item.isRefined}
                />
            ))}
        </div>
    );
};
