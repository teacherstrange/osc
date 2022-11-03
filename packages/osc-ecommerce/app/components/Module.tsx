import type { LinkDescriptor } from '@remix-run/node';
import { Carousel, Content, Trustpilot } from 'osc-ui';
import contentStyles from 'osc-ui/dist/src-components-Content-content.css';
import type {
    carouselModule,
    contentModule,
    module,
    SanityPage,
    trustpilotModule
} from '~/types/sanity';

// So we can dynamically add the styles of each component into remix we need to create an array of stylesheet objects.
// We will then call this function in each of the `route` files where we have a dynamicLinks.
// It's a bit boiler plate-y but is currently the only way to dynamically insert styles.
export const getComponentStyles = (data: SanityPage) => {
    const styles: LinkDescriptor[] = [];

    if (!data?.modules) return [];

    for (const module of data?.modules) {
        switch (module._type) {
            case 'module.content':
                styles.push({ rel: 'stylesheet', href: contentStyles });
                break;
        }
    }

    return styles;
};

interface Props {
    module: module;
}

export default function Module(props: Props) {
    const { module } = props;

    switch (module._type) {
        case 'module.trustpilot':
            const moduleTrustpilot = module as trustpilotModule;

            return (
                <Trustpilot
                    stars={moduleTrustpilot.stars}
                    template={moduleTrustpilot.type}
                    height={moduleTrustpilot.height}
                />
            );

        case 'module.carousel':
            const moduleCarousel = module as carouselModule;

            return (
                <Carousel
                    mediaArray={moduleCarousel.mediaArray}
                    active={moduleCarousel.active} // fine
                    delay={moduleCarousel.delay} // fine
                    slidesPerPage={moduleCarousel.slidesPerPage} // fine
                    slideGap={moduleCarousel.slideGap} // fine
                    axis={moduleCarousel.axis} // fine
                    height={moduleCarousel.height} // fine
                    loop={moduleCarousel.loop} // fine
                    startIndex={moduleCarousel.startIndex} // fine
                ></Carousel>
            );

        case 'module.content':
            const moduleContent = module as contentModule;

            return moduleContent.body ? (
                <Content
                    align={moduleContent.horizontalAlignment}
                    backgroundColor={moduleContent.backgroundColor}
                    marginBottom={moduleContent.marginBottom}
                    paddingBottom={moduleContent.paddingBottom}
                    paddingTop={moduleContent.paddingTop}
                    textColor={moduleContent.textColor}
                    value={moduleContent.body}
                />
            ) : null;

        default:
            return null;
    }
}
