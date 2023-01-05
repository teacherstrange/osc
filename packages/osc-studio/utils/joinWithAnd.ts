export const joinWithAnd = (list: string[]) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

    return formatter.format(list);
};
