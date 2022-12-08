import type { KeenSliderPlugin } from 'keen-slider/react';
import { useKeenSlider } from 'keen-slider/react';
import type { FC, ReactNode } from 'react';
import React, { Children, useState } from 'react';
import { classNames } from '../../utils/classNames';

import './carousel.scss';
import { Arrow } from './CarouselArrows';
import { CarouselDots } from './CarouselDots';

type SlideOrigin = 'auto' | 'center';

interface Breakpoints {
    [key: string]: {
        slides: {
            origin: SlideOrigin;
            perView: number;
            spacing: number;
        };
    };
}

export interface Props {
    /**
     * Whether the carousel should change height based on the height of the slides
     * @default false
     */
    adaptiveHeight?: boolean;

    /**
     * Whether the carousel should have arrows
     * @default false
     */
    arrows?: boolean;

    /**
     * The type of autoplay we want to use, requires loop to be true
     * @default false
     */
    autoplay?: 'smooth' | 'switch' | false;

    /**
     * The speed of the autoplay in ms
     * @default 10_000
     */
    autoPlaySpeed?: number;

    /**
     * We can pass breakpoints in as an object so we can define settings in certain instances
     */
    breakpoints?: Breakpoints;

    /**
     * The accessible name of the carousel
     * @default ''
     */
    carouselName: string;

    /**
     * The slides to render in the carousel
     */
    children: ReactNode | ReactNode[];

    /**
     * Whether the carousel should have dots
     * @default true
     */
    dotNav?: boolean;

    /**
     * The gap between slides in px
     * @default 16
     */
    gap?: number;

    /**
     * The position of the dotnav
     */
    justifyDotNav?: 'start' | 'center' | 'end';

    /**
     * Whether the carousel should loop
     * @default true
     */
    loop?: boolean;

    /**
     * The number of slides to show per view
     * @default 1
     */
    slidesPerView?: number;

    /**
     * The index of the slide to start on
     * @default 0
     */
    startIndex?: number;

    /**
     * The origin of the slides, controls how the slides are positioned on load
     * @default 'auto'
     */
    slideOrigin?: SlideOrigin;
}

export const Carousel: FC<Props> = (props: Props) => {
    const {
        carouselName,
        adaptiveHeight = false,
        autoplay = false, // loop must also be true for autoplay to work -- manage this with typescript?
        autoPlaySpeed = 10_000, // ms
        loop = true,
        children,
        slidesPerView = 1,
        arrows = false,
        dotNav = true,
        justifyDotNav = 'end',
        slideOrigin = 'auto',
        startIndex = 0,
        gap = 16, //px
        breakpoints = {
            // TODO: Update to pull breakpoints from our design tokens & should be rem
            '(min-width: 48rem)': {
                slides: {
                    origin: slideOrigin,
                    perView: 2,
                    spacing: gap,
                },
            },
            '(min-width: 90rem)': {
                slides: {
                    origin: slideOrigin,
                    perView: 3,
                    spacing: gap,
                },
            },
        },
    } = props;

    const [currentSlide, setCurrentSlide] = useState<number>(startIndex);
    const [sliderHasLoaded, setSliderHasLoaded] = useState<boolean>(false);
    const classes = classNames(
        'c-carousel',
        arrows && 'has-arrows',
        adaptiveHeight && 'has-adaptive-height'
    );

    // Keep track of which slides are in view by assigning their index to an array
    // Keen slider does expose a property called "portion" which indicates how much of the slide is visible in the viewport
    // however this doesn't always match with what we'd expect. I.e. it might look like the whole slide is visible but the portion is 0.5
    // or 0.4, meaning we are getting an inaccurate result when trying to access the slides in view. Similarly the slide may be completely out
    // of view but the portion is 0.5.
    // What I've done here is use the IntersectionObserver API to get the slides in that are intersecting with the slider container
    // and push them into an array. This is a more accurate way of getting the slides that are in view.
    const saveSlidesInView = (entries: IntersectionObserverEntry[], array: string[]) => {
        for (const entry of entries) {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
                array.push(target?.dataset.slideIndex);
            } else {
                // Find the index of the slideIndex that is no longer in view
                const index = array.findIndex((element) => element === target?.dataset.slideIndex);

                // Index will be -1 if the slideIndex is not found so we are checking that it exists
                index >= 0 && array.splice(index, 1);
            }
        }
    };

    // Handle setting the aria-hidden attribute on the slides
    const AriaPlugin: KeenSliderPlugin = (slider) => {
        const setAriaHidden = () => {
            const slidesInView = [];

            const observer = new IntersectionObserver(
                (entries) => {
                    saveSlidesInView(entries, slidesInView);

                    for (const slide of slider.slides) {
                        if (slidesInView.includes(slide.dataset.slideIndex)) {
                            slide.setAttribute('aria-hidden', 'false');
                        } else {
                            slide.setAttribute('aria-hidden', 'true');
                        }
                    }
                },
                {
                    root: slider.container,
                    rootMargin: '0px',
                    threshold: 0,
                }
            );

            for (const slide of slider.slides) {
                observer.observe(slide);
            }
        };

        slider.on('created', setAriaHidden);
        slider.on('updated', setAriaHidden);
        slider.on('slideChanged', setAriaHidden);
    };

    // Handle the adaptive height of the carousel
    const AdaptiveHeight: KeenSliderPlugin = (slider) => {
        if (!adaptiveHeight) return;

        // We want to make sure that the slides don't stretch to fill the height of the container
        slider.container.style.alignItems = 'flex-start';

        const updateHeight = () => {
            const slidesInView = [];

            const observer = new IntersectionObserver(
                (entries) => {
                    saveSlidesInView(entries, slidesInView);

                    let largestSlideHeight: number =
                        slider.slides[slider.track.details.rel].offsetHeight;

                    for (const slide of slidesInView) {
                        if (slider.slides[slide]?.offsetHeight > largestSlideHeight) {
                            largestSlideHeight = slider.slides[slide]?.offsetHeight;
                        }
                    }
                    slider.container.style.height = largestSlideHeight + 'px';
                },
                {
                    root: slider.container,
                    rootMargin: '0px',
                    threshold: 0.5, // Fire when 50% of the slide is in view
                }
            );

            for (const slide of slider.slides) {
                observer.observe(slide);
            }
        };
        slider.on('created', updateHeight);
        slider.on('updated', updateHeight);
        slider.on('slideChanged', updateHeight);
    };

    // Handle the animation of the slides, this is a "plugin" for keen-slider and gets called in the useKeenSlider hook
    const AutoPlay: KeenSliderPlugin = (slider) => {
        switch (autoplay) {
            case 'switch':
                let timeout: ReturnType<typeof setTimeout>;
                let mouseOver = false;

                function clearNextTimeout() {
                    clearTimeout(timeout);
                }

                function nextTimeout() {
                    clearTimeout(timeout);

                    if (mouseOver) return;

                    timeout = setTimeout(() => {
                        slider.next();
                    }, autoPlaySpeed);
                }

                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });

                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                    });

                    nextTimeout();
                });

                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('updated', nextTimeout);
                slider.on('destroyed', clearNextTimeout); // Prevent memory leak
                break;

            case 'smooth':
                const animation = { duration: autoPlaySpeed, easing: (t: number) => t };

                slider.on('created', () => {
                    // Decrement slides length by 1 as we are targeting the index rather than the count
                    slider.moveToIdx(slider.track.details.slides.length - 1, true, animation);
                });

                slider.on('updated', () => {
                    // Update function called due to a size change or other trigger.
                    slider.moveToIdx(
                        slider.track.details.abs + (slider.track.details.slides.length - 1),
                        true,
                        animation
                    );
                });

                slider.on('animationEnded', () => {
                    slider.moveToIdx(
                        slider.track.details.abs + (slider.track.details.slides.length - 1),
                        true,
                        animation
                    );
                });
                break;

            default:
                break;
        }
    };

    // Control the carousel with the keyboard
    const KeyboardControls: KeenSliderPlugin = (slider) => {
        let focused = false;

        const eventFocus = () => {
            focused = true;
        };

        const eventBlur = () => {
            focused = false;
        };

        const eventKeydown = (e: KeyboardEvent) => {
            if (!focused) return;

            switch (e.key) {
                case 'Left':
                case 'ArrowLeft':
                    slider.prev();
                    break;

                case 'Right':
                case 'ArrowRight':
                    slider.next();
                    break;

                default:
                    break;
            }
        };

        slider.on('created', () => {
            slider.container.setAttribute('tabindex', '0');
            slider.container.addEventListener('focus', eventFocus);
            slider.container.addEventListener('blur', eventBlur);
            slider.container.addEventListener('keydown', eventKeydown);
        });
    };

    // Handle keen-slider settings and call plugins
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: startIndex,
            created() {
                setSliderHasLoaded(true);
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            loop: loop,
            slides: {
                origin: slideOrigin,
                perView: slidesPerView,
                spacing: gap,
            },
            breakpoints,
        },
        [
            // add plugins here
            AdaptiveHeight,
            AutoPlay,
            AriaPlugin,
            KeyboardControls,
        ]
    );

    return (
        <section
            className={classes}
            aria-label={carouselName}
            aria-roledescription="carousel"
            // If autoplay is enabled, we don't want to announce the slides as they change
            // See basic carousel elements: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
            aria-live={autoplay ? 'off' : 'polite'}
            aria-atomic="true"
        >
            <div ref={sliderRef} className="c-carousel__inner keen-slider">
                {Children.map(children, (child, index) => {
                    const numberOfChildren = Children.count(children);

                    return (
                        // We need the keen-slider__slide class to be able to use the keen-slider
                        <div
                            role="group"
                            aria-label={`${index + 1} of ${numberOfChildren}`}
                            aria-roledescription="slide"
                            className="c-carousel__slide keen-slider__slide"
                            key={index}
                            data-slide-index={index}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {/* IF we have arrows enabled AND the slider has loaded AND the current object is available on the instance */}
            {arrows && sliderHasLoaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        // IF the loop is false AND the current slide is the first slide
                        disabled={!loop && currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                        // IF the loop is false AND the current slide matches the max index
                        disabled={
                            !loop && currentSlide === instanceRef.current.track.details.maxIdx
                        }
                    />
                </>
            )}

            {/* IF we have dots enabled AND the slider has loaded AND the current object is available on the instance */}
            {dotNav && sliderHasLoaded && instanceRef.current && (
                <CarouselDots
                    instanceRef={instanceRef}
                    currentSlide={currentSlide}
                    justifyDotNav={justifyDotNav}
                />
            )}
        </section>
    );
};
