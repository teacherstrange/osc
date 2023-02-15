import { Content, Icon, TextGrid } from 'osc-ui';
import { Fragment } from 'react';
import type { textGridModule } from '~/types/sanity';

export const TextGridModule = (props: { data: textGridModule }) => {
    const { data } = props;

    return (
        <TextGrid
            heading={data?.heading}
            hasInlineHeading={data?.hasInlineHeading}
            className="o-container"
        >
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
        </TextGrid>
    );
};
