import {
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    Image,
    BlogCard as OSCBlogCard,
} from 'osc-ui';
import type { postCardModule } from '~/types/sanity';

interface Props {
    data: postCardModule;
}

export const BlogCard = (props: Props) => {
    const { data } = props;
    const { theme } = data?.reference;
    const heroData = data?.reference?.modules && data?.reference?.modules[0].slides;

    if (!heroData) {
        console.warn(`No hero set on post ${data?.reference?.title}`);
    }

    return (
        <OSCBlogCard
            variant="featured"
            blockLink
            isFull={data?.fullWidth}
            className={`${
                heroData?.backgroundColor ? `u-bg-color-${heroData?.backgroundColor}` : ''
            } ${heroData?.titleColor ? `u-color-${heroData?.titleColor}` : ''}`}
        >
            {heroData?.image?.src ? (
                <CardImage>
                    <Image
                        src={heroData?.image?.src ? heroData?.image?.src : ''}
                        alt={heroData?.image?.alt ? heroData?.image?.alt : ''}
                        width={heroData?.image?.width ? heroData?.image?.width : 0}
                        height={heroData?.image?.height ? heroData?.image?.height : 0}
                        fit="cover"
                        overlayColor={
                            heroData?.image?.imageStyles?.overlayColor
                                ? heroData?.image?.imageStyles?.overlayColor
                                : theme?.color
                        }
                        isGrayScale={heroData?.image?.imageStyles?.grayscale}
                        hasTransparency={heroData?.image?.imageStyles?.opacity}
                    />
                </CardImage>
            ) : null}

            <CardInner>
                <CardHeader>
                    <CardTitle>{data?.reference?.title}</CardTitle>

                    {/* // TODO: This data should come from the CMS */}
                    <CardTitle as="h3" subtitle>
                        News
                    </CardTitle>
                </CardHeader>

                {/* // TODO: This data should come from the CMS */}
                <CardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardBody>

                <CardFooter>
                    {data?.reference?.slug ? (
                        <Button variant="quinary" as="link" to={data?.reference?.slug}>
                            Read more
                        </Button>
                    ) : null}
                </CardFooter>
            </CardInner>
        </OSCBlogCard>
    );
};
