import { classNames, Content, Icon, TextGrid, useSpacing } from 'osc-ui';
import { Fragment } from 'react';
import type { textGridModule } from '~/types/sanity';

export const TextGridModule = (props: { data: textGridModule; isFlush?: boolean }) => {
    const { data, isFlush } = props;
    const marginBottomClass = useSpacing('margin', 'bottom', data?.marginBottom);
    const paddingTopClass = useSpacing('padding', 'top', data?.paddingTop);
    const paddingBottomClass = useSpacing('padding', 'bottom', data?.paddingBottom);

    const classes = classNames(
        'o-container',
        isFlush ? 'o-container--flush' : '',
        marginBottomClass,
        paddingTopClass,
        paddingBottomClass
    );

    return (
        <TextGrid
            heading={data?.heading}
            hasInlineHeading={data?.hasInlineHeading}
            className={classes}
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
