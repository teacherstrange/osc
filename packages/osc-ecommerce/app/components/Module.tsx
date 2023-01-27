import type { LinkDescriptor } from '@remix-run/node';
import { Carousel, Content, Image, Trustpilot } from 'osc-ui';
import oscUiAccordionStyles from 'osc-ui/dist/src-components-Accordion-accordion.css';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import contentStyles from 'osc-ui/dist/src-components-Content-content.css';
import { getTypes } from '~/models/sanity.server';
import type {
    accordionModule,
    carouselModule,
    contentModule,
    imageModule,
    module,
    SanityPage,
    trustpilotModule,
} from '~/types/sanity';
import { AccordionModule } from './Accordion/Accordion';

// So we can dynamically add the styles of each component into remix we need to create an array of stylesheet objects.
// We will then call this function in each of the `route` files where we have a dynamicLinks.
// It's a bit boiler plate-y but is currently the only way to dynamically insert styles.
export const getComponentStyles = (data: SanityPage) => {
    const styles: LinkDescriptor[] = [];

    if (!data?.modules) return [];

    // We want to create a unique array of module types to loop over.
    // If we use the original array then we run the risk of including multiple objects
    // with the same type. Causing multiples of the same stylesheet to be loaded.
    const moduleTypes = [...new Set(getTypes(data))];

    for (const module of moduleTypes) {
        switch (module) {
            case 'module.accordion':
                styles.push({ rel: 'stylesheet', href: oscUiAccordionStyles });
                break;

            case 'module.button':
                styles.push({ rel: 'stylesheet', href: buttonStyles });
                break;

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
        case 'module.accordion':
            const moduleAccordion = module as accordionModule;

            return <AccordionModule module={moduleAccordion} />;

        case 'module.trustpilot':
            const moduleTrustpilot = module as trustpilotModule;

            return (
                <Trustpilot
                    key={moduleTrustpilot._key}
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
                <article>
                    <Content
                        align={moduleContent.horizontalAlignment}
                        backgroundColor={moduleContent.backgroundColor}
                        marginBottom={moduleContent.marginBottom}
                        paddingBottom={moduleContent.paddingBottom}
                        paddingTop={moduleContent.paddingTop}
                        textColor={moduleContent.textColor}
                        value={moduleContent?.body}
                        buttons={moduleContent.buttons}
                    />
                </article>
            ) : null;

        case 'module.images':
            const moduleImage = module as imageModule<HTMLImageElement>;

            return (
                <Image
                    key={moduleImage._key}
                    src={moduleImage.src}
                    artDirectedImages={moduleImage.responsiveImages}
                    alt={moduleImage.alt}
                    width={moduleImage.width}
                    height={moduleImage.height}
                />
            );

        default:
            return null;
    }
}
