import { Content, Icon, TextGrid as OSCTextGrid } from 'osc-ui';
import { Fragment } from 'react';
import type { textGridModule } from '~/types/sanity';

export const TextGrid = (props: { data: textGridModule }) => {
    const { data } = props;

    return (
        <OSCTextGrid heading={data?.heading} hasInlineHeading={data?.hasInlineHeading}>
            {data?.items?.map((item) => (
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
        </OSCTextGrid>
    );
};
