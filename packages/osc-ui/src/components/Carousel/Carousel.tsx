import type { FC } from 'react';
import { useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import ClassNames from 'embla-carousel-class-names';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import './carousel.scss';

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
    ssr?: boolean;
    carouselKey?: string;
};

export const CarouselInner: FC<Props> = (props) => {
    const {
        ssr,
        height,
        active,
        startIndex,
        mediaArray,
        delay,
        slidesPerPage,
        slidesToScroll,
        slideGap,
        axis,
        loop,
        carouselKey
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

    const setAriaHidden = () => {
        const slides = document.querySelectorAll('.embla__slide');
        slides.forEach((el) => {
            el.classList.add('embla-carousel-loaded');
            if (el.classList.contains('is-selected')) {
                el.ariaHidden = 'false';
            } else {
                el.ariaHidden = 'true';
            }
        });
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
            align: 'start',
            inViewThreshold: 1,
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

    const [carouselVisible, setCarouselVisible] = useState(ssr ? false : true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<Array<number>>([]);

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
            setAriaHidden();
            setCarouselVisible(true);
        });
        // return () => emblaApi.destroy();
    }, [emblaApi, setScrollSnaps, onSelect]);

    const handleResize = useDebouncedCallback(() => {
        setAriaHidden();
    }, 200);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    if (typeof document !== 'undefined') {
        let r = document.querySelector(`.embla__carousel_wrapper_${carouselKey}`) as any;
        if (r) {
            if (slidesPerPage) {
                r.style.setProperty(
                    '--embla__slidesPerPage',
                    `calc(${(1 / slidesPerPage) * 100}% + 1px)`
                );
            }
            if (slideGap) {
                r.style.setProperty('--embla__slideGap', slideGap + 'px');
            }
            if (slidesPerPage && slideGap) {
                r.style.setProperty(
                    '--embla__slidesPerPage',
                    `calc(${(1 / slidesPerPage) * 100}%)`
                );
            }
            if (axis) {
                r.style.setProperty('--embla__axis', axis === 'x' ? 'row' : 'column');
            }
            if (height) {
                r.style.setProperty('--embla__height', height + 'px');
                r.style.setProperty(
                    '--embla__style_height',
                    `calc(${parseInt(height, 10) / slidesPerPage}px - ${slideGap * 2}px)`
                );
            }
        }
    }

    const scrollTo = React.useCallback(
        (index) => {
            if (emblaApi) {
                emblaApi.scrollTo(index);
                setAriaHidden();
            }
        },
        [emblaApi]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            setAriaHidden();
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            setAriaHidden();
        }
    }, [emblaApi]);

    return (
        <Box display={'flex'} alignItems="center" flexDirection="column">
            <Box className={`embla`}>
                <Box aria-roledescription="carousel" className="embla__viewport" ref={emblaRef}>
                    <Box aria-live={delay ? 'off' : 'polite'} className="embla__container">
                        {mediaArray?.map((q, index) => {
                            return (
                                <Box
                                    key={`${index}`}
                                    aria-label={`${index + 1} of ${mediaArray?.length}`}
                                    aria-roledescription="slide"
                                    alignSelf="center"
                                    height={height}
                                    className={`embla__slide ${
                                        typeof document !== 'undefined' && carouselVisible
                                            ? 'embla-carousel-loaded'
                                            : ''
                                    }`}
                                >
                                    <div className="embla__slide_inner">
                                        <Text>{q.caption}</Text>
                                        {q.image && q.image.asset.url && (
                                            <Image
                                                className="o-img o-img--cover"
                                                height={q.image.height}
                                                width={q.image.width}
                                                src={q.image.asset.url}
                                                alt={q.altText}
                                            />
                                        )}
                                    </div>
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
        </Box>
    );
};

export const Carousel: FC<Props> = (props) => {
    const { mediaArray } = props;
    const [carouselKey, setCarouselKey] = useState('');

    useEffect(() => {
        setCarouselKey(uuidv4());
    }, []);

    return (
        <Box
            key={` ${carouselKey}-${mediaArray.length}`}
            display={'flex'}
            alignItems="center"
            flexDirection="column"
            className={`embla__carousel_wrapper_${carouselKey}`}
        >
            <CarouselInner {...props} carouselKey={carouselKey}></CarouselInner>
        </Box>
    );
};
