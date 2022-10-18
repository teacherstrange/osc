import type { FC } from 'react';
import { useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './carousel.css';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import ClassNames from 'embla-carousel-class-names';

export type Props = {
    height?: string;
    active: boolean;
    startIndex: number;
    mediaArray: any[];
    delay: string;
    slidesPerPage: number;
    slidesToScroll: boolean;
    slideGap: number;
    axis: 'x' | 'y';
    loop: boolean;
};

export const Carousel: FC<Props> = (props) => {
    const {
        height,
        active,
        startIndex,
        mediaArray,
        delay,
        slidesPerPage,
        slidesToScroll,
        slideGap,
        axis,
        loop
    } = props;

    const delayInt = parseInt(delay, 10);

    const isActive = () => {
        // length / slidesPerPage > 1
        const length = mediaArray.length;
        if (length / slidesPerPage > 1) {
            return true;
        }
        return false;
    };

    const emblaPlugins = () => {
        if (!height && delayInt) {
            return [
                AutoHeight(),
                Autoplay({ delay: delayInt, stopOnLastSnap: !loop }),
                ClassNames()
            ];
        } else if (!height && !delayInt) {
            return [AutoHeight(), ClassNames()];
        } else if (height && delayInt) {
            return [Autoplay({ delay: delayInt, stopOnLastSnap: !loop }), ClassNames()];
        } else if (height && !delayInt) {
            return [ClassNames()];
        }
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            skipSnaps: false,
            slidesToScroll: slidesToScroll ? slidesPerPage : 1,
            containScroll: 'trimSnaps',
            startIndex: startIndex ? startIndex - 1 : 0,
            axis,
            loop,
            breakpoints: {
                '(min-width: 768px)': {
                    active: active !== undefined ? active : isActive()
                },
                '(max-width: 768px)': { active: true }
            }
        },
        emblaPlugins()
    );

    const [carouselVisible, setCarouselVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<Array<number>>([]);
    const scrollTo = React.useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('init', () => {
            setCarouselVisible(true);
        });
    }, [emblaApi, setScrollSnaps, onSelect]);

    if (typeof document !== 'undefined') {
        let r = document.querySelector(':root') as any;
        if (slidesPerPage) {
            r.style.setProperty('--embla__slidesPerPage', `calc(${(1 / slidesPerPage) * 100}%)`);
        }
        if (slideGap) {
            r.style.setProperty('--embla__slideGap', slideGap + 'px');
        }
        if (slidesPerPage && slideGap) {
            r.style.setProperty(
                '--embla__slidesPerPage',
                `calc(${(1 / slidesPerPage) * 100}% - ${slideGap * 2}px)`
            );
        }
        if (axis) {
            r.style.setProperty('--embla__axis', axis === 'x' ? 'row' : 'column');
        }
        if (height) {
            r.style.setProperty('--embla__height', height + 'px');
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
        <>
            <Box className={`embla ${carouselVisible ? 'embla-carousel-loaded' : ''}`}>
                <Box className="embla__viewport" ref={emblaRef}>
                    <Box className="embla__container">
                        {mediaArray?.map((q, index) => {
                            return (
                                <Box key={index} className="embla__slide">
                                    <Text>{q.caption}</Text>
                                    {q.image && q.image.asset.url && (
                                        <Image src={q.image.asset.url} alt={q.altText} />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                    <div className="indicators">
                        {(active !== undefined ? active : isActive()) && (
                            <button className="embla__prev" onClick={scrollPrev}>
                                Prev
                            </button>
                        )}
                        {(active !== undefined ? active : isActive()) && (
                            <button className="embla__next" onClick={scrollNext}>
                                Next
                            </button>
                        )}
                    </div>
                </Box>
            </Box>
            <div className="embla__navigator">
                {scrollSnaps.map((_, indicatorIndex) => {
                    if (active) {
                        return (
                            <Button
                                className="embla__dots"
                                key={indicatorIndex + '_indicator'}
                                style={{
                                    backgroundColor:
                                        selectedIndex === indicatorIndex ? 'lightblue' : 'lightgray'
                                }}
                                onClick={() => {
                                    scrollTo(indicatorIndex);
                                }}
                            />
                        );
                    }
                    return <></>;
                })}
            </div>
        </>
    );
};
