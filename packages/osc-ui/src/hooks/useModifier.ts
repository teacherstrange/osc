export const useModifier = (block: string, variant: string) =>
    block && variant ? `${block}--${variant}` : '';
