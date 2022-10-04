import type { module, trustpilotModule } from '~/types/sanity';
import { Trustpilot } from 'osc-ui';

export default function Module({ module }: { module: module }) {
    switch (module._type) {
        case 'module.trustpilot':
            const moduleTrustpilot = module as trustpilotModule;

            return (
                <Trustpilot
                    stars={moduleTrustpilot.stars}
                    template={moduleTrustpilot.type}
                    height={moduleTrustpilot.height}
                />
            );

        default:
            return null;
    }
}
