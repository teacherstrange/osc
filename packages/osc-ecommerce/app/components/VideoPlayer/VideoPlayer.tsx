import { Content, Image, VideoPlayer } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import type { videoModule } from '~/types/sanity';

interface Props {
    module: videoModule;
}

export const VideoPlayerModule = (props: Props) => {
    const { module } = props;

    return (
        <VideoPlayer
            key={module._key}
            url={module?.videoUrl}
            variant={module?.videoType}
            autoplay={module?.videoSettings?.autoplay}
            loop={module?.videoSettings?.loop}
            preserveContent={module?.videoSettings?.preserveContent}
            previewImage={
                module?.videoImage?.src ? (
                    <Image
                        src={module?.videoImage?.src}
                        artDirectedImages={
                            module?.videoImage?.responsiveImages
                                ? module?.videoImage?.responsiveImages
                                : undefined
                        }
                        alt={module?.videoImage?.alt}
                        width={module?.videoImage?.width}
                        height={module?.videoImage?.height}
                        overlayColor={module?.videoImage?.imageStyles?.overlayColor}
                        isGrayScale={module?.videoImage?.imageStyles?.grayscale}
                        hasTransparency={module?.videoImage?.imageStyles?.opacity}
                    />
                ) : undefined
            }
            iconPath={spritesheet}
        >
            {module?.content?.body ? (
                <Content
                    align={module?.content?.horizontalAlignment}
                    backgroundColor={module?.content?.backgroundColor}
                    marginBottom={module?.content?.marginBottom}
                    paddingBottom={module?.content?.paddingBottom}
                    paddingTop={module?.content?.paddingTop}
                    value={module?.content?.body}
                />
            ) : null}
        </VideoPlayer>
    );
};
