import type { Sizes } from '../types';

export const useFontSize = (size: Sizes) => (size ? `t-font-${size}` : '');
