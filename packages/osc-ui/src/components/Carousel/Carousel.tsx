import type { FC } from 'react';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './carousel.css';
import { Box, Image, Text } from '@chakra-ui/react';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import ClassNames from 'embla-carousel-class-names';

export type Props = {
    height?: string;
    active: boolean;
    align: 'start' | 'center' | 'end';
    speed: number;
    startIndex: number;
    inViewThreshold: number;
    mediaArray: any[];
    delay: number;
    slidesPerPage: number;
    slidesToScroll: number;
    slideGap: string;
    axis: 'x' | 'y';
    direction: 'ltr' | 'rtl';
    loop: boolean;
};

export const Carousel: FC<Props> = (props) => {
    const {
        height,
        active,
        align,
        speed,
        startIndex,
        inViewThreshold,
        mediaArray,
        delay,
        slidesPerPage,
        slidesToScroll,
        slideGap,
        axis,
        direction,
        loop
    } = props;

    const isActive = () => {
        // length / slidesPerPage > 1
        const length = mediaArray.length;
        if (length / slidesPerPage > 1) {
            return true;
        }
        return false;
    };

    const emblaPlugins = height
        ? [Autoplay({ delay }), ClassNames()]
        : [AutoHeight(), Autoplay({ delay }), ClassNames()];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            slidesToScroll,
            containScroll: 'trimSnaps',
            startIndex: startIndex ?? 0,
            inViewThreshold: inViewThreshold ?? 0.5,
            speed: speed ?? 10,
            direction,
            axis,
            loop,
            align: align ?? 'start',
            breakpoints: {
                '(min-width: 768px)': {
                    active: active !== undefined ? active : isActive()
                },
                '(max-width: 768px)': { active: true }
            }
        },
        emblaPlugins
    );

    if (typeof document !== 'undefined') {
        let r = document.querySelector(':root') as any;
        if (slidesPerPage) {
            r.style.setProperty('--embla__slidesPerPage', `calc(${(1 / slidesPerPage) * 100}%)`);
        }
        if (slideGap) {
            r.style.setProperty('--embla__slidesGap', slideGap);
        }
        if (slidesPerPage && slideGap) {
            r.style.setProperty(
                '--embla__slidesPerPage',
                `calc(${(1 / slidesPerPage) * 100}% - ${slideGap})`
            );
        }
        if (axis) {
            r.style.setProperty('--embla__axis', axis === 'x' ? 'row' : 'column');
        }
        if (height) {
            r.style.setProperty('--embla__height', height + '!important');
        }
    }

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
        }
    }, [emblaApi]);

    return (
        <Box className="embla">
            <Box className="embla__viewport" ref={emblaRef}>
                <Box className="embla__container">
                    {mediaArray.map((q, index) => {
                        return (
                            <Box key={index} className="embla__slide">
                                <Text>{q.text}</Text>
                                <Image src={q.image}></Image>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            {(active !== undefined ? active : isActive()) && (
                <>
                    <button className="embla__prev" onClick={scrollPrev}>
                        Prev
                    </button>
                    <button className="embla__next" onClick={scrollNext}>
                        Next
                    </button>
                </>
            )}
        </Box>
    );
};
