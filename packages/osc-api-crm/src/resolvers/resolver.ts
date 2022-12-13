import type { CrmContext } from '~/types/interfaces';

export const resolvers = {
    Query: {
        sync: async (_: undefined, __: undefined, context: CrmContext) => {
            const { hubspot } = context;
            const lineItem = await hubspot.crm.lineItems.basicApi.getById('2758269941', ['tutor2']);
            console.log({ lineItem });

            const result = await hubspot.crm.lineItems.basicApi.update('2758269941', {
                properties: {
                    tutor2: '602373870',
                },
            });
            console.log({ result });
        },
    },
};
