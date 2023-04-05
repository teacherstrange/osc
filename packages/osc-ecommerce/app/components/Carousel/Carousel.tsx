import { Carousel, Image, rem } from 'osc-ui';
import type { carouselModule } from '~/types/sanity';

// ! TEMPORARY fix for tokens path not matching dev and prod environments
// ! Once solution in place we can update this to use design token files instead
const mq = {
    tab: 768,
    'desk-lrg': 1440,
};

export const CarouselModule = (props: { module: carouselModule }) => {
    const { carouselName, slides, settings } = props?.module;

    const perView = (perView: number | undefined) => (perView ? perView : 1);

    return slides && slides.length > 0 ? (
        <Carousel
            carouselName={carouselName ? carouselName : ''}
            arrows={settings?.arrows}
            dotNav={settings?.dotNav}
            loop={settings?.loop}
            autoplay={settings?.autoplay}
            slidesPerView={perView(settings?.slidesPerView?.mobile)}
            startIndex={settings?.startIndex ? settings?.startIndex - 1 : 0} // minus 1 so cms users can start at 1
            breakpoints={{
                [`(min-width: ${rem(mq['tab'])}rem)`]: {
                    slides: {
                        origin: 'auto',
                        perView: perView(settings?.slidesPerView?.tablet),
                        spacing: 16,
                    },
                },
                [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
                    slides: {
                        origin: 'auto',
                        perView: perView(settings?.slidesPerView?.desktop),
                        spacing: 16,
                    },
                },
            }}
        >
            {slides.map((slide) =>
                slide?.image?.src ? (
                    <Image
                        key={slide?.image?._key}
                        src={slide?.image?.src}
                        width={slide?.image?.width}
                        height={slide?.image?.height}
                        alt={slide?.image?.alt}
                        artDirectedImages={
                            slide?.image?.responsiveImages
                                ? slide?.image?.responsiveImages
                                : undefined
                        }
                        className="o-img--contain"
                    />
                ) : null
            )}
        </Carousel>
    ) : null;
};
