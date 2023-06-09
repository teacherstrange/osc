import { Image } from 'osc-ui';
import type { imageModule } from '~/types/sanity';
import { Row } from '../Row';

interface ImageModuleProps {
    module: imageModule<HTMLImageElement>;
    isFlush?: boolean;
}

export const ImageModule = (props: ImageModuleProps) => {
    const { module, isFlush } = props;
    const containerIsFull = module.rowSettings?.container === 'full';

    return (
        <Row
            backgroundColor={module.rowSettings?.backgroundColor}
            marginBottom={module.rowSettings?.marginBottom}
            paddingBottom={module.rowSettings?.paddingBottom}
            paddingTop={module.rowSettings?.paddingTop}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
        >
            <Image
                key={module._key}
                src={module.src}
                artDirectedImages={module.responsiveImages ? module.responsiveImages : undefined}
                alt={module.alt}
                width={module.width}
                height={module.height}
                overlayColor={module?.imageStyles?.overlayColor}
                isGrayScale={module?.imageStyles?.grayscale}
                hasTransparency={module?.imageStyles?.opacity}
            />
        </Row>
    );
};
