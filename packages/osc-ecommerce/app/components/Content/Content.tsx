import { Content } from 'osc-ui';
import type { contentModule } from '~/types/sanity';
import { Row } from '../Row';

export const ContentModule = (props: { module: contentModule; isFlush?: boolean }) => {
    const { module, isFlush } = props;

    return module.body ? (
        <Row
            backgroundColor={module.backgroundColor}
            marginBottom={module.marginBottom}
            paddingBottom={module.paddingBottom}
            paddingTop={module.paddingTop}
            container={isFlush || module.fullWidth ? 'o-container--flush o-container--full' : ''}
            asChild
        >
            <Content
                align={module.horizontalAlignment}
                value={module.body}
                fullWidth={module.fullWidth ? module.fullWidth : undefined}
                buttons={module.buttons}
            />
        </Row>
    ) : null;
};
