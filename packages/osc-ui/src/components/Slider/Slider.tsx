import * as SliderPrimitive from '@radix-ui/react-slider';
import type { ComponentPropsWithRef, Dispatch, ElementRef, SetStateAction } from 'react';
import React, { forwardRef, useState } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import './slider.scss';

export interface SliderProps extends ComponentPropsWithRef<typeof SliderPrimitive.Root> {
    /**
     * The value of the slider when initially rendered.
     */
    defaultValue?: number[];
    /**
    /**
     * The minimum value for the range.
     */
    min?: number;
    /**
     * The maximum value for the range.
     */
    max?: number;
    /**
     * The name of the slider. Submitted with its owning form
     * as part of a name/value pair.
     */
    name?: string;
    /**
     * A prefix that can be optionally passed to the slider value
     */
    prefix?: string;
    /**
     * A dispatch that can be used to set externally set the value
     */
    setExternalValue?: Dispatch<SetStateAction<number[]>>;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: string[];
}

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
    (props: SliderProps, forwardedRef) => {
        const { className, name, prefix, setExternalValue, variants, ...rest } = props;
        const [value, setValue] = useState<number[]>();

        const sliderValues = value || props.value || props.defaultValue;

        const modifier = useModifier('c-slider', variants);
        const sliderClasses = classNames(`c-slider`, modifier, className);

        return (
            <SliderPrimitive.Slider
                aria-label={name}
                className={sliderClasses}
                name={name}
                onValueChange={(event) => {
                    setValue(event);
                    setExternalValue && setExternalValue(event);
                }}
                ref={forwardedRef}
                {...rest}
            >
                <SliderPrimitive.Track className="c-slider__track">
                    <SliderPrimitive.Range className="c-slider__range" />
                </SliderPrimitive.Track>
                {sliderValues?.map((_, i) => (
                    <SliderPrimitive.SliderThumb className="c-slider__thumb" key={i}>
                        <div className="c-slider__value-container">
                            <div className="c-slider__value">
                                {prefix}
                                {sliderValues[i]}
                                <div className="c-slider__value--arrow"></div>
                            </div>
                        </div>
                    </SliderPrimitive.SliderThumb>
                ))}
            </SliderPrimitive.Slider>
        );
    }
);

Slider.displayName = 'Slider';
