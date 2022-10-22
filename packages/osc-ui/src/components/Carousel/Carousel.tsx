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
        slideGap,
        axis,
        loop,
        carouselKey
    } = props;

    const delayInt = parseInt(delay, 10);

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

    const trueSlidesPerPage = () => {
        if (typeof window === 'undefined') return 1;
        if (window.matchMedia('(min-width: 768px)').matches) return slidesPerPage;
        if (window.matchMedia('(min-width: 640px)').matches) return 2;
        return 1;
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
            active,
            align: 'start',
            inViewThreshold: 1,
            skipSnaps: false,
            slidesToScroll: trueSlidesPerPage(),
            containScroll: 'trimSnaps',
            startIndex: startIndex ? startIndex - 1 : 0,
            axis,
            loop
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
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('init', () => {
            setAriaHidden();
            setCarouselVisible(true);
        });
        // return () => emblaApi.destroy();
    }, [emblaApi, setScrollSnaps, onSelect, scrollSnaps]);

    const handleResize = useDebouncedCallback(() => {
        if (!emblaApi) return;
        onSelect();
        setAriaHidden();
        setScrollSnaps(emblaApi.scrollSnapList());
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
        <Box width={'100%'} display={'flex'} alignItems="center" flexDirection="column">
            <Box width={'100%'} className={`embla`}>
                <Box
                    width={'100%'}
                    aria-roledescription="carousel"
                    className="embla__viewport"
                    ref={emblaRef}
                >
                    <Box
                        width={'100%'}
                        aria-live={delay ? 'off' : 'polite'}
                        className="embla__container"
                    >
                        {mediaArray?.map((q, index) => {
                            return (
                                <Box
                                    width={'100%'}
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
                                        <Text className="embla__slide_caption">{q.caption}</Text>
                                        {q.image && q.image.asset.url && (
                                            <Image
                                                className="o-img o-img--cover"
                                                height={q.image.height}
                                                width={'100%'}
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
                        {scrollSnaps.length != 1 && (
                            <button className="embla__prev" onClick={scrollPrev}>
                                Prev
                            </button>
                        )}
                        {scrollSnaps.length != 1 && (
                            <button className="embla__next" onClick={scrollNext}>
                                Next
                            </button>
                        )}
                    </div>
                </Box>
            </Box>
            <div className="embla__navigator">
                {scrollSnaps.map((_, indicatorIndex) => {
                    if (scrollSnaps.length != 1) {
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
            width={'100%'}
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
