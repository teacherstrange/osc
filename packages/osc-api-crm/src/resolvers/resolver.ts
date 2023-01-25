import { getUserById } from 'osc-api';
import type { crmStudentArguments } from '~/types/arguments';
import type { CrmContext } from '~/types/interfaces';

export const resolvers = {
    Query: {
        crmStudent: async (_: undefined, { id }: crmStudentArguments, { hubspot }: CrmContext) => {
            const user = await getUserById(id);
            return hubspot.crm.contacts.basicApi.getById(user!.crmLink[0].externalId.toString());
        },
    },
};
