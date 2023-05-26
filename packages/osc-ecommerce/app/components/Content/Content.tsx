import { Content } from 'osc-ui';
import type { contentModule } from '~/types/sanity';
import { Row } from '../Row';

export const ContentModule = (props: { module: contentModule; isFlush?: boolean }) => {
    const { module, isFlush } = props;
    const containerIsFull = module.rowSettings?.container === 'full';

    return module.body ? (
        <Row
            backgroundColor={module.rowSettings?.backgroundColor}
            marginBottom={module.rowSettings?.marginBottom}
            paddingBottom={module.rowSettings?.paddingBottom}
            paddingTop={module.rowSettings?.paddingTop}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
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
