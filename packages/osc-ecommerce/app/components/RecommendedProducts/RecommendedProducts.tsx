import { mediaQueries as mq } from 'osc-design-tokens';
import { Carousel, rem } from 'osc-ui';
import { CourseCard } from '~/components/Cards/CourseCard';
import { useRecommendedProducts } from '~/hooks/useRecommendedProducts';
import type { recommendedProductsModule } from '~/types/sanity';
import { Row } from '../Row';

interface RecommendedProductsProps {
    module: recommendedProductsModule;
    isFlush?: boolean;
}

export const RecommendedProducts = (props: RecommendedProductsProps) => {
    const { module, isFlush } = props;
    const products = useRecommendedProducts();

    const containerIsFull = module.rowSettings?.container === 'full';

    if (products && module.numberOfProducts) {
        products.length = module.numberOfProducts;
    }

    const perView = (perView: number | undefined) => (perView ? perView : 1);

    return (
        <Row
            backgroundColor={module.rowSettings?.backgroundColor}
            marginBottom={module.rowSettings?.marginBottom}
            paddingBottom={module.rowSettings?.paddingBottom}
            paddingTop={module.rowSettings?.paddingTop}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
        >
            <h2 className="t-font-l u-text-bold u-mb-l">
                {module?.heading ? module?.heading : 'You may also like'}
            </h2>

            {products && products.length > 0 ? (
                <Carousel
                    carouselName="Recommended Products"
                    arrows={module?.carouselSettings?.arrows}
                    dotNav={module?.carouselSettings?.dotNav}
                    loop={module?.carouselSettings?.loop}
                    autoplay={module?.carouselSettings?.autoplay}
                    slidesPerView={perView(module?.carouselSettings?.slidesPerView?.mobile)}
                    startIndex={
                        module?.carouselSettings?.startIndex
                            ? module?.carouselSettings?.startIndex - 1
                            : 0
                    } // minus 1 so cms users can start at 1
                    breakpoints={{
                        [`(min-width: ${rem(mq['tab'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(module?.carouselSettings?.slidesPerView?.tablet),
                                spacing: 16,
                            },
                        },
                        [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
                            slides: {
                                origin: 'auto',
                                perView: perView(module?.carouselSettings?.slidesPerView?.desktop),
                                spacing: 16,
                            },
                        },
                    }}
                >
                    {products.map((product) => (
                        <CourseCard key={product.id} product={product} />
                    ))}
                </Carousel>
            ) : null}
        </Row>
    );
};
