export const useVariant = (block: string, variant: string) =>
    block && variant ? `${block}--${variant}` : '';
