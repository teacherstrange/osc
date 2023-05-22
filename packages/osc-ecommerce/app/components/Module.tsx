import type { LinkDescriptor } from '@remix-run/node';
import { Image, Trustpilot } from 'osc-ui';
import oscUiAccordionStyles from 'osc-ui/dist/src-components-Accordion-accordion.css';
import alertStyles from 'osc-ui/dist/src-components-Alert-alert.css';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import cardStyles from 'osc-ui/dist/src-components-Card-card.css';
import carouselStyles from 'osc-ui/dist/src-components-Carousel-carousel.css';
import checkboxStyles from 'osc-ui/dist/src-components-Checkbox-checkbox.css';
import contentStyles from 'osc-ui/dist/src-components-Content-content.css';
import contentMediaStyles from 'osc-ui/dist/src-components-ContentMedia-content-media.css';
import datePickerCalendarStyles from 'osc-ui/dist/src-components-DatePicker-calendar.css';
import dateFieldStyles from 'osc-ui/dist/src-components-DatePicker-date-field.css';
import datePickerStyles from 'osc-ui/dist/src-components-DatePicker-date-picker.css';
import datePickerReactAriaStyles from 'osc-ui/dist/src-components-DatePicker-react-aria-components.css';
import flourishStyles from 'osc-ui/dist/src-components-Flourishes-flourish.css';
import heroStyles from 'osc-ui/dist/src-components-Hero-hero.css';
import islandGrid from 'osc-ui/dist/src-components-IslandGrid-island-grid.css';
import labelStyles from 'osc-ui/dist/src-components-Label-label.css';
import popoverStyles from 'osc-ui/dist/src-components-Popover-popover.css';
import radioGroupStyles from 'osc-ui/dist/src-components-RadioGroup-radio-group.css';
import selectStyles from 'osc-ui/dist/src-components-Select-select.css';
import tabStyles from 'osc-ui/dist/src-components-Tabs-tabs.css';
import textGridStyles from 'osc-ui/dist/src-components-TextGrid-text-grid.css';
import textInputStyles from 'osc-ui/dist/src-components-TextInput-text-input.css';
import videoStyles from 'osc-ui/dist/src-components-VideoPlayer-video-player.css';
import type {
    SanityPage,
    accordionModule,
    cardModule,
    carouselModule,
    contentMediaModule,
    contentModule,
    formModule,
    heroModule,
    imageModule,
    module,
    recommendedProductsModule,
    tabsModule,
    textGridModule,
    trustpilotModule,
    videoModule,
} from '~/types/sanity';
import { getUniqueObjects } from '~/utils/getUniqueObjects';
import { AccordionModule } from './Accordion/Accordion';
import { Cards } from './Cards/Cards';
import { CarouselModule } from './Carousel/Carousel';
import { ContentModule } from './Content/Content';
import { ContentMediaModule } from './ContentMedia/ContentMedia';
import { Forms } from './Forms/Forms';
import { Hero } from './Hero/Hero';
import { RecommendedProducts } from './RecommendedProducts/RecommendedProducts';
import { TabsModule } from './Tabs/Tabs';
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

    // We then need to add all of the stylesheet dependencies for each module type.
    // We will dedupe these after they are all pushed into the styles array.
    for (const module of moduleTypes) {
        switch (module) {
            case 'module.accordion':
                styles.push(
                    { rel: 'stylesheet', href: oscUiAccordionStyles },
                    { rel: 'stylesheet', href: contentStyles }
                );
                break;

            case 'module.button':
                styles.push({ rel: 'stylesheet', href: buttonStyles });
                break;

            case 'module.cards':
            case 'module.recommendedProducts':
                styles.push(
                    { rel: 'stylesheet', href: cardStyles },
                    { rel: 'stylesheet', href: carouselStyles },
                    { rel: 'stylesheet', href: popoverStyles },
                    { rel: 'stylesheet', href: islandGrid },
                    { rel: 'stylesheet', href: contentStyles },
                    { rel: 'stylesheet', href: buttonStyles }
                );
                break;

            case 'module.content':
                styles.push(
                    { rel: 'stylesheet', href: contentStyles },
                    { rel: 'stylesheet', href: buttonStyles }
                );
                break;

            case 'module.forms':
                styles.push({ rel: 'stylesheet', href: alertStyles });
                styles.push({ rel: 'stylesheet', href: checkboxStyles });
                styles.push({ rel: 'stylesheet', href: textInputStyles });
                styles.push({ rel: 'stylesheet', href: selectStyles });
                styles.push({ rel: 'stylesheet', href: dateFieldStyles });
                styles.push({ rel: 'stylesheet', href: datePickerStyles });
                styles.push({ rel: 'stylesheet', href: datePickerCalendarStyles });
                styles.push({ rel: 'stylesheet', href: datePickerReactAriaStyles });
                styles.push({ rel: 'stylesheet', href: radioGroupStyles });
                styles.push({ rel: 'stylesheet', href: labelStyles });
                break;

            case 'module.hero':
                styles.push(
                    { rel: 'stylesheet', href: heroStyles },
                    { rel: 'stylesheet', href: carouselStyles },
                    { rel: 'stylesheet', href: contentStyles },
                    { rel: 'stylesheet', href: buttonStyles },
                    { rel: 'stylesheet', href: flourishStyles }
                );
                break;

            case 'module.textGrid':
                styles.push({ rel: 'stylesheet', href: textGridStyles });
                break;

            case 'module.contentMedia':
                styles.push({ rel: 'stylesheet', href: contentMediaStyles });
                styles.push({ rel: 'stylesheet', href: buttonStyles });
                break;

            case 'module.video':
                styles.push(
                    { rel: 'stylesheet', href: videoStyles },
                    { rel: 'stylesheet', href: contentStyles }
                );
                break;

            case 'module.tabs':
                styles.push(
                    { rel: 'stylesheet', href: tabStyles },
                    // We want to toggle over to an accordion on smaller screen so need the stylesheet
                    { rel: 'stylesheet', href: oscUiAccordionStyles }
                );
                break;
        }
    }

    // Dedupe the array of stylesheets based on the href property.
    return getUniqueObjects(styles, 'href') as LinkDescriptor[];
};

interface Props {
    module: module;
    /**
     * Applies the flush container to the children of the module
     */
    isFlush?: boolean;
}

export default function Module(props: Props) {
    const { module, isFlush } = props;

    switch (module._type) {
        case 'module.accordion':
            const moduleAccordion = module as accordionModule;

            return <AccordionModule module={moduleAccordion} isFlush={isFlush} />;

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
            return <Cards module={moduleCard} isFlush={isFlush} />;

        case 'module.carousel':
            const moduleCarousel = module as carouselModule;

            return <CarouselModule module={moduleCarousel} isFlush={isFlush} />;

        case 'module.content':
            const moduleContent = module as contentModule;

            return <ContentModule module={moduleContent} isFlush={isFlush} />;

        case 'module.forms':
            const moduleForm = module as formModule;
            return <Forms addContainer={true} module={moduleForm} key={moduleForm._key} />;

        case 'module.hero':
            const moduleHero = module as heroModule;

            return <Hero data={moduleHero} key={moduleHero._key} />;

        case 'module.contentMedia':
            const moduleContentMedia = module as contentMediaModule;

            return (
                <ContentMediaModule
                    module={moduleContentMedia}
                    isFlush={isFlush}
                    key={moduleContentMedia._key}
                />
            );

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
                    overlayColor={moduleImage?.imageStyles?.overlayColor}
                    isGrayScale={moduleImage?.imageStyles?.grayscale}
                    hasTransparency={moduleImage?.imageStyles?.opacity}
                />
            );

        case 'module.textGrid':
            const moduleTextGrid = module as textGridModule;

            return (
                <TextGridModule data={moduleTextGrid} isFlush={isFlush} key={moduleTextGrid._key} />
            );

        case 'module.video':
            const moduleVideo = module as videoModule;

            return <VideoPlayerModule module={moduleVideo} key={moduleVideo._key} />;

        case 'module.tabs':
            const moduleTabs = module as tabsModule;

            return <TabsModule module={moduleTabs} key={moduleTabs._key} />;

        case 'module.recommendedProducts':
            const moduleRecommendedProducts = module as recommendedProductsModule;

            return (
                <RecommendedProducts
                    module={moduleRecommendedProducts}
                    key={moduleRecommendedProducts._key}
                />
            );

        default:
            return null;
    }
}
