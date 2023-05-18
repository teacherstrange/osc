import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    Content,
    Image,
} from 'osc-ui';
import type { staticCardModule } from '~/types/sanity';
import { Button } from '../Button/Button';

interface Props {
    data: staticCardModule;
}

export const SimpleCard = (props: Props) => {
    const { data } = props;

    const src = data?.image?.image?.derived
        ? data?.image?.image?.derived[0].secure_url
        : data?.image?.image?.secure_url;

    return (
        <Card>
            {data.image ? (
                <CardImage>
                    {src && data?.image?.image ? (
                        <Image
                            src={src}
                            alt={data?.image?.alt}
                            width={data?.image?.image?.width}
                            height={data?.image?.image?.height}
                            fit="cover"
                            overlayColor={data?.image?.imageStyles?.overlayColor}
                            isGrayScale={data?.image?.imageStyles?.grayscale}
                            hasTransparency={data?.image?.imageStyles?.opacity}
                        />
                    ) : null}
                </CardImage>
            ) : null}

            <CardInner>
                <CardHeader>
                    <CardTitle
                        isSmall={data?.headingStyles?.smallHeading}
                        className={
                            data?.headingStyles?.headingColor
                                ? `u-color-${data?.headingStyles?.headingColor}`
                                : ''
                        }
                    >
                        {data?.heading}
                    </CardTitle>

                    {data?.showSubHeading && data?.subHeading ? (
                        <CardTitle as="h3" subtitle>
                            {data?.subHeading}
                        </CardTitle>
                    ) : null}
                </CardHeader>

                <CardBody>
                    {data?.content ? <Content value={data?.content} /> : null}

                    {data?.button ? <Button button={data?.button} isFull /> : null}
                </CardBody>

                <CardFooter>
                    {data?.showFooter && data?.footer ? <Content value={data?.footer} /> : null}
                </CardFooter>
            </CardInner>
        </Card>
    );
};
