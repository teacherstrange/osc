import { connectRange } from 'instantsearch.js/es/connectors';
import { useConnector } from 'react-instantsearch-hooks-web';

import type {
    RangeConnectorParams,
    RangeWidgetDescription,
} from 'instantsearch.js/es/connectors/range/connectRange';
import { AccordionHeader, AccordionItem, AccordionPanel, Slider } from 'osc-ui';
import { useEffect, useState } from 'react';

export type UseRangeSliderProps = RangeConnectorParams;

export function useRangeSlider(props?: UseRangeSliderProps) {
    return useConnector<RangeConnectorParams, RangeWidgetDescription>(connectRange, props);
}

interface RangeSliderProps extends UseRangeSliderProps {
    accordionItem?: boolean;
    prefix?: string;
    start?: number[];
    title?: string;
    accordionValue?: string;
}

export const RefinementSlider = (props: RangeSliderProps) => {
    const { accordionItem = false, accordionValue, prefix, title } = props;
    // TODO: send range slider event
    const { range, refine } = useRangeSlider(props);
    const [minValue, setMinValue] = useState<number>();
    const [maxValue, setMaxValue] = useState<number>();
    const [value, setValue] = useState<number[]>([]);

    useEffect(() => {
        if (typeof range?.min !== 'number' || typeof range?.max !== 'number') return;
        // Shouldn't update if the range hasn't changed. The dependency
        // is set to range, but it still enters this useEffect when the value hasn't changed
        // so guessing it's creates a new range object everytime? This is why we're setting
        // those values in state and checking against those
        if (range.min === minValue && range.max === maxValue) return;
        setMinValue(range?.min);
        setMaxValue(range?.max);
        setValue([range?.min, range?.max]);
    }, [range, minValue, maxValue]);

    if (typeof range?.min !== 'number' || typeof range?.max !== 'number') return null;

    const RefinementSlider = (
        <div>
            <Slider
                className="u-pt-2xl"
                min={minValue}
                max={maxValue}
                name="price"
                // Refines the range from Algolia
                onValueCommit={(value: [number, number]) => refine(value)}
                prefix={'£'}
                setExternalValue={setValue}
                // This should initially set the value to the min and max range
                value={value ? value : [range.min, range.max]}
            />
            <div className="c-slider__labels">
                <span>
                    {prefix} {range.min}
                </span>
                <span>
                    {prefix} {range.max}
                </span>
            </div>
        </div>
    );

    if (accordionItem) {
        if (!accordionValue) {
            console.error('Value required for accordion');
            return null;
        }
        return (
            <div>
                <AccordionItem value={accordionValue}>
                    <AccordionHeader icon="chevron">{title}</AccordionHeader>
                    <AccordionPanel className="u-pl-m u-pr-m">{RefinementSlider}</AccordionPanel>
                </AccordionItem>
            </div>
        );
    }

    return RefinementSlider;
};
