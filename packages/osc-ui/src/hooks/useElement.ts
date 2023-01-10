export const useElement = (block: string, element: string) => {
    if (block && element) {
        return `${block}__${element}`;
    } else {
        return '';
    }
};
