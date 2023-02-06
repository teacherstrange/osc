import { Content, Image, VideoPlayer as OSCVideoPlayer } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import type { videoModule } from '~/types/sanity';

interface Props {
    data: videoModule;
}

export const VideoPlayer = (props: Props) => {
    const { data } = props;

    return (
        <OSCVideoPlayer
            key={data._key}
            url={data?.videoUrl}
            variant={data?.videoType}
            autoplay={data?.videoSettings?.autoplay}
            loop={data?.videoSettings?.loop}
            preserveContent={data?.videoSettings?.preserveContent}
            previewImage={
                data?.videoImage?.src ? (
                    <Image
                        src={data?.videoImage?.src}
                        artDirectedImages={data?.videoImage?.responsiveImages}
                        alt={data?.videoImage?.alt}
                        width={data?.videoImage?.width}
                        height={data?.videoImage?.height}
                    />
                ) : undefined
            }
            iconPath={spritesheet}
        >
            {data?.content?.body ? (
                <Content
                    align={data?.content?.horizontalAlignment}
                    backgroundColor={data?.content?.backgroundColor}
                    marginBottom={data?.content?.marginBottom}
                    paddingBottom={data?.content?.paddingBottom}
                    paddingTop={data?.content?.paddingTop}
                    value={data?.content?.body}
                />
            ) : null}
        </OSCVideoPlayer>
    );
};
