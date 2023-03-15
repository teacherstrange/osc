export const useModifier = (block: string, variant?: string | string[]) => {
    if (Array.isArray(variant)) {
        const result = variant.map((v) => `${block}--${v}`).join(' ');
        return result;
    }
    return block && variant ? `${block}--${variant}` : '';
};
