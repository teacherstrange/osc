import type { Columns } from 'osc-ui';
import { Carousel, Content, ContentMedia, ContentMediaBlock, Image, rem } from 'osc-ui';
import type { contentMediaModule, contentMediaSlide } from '~/types/sanity';
import mq from '../../../../../tokens/media-queries';

// TODO: tidy up sanity -- content media previews
// TODO: tests for this component

const perView = (perView: number | undefined) => (perView ? perView : 1);

export const ContentMediaModule = (props: { module: contentMediaModule }) => {
    const { carouselName, carouselSettings, slides } = props.module;

    if (slides.length > 1) {
        return (
            <Carousel
                carouselName={carouselName ? carouselName : 'content media carousel'}
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
                {slides?.map((slide) => (
                    <Slide {...slide} key={slide?._key} />
                ))}
            </Carousel>
        );
    } else {
        return <Slide {...slides[0]} />;
    }
};

/* -------------------------------------------------------------------------------------------------
 * Slide
 * -----------------------------------------------------------------------------------------------*/
interface SlideProps extends contentMediaSlide {}

const Slide = (props: SlideProps) => {
    const { content, contentAlignment, layoutDirection, layoutGrid, media } = props;

    let gridCols: [] | [Columns, Columns] = [6, 6];

    if (layoutGrid === '50/50') {
        gridCols = [6, 6];
    }
    if (layoutGrid === '40/60') {
        gridCols = [5, 7];
    }
    if (layoutGrid === '60/40') {
        gridCols = [7, 5];
    }

    return (
        <ContentMedia>
            {layoutDirection === 'media-content' ? (
                <ContentMediaBlockModule media={media} cols={gridCols[0]} />
            ) : null}

            <ContentMediaBlock
                align={contentAlignment}
                variant="content"
                cols={layoutDirection === 'content-media' ? gridCols[0] : gridCols[1]}
            >
                {content?.body ? (
                    // Fixed in #691
                    <Content
                        value={content?.body}
                        align={content?.horizontalAlignment}
                        backgroundColor={
                            content?.backgroundColor ? content?.backgroundColor : undefined
                        }
                        {...content}
                    />
                ) : null}
            </ContentMediaBlock>

            {layoutDirection === 'content-media' ? (
                <ContentMediaBlockModule media={media} cols={gridCols[1]} />
            ) : null}
        </ContentMedia>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Content Media Block
 * -----------------------------------------------------------------------------------------------*/
interface ContentMediaBlockProps extends Pick<contentMediaSlide, 'media'> {
    cols: Columns;
}

const ContentMediaBlockModule = (props: ContentMediaBlockProps) => {
    const { media, cols } = props;

    const itemHasCover = media?.mediaType.some((media) => media.imageFit === 'cover')
        ? 'cover'
        : 'contain';

    return (
        <ContentMediaBlock
            // IF any item is set to cover then we want to make sure we're stretching the container
            align={itemHasCover ? 'stretch' : 'center'}
            variant="media"
            cols={cols}
        >
            {media?.mediaType.length > 1 ? (
                <Carousel
                    carouselName={
                        media?.carouselName ? media?.carouselName : 'content media carousel'
                    }
                    arrows={media?.carouselSettings?.arrows}
                    dotNav={media?.carouselSettings?.dotNav}
                    loop={media?.carouselSettings?.loop}
                    autoplay={media?.carouselSettings?.autoplay}
                    slidesPerView={perView(media?.carouselSettings?.slidesPerView?.mobile)}
                    startIndex={
                        media?.carouselSettings?.startIndex
                            ? media?.carouselSettings?.startIndex - 1
                            : 0
                    } // minus 1 so cms users can start at 1
                    breakpoints={{
                        [`(min-width: ${rem(mq['tab'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(media?.carouselSettings?.slidesPerView?.tablet),
                                spacing: 16,
                            },
                        },
                        [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(media?.carouselSettings?.slidesPerView?.desktop),
                                spacing: 16,
                            },
                        },
                    }}
                >
                    {media?.mediaType.map((media) =>
                        media?.image ? (
                            <Image
                                src={media?.image?.src}
                                width={media?.image?.width}
                                height={media?.image?.height}
                                alt={media?.image?.alt}
                                className={`o-img--${media?.imageFit}`}
                                key={media?.image?._key}
                            />
                        ) : null
                    )}
                </Carousel>
            ) : media?.mediaType[0]?.image ? (
                <Image
                    src={media?.mediaType[0]?.image?.src}
                    width={media?.mediaType[0]?.image?.width}
                    height={media?.mediaType[0]?.image?.height}
                    alt={media?.mediaType[0]?.image?.alt}
                    className={`o-img--${media?.mediaType[0]?.imageFit}`}
                />
            ) : null}
        </ContentMediaBlock>
    );
};
