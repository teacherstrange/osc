import type { module, trustpilotModule, carouselModule } from '~/types/sanity';
import { Trustpilot } from 'osc-ui';
import { Carousel } from 'osc-ui';

export default function Module({ module }: { module: module }) {
    switch (module._type) {
        case 'module.trustpilot':
            const moduleTrustpilot = module as trustpilotModule;

            return (
                <Trustpilot
                    stars={moduleTrustpilot.stars}
                    template={moduleTrustpilot.type}
                    height={moduleTrustpilot.height}
                />
            );

        case 'module.carousel':
            const moduleCarousel = module as carouselModule;

            return (
                <Carousel
                    mediaArray={moduleCarousel.mediaArray}
                    active={moduleCarousel.active} // fine
                    delay={moduleCarousel.delay} // fine
                    slidesPerPage={moduleCarousel.slidesPerPage} // fine
                    slideGap={moduleCarousel.slideGap} // fine
                    axis={moduleCarousel.axis} // fine
                    height={moduleCarousel.height} // fine
                    loop={moduleCarousel.loop} // fine
                    startIndex={moduleCarousel.startIndex} // fine
                ></Carousel>
            );

        default:
            return null;
    }
}
