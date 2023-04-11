import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Content } from 'osc-ui';
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
        <article className="o-container">
            {module.content ? (
                <Content
                    align={module.content?.horizontalAlignment}
                    backgroundColor={module.content?.backgroundColor}
                    marginBottom={module.content?.marginBottom}
                    paddingBottom={module.content?.paddingBottom}
                    paddingTop={module.content?.paddingTop}
                    textColor={module.content?.textColor}
                    value={module.content?.body}
                />
            ) : null}

            <Accordion type="single" defaultValue={String(defaultIndex)} collapsible>
                {module.accordionItem
                    ? module.accordionItem.map((accordionItem, index) => {
                          return (
                              <AccordionItem key={accordionItem._key} value={`${index}`}>
                                  <AccordionHeader
                                      asChild={Boolean(headingLevel)}
                                      as={headingLevel}
                                  >
                                      {accordionItem?.heading}
                                  </AccordionHeader>
                                  <AccordionPanel>
                                      {accordionItem.content ? (
                                          <Content
                                              align={accordionItem.content?.horizontalAlignment}
                                              backgroundColor={
                                                  accordionItem.content?.backgroundColor
                                              }
                                              marginBottom={accordionItem.content?.marginBottom}
                                              paddingBottom={accordionItem.content?.paddingBottom}
                                              paddingTop={accordionItem.content?.paddingTop}
                                              textColor={accordionItem.content?.textColor}
                                              value={accordionItem.content?.body}
                                          />
                                      ) : null}
                                  </AccordionPanel>
                              </AccordionItem>
                          );
                      })
                    : null}
            </Accordion>
        </article>
    );
};
