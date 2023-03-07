import {
    Card,
    CardBody,
    CardHeader,
    CardImage,
    CardInner,
    CardTitle,
    Content,
    Image,
} from 'osc-ui';
import type { bioCardModule } from '~/types/sanity';

interface Props {
    data: bioCardModule;
}

export const BioCard = (props: Props) => {
    const data = props.data.reference;

    const src = data?.image?.image?.derived
        ? data?.image?.image?.derived[0].secure_url
        : data?.image?.image?.secure_url;

    return (
        <Card>
            {data?.image ? (
                <CardImage isRounded>
                    {src && data?.image?.image ? (
                        <Image
                            src={src}
                            alt={data?.image?.alt}
                            width={data?.image?.image?.width}
                            height={data?.image?.image?.height}
                        />
                    ) : null}
                </CardImage>
            ) : null}

            <CardInner>
                <CardHeader>
                    <CardTitle>{data?.name}</CardTitle>

                    {data?.role ? (
                        <CardTitle as="h3" subtitle>
                            {data?.role}
                        </CardTitle>
                    ) : null}
                </CardHeader>

                <CardBody>{data?.bio ? <Content value={data?.bio} /> : null}</CardBody>
            </CardInner>
        </Card>
    );
};
