import {
    Carousel,
    Content,
    HeroContent,
    HeroImage,
    HeroInner,
    HeroTitle,
    HeroTitleGroup,
    Image,
    Hero as OSCHero,
    rem,
} from 'osc-ui';
import type { heroModule, heroSlide } from '~/types/sanity';
import { remapFlourishObject } from '~/utils/remapFlourishObject';

// ! TEMPORARY fix for tokens path not matching dev and prod environments
// ! Once solution in place we can update this to use design token files instead
const mq = {
    tab: 768,
    'desk-lrg': 1440,
};

export const Hero = (props: { data: heroModule }) => {
    const { carouselSettings, slides } = props?.data;

    const perView = (perView: number | undefined) => (perView ? perView : 1);

    if (slides.length > 1) {
        return (
            <Carousel
                carouselName={carouselSettings?.carouselName ?? ''}
                arrows={carouselSettings?.arrows}
                dotNav={carouselSettings?.dotNav}
                loop={carouselSettings?.loop}
                autoplay={carouselSettings?.autoplay}
                slidesPerView={perView(carouselSettings?.slidesPerView?.mobile)}
                startIndex={carouselSettings?.startIndex ? carouselSettings?.startIndex - 1 : 0} // minus 1 so cms users can start at 1
                breakpoints={{
                    [`(min-width: ${rem(mq['tab'])}rem)`]: {
                        slides: {
                            origin: 'auto',
                            perView: perView(carouselSettings?.slidesPerView?.tablet),
                            spacing: 16,
                        },
                    },
                    [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
                        slides: {
                            origin: 'auto',
                            perView: perView(carouselSettings?.slidesPerView?.desktop),
                            spacing: 16,
                        },
                    },
                }}
            >
                {slides?.map((slide, index) => (
                    <Slide
                        {...slide}
                        initialSlide={
                            carouselSettings?.startIndex
                                ? carouselSettings?.startIndex - 1 === index
                                : 0 === index
                        }
                        key={slide?._key}
                    />
                ))}
            </Carousel>
        );
    } else {
        return (
            <>
                {slides?.map((slide) => (
                    <Slide {...slide} initialSlide={true} key={slide?._key} />
                ))}
            </>
        );
    }
};

interface SlideProps extends heroSlide {
    /**
     * Sets the initial slide of the carousel by setting the title to h1
     */
    initialSlide: boolean;
}

const Slide = (props: SlideProps) => {
    const {
        title,
        titleColor,
        backgroundColor,
        content,
        variant,
        image,
        initialSlide,
        flourishes,
    } = props;

    const copyFlourishes = remapFlourishObject(flourishes);

    const Title = () => {
        return title ? (
            <HeroTitle
                as={initialSlide ? 'h1' : 'h2'}
                className={titleColor ? `u-color-${titleColor}` : ''}
            >
                {title}
            </HeroTitle>
        ) : null;
    };

    return (
        <OSCHero
            backgroundColor={backgroundColor ? backgroundColor : 'tertiary'}
            variant={variant ? variant : 'primary'}
        >
            <HeroInner
                flourishColor={copyFlourishes?.color}
                flourishPattern={copyFlourishes?.pattern}
                flourishVariant={copyFlourishes?.variant}
            >
                {variant === 'tertiary' ? (
                    <HeroTitleGroup>
                        <Title />
                    </HeroTitleGroup>
                ) : (
                    <Title />
                )}

                {content?.body ? (
                    <HeroContent>
                        <Content
                            value={content?.body}
                            align={content?.horizontalAlignment}
                            {...content}
                        />
                    </HeroContent>
                ) : null}

                {variant !== 'secondary' && image?.src ? (
                    <HeroImage>
                        <Image
                            src={image?.src}
                            width={image?.width}
                            height={image?.height}
                            alt={image?.alt}
                            artDirectedImages={
                                image?.responsiveImages ? image?.responsiveImages : undefined
                            }
                            overlayColor={image?.imageStyles?.overlayColor}
                            isGrayScale={image?.imageStyles?.grayscale}
                            hasTransparency={image?.imageStyles?.opacity}
                        />
                    </HeroImage>
                ) : null}
            </HeroInner>
        </OSCHero>
    );
};
