import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    TabContent,
    TabList,
    TabTrigger,
    Tabs,
    rem,
    useMediaQuery,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import type { module, tabsModule } from '~/types/sanity';
import Module from '../Module';

// TODO: Set inner accordion styles

export const TabsModule = (props: { module: tabsModule }) => {
    const { module } = props;

    const isGreaterThanMobL = useMediaQuery(`(min-width: ${rem(mq['mob-lrg'])}rem)`);
    const [showOnGreaterThanMobL, setShowOnGreaterThanMobL] = useState<boolean>(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanMobL(isGreaterThanMobL);
    }, [isGreaterThanMobL]);

    return module?.tabItem && module?.tabItem?.length > 0 ? (
        <div className="o-container">
            {showOnGreaterThanMobL ? (
                <Tabs defaultValue={module?.tabItem[0]._key}>
                    <TabList>
                        {module?.tabItem.map((tab) => (
                            <TabTrigger value={tab._key} key={tab._key}>
                                {tab?.title}
                            </TabTrigger>
                        ))}
                    </TabList>

                    {module?.tabItem.map((tab) => (
                        <TabContent value={tab._key} key={tab._key}>
                            {tab?.modules.map((module: module) =>
                                module ? <Module key={module?._key} module={module} /> : null
                            )}
                        </TabContent>
                    ))}
                </Tabs>
            ) : (
                <Accordion defaultValue={module?.tabItem[0]._key} type="single" variant="secondary">
                    {module?.tabItem.map((tab) => (
                        <AccordionItem key={tab._key} value={`${tab._key}`}>
                            <AccordionHeader>{tab?.title}</AccordionHeader>
                            <AccordionPanel>
                                {tab?.modules.map((module: module) =>
                                    module ? <Module key={module?._key} module={module} /> : null
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    ) : null;
};
