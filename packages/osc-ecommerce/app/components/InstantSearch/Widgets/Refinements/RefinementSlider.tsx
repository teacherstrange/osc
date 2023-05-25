import { connectRange } from 'instantsearch.js/es/connectors';
import { useConnector } from 'react-instantsearch-hooks-web';

import type {
    RangeConnectorParams,
    RangeWidgetDescription,
} from 'instantsearch.js/es/connectors/range/connectRange';
import { useEffect, useState } from 'react';
import { Slider } from 'osc-ui';

export type UseRangeSliderProps = RangeConnectorParams;

export function useRangeSlider(props?: UseRangeSliderProps) {
    return useConnector<RangeConnectorParams, RangeWidgetDescription>(connectRange, props);
}

interface RangeSliderProps extends UseRangeSliderProps {
    start?: number[];
}

export const RefinementSlider = (props: RangeSliderProps) => {
    // TODO: send range slider event
    const { range, refine } = useRangeSlider(props);
    const [minValue, setMinValue] = useState<number>();
    const [maxValue, setMaxValue] = useState<number>();

    const [value, setValue] = useState<(number | undefined)[]>();

    useEffect(() => {
        if (!range) return;
        // Shouldn't update if the range hasn't changed. The dependency
        // is set to range, but it still enters this useEffect when the value hasn't changed
        // so guessing it's creates a new range object everytime? This is why we're setting
        // those values in state and checking against those
        if (range.min === minValue && range.max === maxValue) return;
        setMinValue(range?.min);
        setMaxValue(range?.max);
        setValue([range?.min, range?.max]);
    }, [range, minValue, maxValue]);

    return (
        <Slider
            min={minValue}
            max={maxValue}
            name="price"
            // Refines the range from Algolia
            onValueCommit={(value: [number, number]) => refine(value)}
            prefix={'£'}
            setValue={setValue}
            // This should initially set the value to the min and max range
            value={value ? value : [range?.min, range?.max]}
        ></Slider>
    );
};
