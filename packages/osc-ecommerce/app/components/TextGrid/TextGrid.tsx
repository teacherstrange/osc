import { Content, Icon, TextGrid } from 'osc-ui';
import { Fragment } from 'react';
import type { textGridModule } from '~/types/sanity';
import { Row } from '../Row';

interface TextGridModuleProps {
    module: textGridModule;
    isFlush?: boolean;
}

export const TextGridModule = (props: TextGridModuleProps) => {
    const { module, isFlush } = props;
    const containerIsFull = module.rowSettings?.container === 'full';

    return (
        <Row
            backgroundColor={module.rowSettings?.backgroundColor}
            marginBottom={module.rowSettings?.marginBottom || module?.marginBottom}
            paddingBottom={module.rowSettings?.paddingBottom || module?.paddingTop}
            paddingTop={module.rowSettings?.paddingTop || module?.paddingBottom}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
        >
            <TextGrid heading={module?.heading} hasInlineHeading={module?.hasInlineHeading}>
                {module?.items?.map((item) => (
                    <Fragment key={item?._key}>
                        {item?.icon ? <Icon id={item?.icon} /> : null}

                        {item?.content?.body ? (
                            <Content
                                value={item?.content?.body}
                                align={item?.content?.horizontalAlignment}
                                backgroundColor={
                                    item?.content?.backgroundColor
                                        ? item?.content?.backgroundColor
                                        : undefined
                                }
                                {...item?.content}
                            />
                        ) : null}
                    </Fragment>
                ))}
            </TextGrid>
        </Row>
    );
};
