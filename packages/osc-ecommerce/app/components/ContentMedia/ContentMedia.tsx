import mq from 'osc-design-tokens';
import type { Columns } from 'osc-ui';
import { Carousel, Content, ContentMedia, ContentMediaBlock, Image, rem } from 'osc-ui';
import type { contentMediaModule, contentMediaSlide, formModule } from '~/types/sanity';
import { Forms } from '../Forms/Forms';
import { Row } from '../Row';

const perView = (perView: number | undefined) => (perView ? perView : 1);

export const ContentMediaModule = (props: { module: contentMediaModule; isFlush?: boolean }) => {
    const { carouselName, carouselSettings, rowSettings, slides } = props.module;
    const { isFlush } = props;
    const containerIsFull = rowSettings?.container === 'full';

    if (slides.length > 1) {
        return (
            <Row
                backgroundColor={rowSettings?.backgroundColor}
                marginBottom={rowSettings?.marginBottom}
                paddingBottom={rowSettings?.paddingBottom}
                paddingTop={rowSettings?.paddingTop}
                container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
            >
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
            </Row>
        );
    } else {
        return (
            <Row
                backgroundColor={rowSettings?.backgroundColor}
                marginBottom={rowSettings?.marginBottom}
                paddingBottom={rowSettings?.paddingBottom}
                paddingTop={rowSettings?.paddingTop}
                container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
            >
                <Slide {...slides[0]} />
            </Row>
        );
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
    if (layoutGrid === '40/50') {
        gridCols = [5, 6];
    }
    if (layoutGrid === '50/40') {
        gridCols = [6, 5];
    }

    const itemHasForm = media?.mediaType.some((media) => media._type === 'module.forms');

    return (
        <ContentMedia>
            {layoutDirection === 'media-content' ? (
                <ContentMediaBlockModule media={media} cols={gridCols[0]} />
            ) : null}

            <ContentMediaBlock
                align={contentAlignment}
                variant="content"
                cols={layoutDirection === 'content-media' ? gridCols[0] : gridCols[1]}
                // When form is present create more space between form and content
                className={layoutGrid === '50/40' && itemHasForm ? 'o-grid__col--start-8@tab' : ''}
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
                <ContentMediaBlockModule
                    media={media}
                    cols={gridCols[1]}
                    // When form is present create more space between form and content
                    className={
                        layoutGrid === '40/50' && itemHasForm ? 'o-grid__col--start-7@tab' : ''
                    }
                />
            ) : null}
        </ContentMedia>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Content Media Block
 * -----------------------------------------------------------------------------------------------*/
interface ContentMediaBlockProps extends Pick<contentMediaSlide, 'media'> {
    cols: Columns;
    className?: string;
}

const ContentMediaBlockModule = (props: ContentMediaBlockProps) => {
    const { media, cols, className } = props;

    const itemHasCover =
        media?.mediaType && media?.mediaType.some((media) => media.imageFit === 'cover')
            ? 'cover'
            : 'contain';

    let mediaBlock = null;

    if (media?.mediaType && media?.mediaType.length > 1) {
        mediaBlock = (
            <Carousel
                carouselName={media?.carouselName ? media?.carouselName : 'content media carousel'}
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
                {media?.mediaType.map((media) => {
                    if (media?.image) {
                        return (
                            <Image
                                src={media?.image?.src}
                                width={media?.image?.width}
                                height={media?.image?.height}
                                alt={media?.image?.alt}
                                fit={media?.imageFit}
                                overlayColor={media?.image?.imageStyles?.overlayColor}
                                isGrayScale={media?.image?.imageStyles?.grayscale}
                                hasTransparency={media?.image?.imageStyles?.opacity}
                                key={media?.image?._key}
                            />
                        );
                    } else if (media?._type === 'module.forms') {
                        const moduleForm = media as formModule;
                        return <Forms module={moduleForm} key={moduleForm._key} />;
                    }
                    return null;
                })}
            </Carousel>
        );
    } else if (media?.mediaType && media?.mediaType.length === 1) {
        if (media?.mediaType[0]?.image) {
            mediaBlock = (
                <Image
                    src={media?.mediaType[0]?.image?.src}
                    width={media?.mediaType[0]?.image?.width}
                    height={media?.mediaType[0]?.image?.height}
                    alt={media?.mediaType[0]?.image?.alt}
                    fit={media?.mediaType[0]?.imageFit}
                    overlayColor={media?.mediaType[0]?.image?.imageStyles?.overlayColor}
                    isGrayScale={media?.mediaType[0]?.image?.imageStyles?.grayscale}
                    hasTransparency={media?.mediaType[0]?.image?.imageStyles?.opacity}
                />
            );
        } else if (media?.mediaType[0]?._type === 'module.forms') {
            const moduleForm = media.mediaType[0] as formModule;

            mediaBlock = <Forms module={moduleForm} key={moduleForm._key} />;
        }
    }

    return (
        <ContentMediaBlock
            // IF any item is set to cover then we want to make sure we're stretching the container
            align={itemHasCover ? 'stretch' : 'center'}
            variant="media"
            cols={cols}
            className={className}
        >
            {mediaBlock}
        </ContentMediaBlock>
    );
};
