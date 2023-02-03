import {
    BlogCard as OSCBlogCard,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    Image,
} from 'osc-ui';
import type { postCardModule } from '~/types/sanity';

interface Props {
    data: postCardModule;
}

export const BlogCard = (props: Props) => {
    const data = props?.data?.reference;

    return (
        <OSCBlogCard
            variant="featured"
            blockLink
            isFull={props?.data?.fullWidth}
            className={
                props?.data?.backgroundColor ? `u-bg-color-${props?.data?.backgroundColor}` : ''
            }
        >
            {/* // TODO: This data should come from the CMS */}
            <CardImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674744069/db8cdf9db0ec39f88706516410a64ed7_kxoiou.png"
                    alt=""
                    width={400}
                    height={460}
                />
            </CardImage>

            <CardInner>
                <CardHeader>
                    <CardTitle>{data?.title}</CardTitle>

                    {/* // TODO: This data should come from the CMS */}
                    <CardTitle as="h3" subtitle>
                        News
                    </CardTitle>
                </CardHeader>

                {/* // TODO: This data should come from the CMS */}
                <CardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardBody>

                <CardFooter>
                    <Button variant="quinary" as="link" to={`/blog/${data?.slug?.current}`}>
                        Read more
                    </Button>
                </CardFooter>
            </CardInner>
        </OSCBlogCard>
    );
};
