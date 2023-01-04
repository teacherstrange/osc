import type { KeenSliderHooks, KeenSliderInstance } from 'keen-slider/react';
import type { MutableRefObject } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

interface Props {
    instanceRef: MutableRefObject<KeenSliderInstance<{}, {}, KeenSliderHooks>>;
    currentSlide: number;
    justifyDotNav?: 'start' | 'center' | 'end';
}

export const CarouselDots = (props: Props) => {
    const { instanceRef, currentSlide } = props;
    const justify = useModifier('c-carousel__dots', props.justifyDotNav);

    const classes = classNames('c-carousel__dots', justify);

    // IF loop is true we want to the number of dots to match the number of slides
    // ELSE we want to create an array from the max index value (plus one as it's zero indexed)
    /*
     * NOTE: If you swap from loop to not loop, the dots will not update until you interact with the carousel
     * The only likely instance of being able to toggle between looping and not looping is in Storybook so I've
     * decided to leave this as is for now.
     */
    const dots =
        instanceRef.current?.track?.details?.maxIdx === Infinity
            ? instanceRef.current?.slides
            : [...Array(instanceRef.current?.track?.details?.maxIdx + 1).keys()];

    return (
        <div className={classes}>
            {dots.map((slide, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            instanceRef.current?.moveToIdx(index);
                        }}
                        className={'c-carousel__dot' + (currentSlide === index ? ' is-active' : '')}
                    >
                        <VisuallyHidden>{`Go to slide ${index + 1}`}</VisuallyHidden>
                    </button>
                );
            })}
        </div>
    );
};
