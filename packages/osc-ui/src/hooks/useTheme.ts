import type { Themes } from '../types';

export const useTheme = (theme: Themes) => (theme ? `theme--${theme}` : '');
