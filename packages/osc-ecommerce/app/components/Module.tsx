import type { LinkDescriptor } from '@remix-run/node';
import { Carousel, Content, Image, Trustpilot } from 'osc-ui';
import oscUiAccordionStyles from 'osc-ui/dist/src-components-Accordion-accordion.css';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import cardStyles from 'osc-ui/dist/src-components-Card-card.css';
import contentStyles from 'osc-ui/dist/src-components-Content-content.css';
import heroStyles from 'osc-ui/dist/src-components-Hero-hero.css';
import islandGrid from 'osc-ui/dist/src-components-IslandGrid-island-grid.css';
import popoverStyles from 'osc-ui/dist/src-components-Popover-popover.css';
import textGridStyles from 'osc-ui/dist/src-components-TextGrid-text-grid.css';
import videoStyles from 'osc-ui/dist/src-components-VideoPlayer-video-player.css';
import type {
    accordionModule,
    cardModule,
    carouselModule,
    contentModule,
    heroModule,
    imageModule,
    module,
    SanityPage,
    textGridModule,
    trustpilotModule,
    videoModule,
} from '~/types/sanity';
import { AccordionModule } from './Accordion/Accordion';
import { Cards } from './Cards/Cards';
import { Hero } from './Hero/Hero';
import { TextGridModule } from './TextGrid/TextGrid';
import { VideoPlayerModule } from './VideoPlayer/VideoPlayer';

/**
 * Recursively search for all types in a Sanity schema and filter them by type
 *
 * @param sanityData - The Sanity data to extract modules from
 * @return An non unique array of all modules in the Sanity data
 */
const getTypes = (sanityData: SanityPage) => {
    const types: string[] = [];

    const recurse = (obj: SanityPage) => {
        for (const key in obj) {
            // Check whether the key exists in our object
            if (obj.hasOwnProperty(key)) {
                // IF the key is equal to `_type` push it into the types array
                // ELSE if the key is an object, recurse into it
                if (key === '_type') {
                    types.push(obj[key]);
                } else if (typeof obj[key as keyof SanityPage] === 'object') {
                    // @ts-ignore -- we can safely ignore this error because we're already checking the type of the key
                    recurse(obj[key as keyof SanityPage]);
                }
            }
        }
    };
    recurse(sanityData);

    const filteredTypes = types.filter((type) => type.includes('module.'));

    return filteredTypes;
};

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

            case 'module.cards':
                styles.push({ rel: 'stylesheet', href: cardStyles });
                styles.push({ rel: 'stylesheet', href: popoverStyles });
                styles.push({ rel: 'stylesheet', href: islandGrid });
                break;

            case 'module.content':
                styles.push({ rel: 'stylesheet', href: contentStyles });
                break;

            case 'module.hero':
                styles.push({ rel: 'stylesheet', href: heroStyles });
                break;

            case 'module.textGrid':
                styles.push({ rel: 'stylesheet', href: textGridStyles });
                break;

            case 'module.video':
                styles.push({ rel: 'stylesheet', href: videoStyles });
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

        case 'module.cards':
            const moduleCard = module as cardModule;

            return <Cards module={moduleCard} />;

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
                <article className="o-container">
                    <Content
                        align={moduleContent.horizontalAlignment}
                        backgroundColor={
                            moduleContent.backgroundColor
                                ? moduleContent.backgroundColor
                                : undefined
                        }
                        marginBottom={moduleContent.marginBottom}
                        paddingBottom={moduleContent.paddingBottom}
                        paddingTop={moduleContent.paddingTop}
                        value={moduleContent.body}
                        fullWidth={moduleContent.fullWidth ? moduleContent.fullWidth : undefined}
                        buttons={moduleContent.buttons}
                    />
                </article>
            ) : null;

        case 'module.hero':
            const moduleHero = module as heroModule;

            return <Hero data={moduleHero} key={moduleHero._key} />;

        case 'module.images':
            const moduleImage = module as imageModule<HTMLImageElement>;

            return (
                <Image
                    key={moduleImage._key}
                    src={moduleImage.src}
                    artDirectedImages={
                        moduleImage.responsiveImages ? moduleImage.responsiveImages : undefined
                    }
                    alt={moduleImage.alt}
                    width={moduleImage.width}
                    height={moduleImage.height}
                />
            );

        case 'module.textGrid':
            const moduleTextGrid = module as textGridModule;

            return <TextGridModule data={moduleTextGrid} key={moduleTextGrid._key} />;

        case 'module.video':
            const moduleVideo = module as videoModule;

            return <VideoPlayerModule module={moduleVideo} key={moduleVideo._key} />;

        default:
            return null;
    }
}
