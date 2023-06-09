import type { formModule } from '~/types/sanity';
import { Row } from '../Row';
import { Forms } from './Forms';

interface FormsModuleProps {
    module: formModule;
    isFlush?: boolean;
}

export const FormsModule = (props: FormsModuleProps) => {
    const { module, isFlush } = props;
    const containerIsFull = module.rowSettings?.container === 'full';

    return (
        <Row
            backgroundColor={module.rowSettings?.backgroundColor}
            marginBottom={module.rowSettings?.marginBottom}
            paddingBottom={module.rowSettings?.paddingBottom}
            paddingTop={module.rowSettings?.paddingTop}
            container={isFlush || containerIsFull ? 'o-container--flush o-container--full' : ''}
        >
            <Forms module={module} />
        </Row>
    );
};
