import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from 'osc-ui';
import type { accordionModule } from '~/types/sanity';

interface Props {
    module: accordionModule;
}

export const AccordionModule = (props: Props) => {
    const { module } = props;

    const defaultIndex = module.accordionItem
        ? module.accordionItem.map((accordionItem) => accordionItem.defaultOpen).indexOf(true)
        : undefined;

    const headingLevel = module.accordionHeadingLevels as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
        //  TODO: sb - add content component
        <article>
            {/* <Content /> */}
            <Accordion type="single" defaultValue={String(defaultIndex)} collapsible>
                {module.accordionItem
                    ? module.accordionItem.map((accordionItem, index) => (
                          <AccordionItem key={accordionItem._key} value={`${index}`}>
                              <AccordionHeader asChild={Boolean(headingLevel)} as={headingLevel}>
                                  {accordionItem?.heading}
                              </AccordionHeader>
                              <AccordionPanel>
                                  {/* <Content /> */}
                                  accordionItem.content
                              </AccordionPanel>
                          </AccordionItem>
                      ))
                    : null}
            </Accordion>
        </article>
    );
};
