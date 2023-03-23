export const joinWithAnd = (list: string[]) => {
    // @ts-ignore -- note sure why ListFormat isn't recognized?
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

    return formatter.format(list);
};
