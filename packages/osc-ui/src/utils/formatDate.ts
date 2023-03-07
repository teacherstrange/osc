interface DateTimeFormatOptions {
    weekday?: 'narrow' | 'short' | 'long';
    era?: 'narrow' | 'short' | 'long';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    timeZoneName?: 'short' | 'long';
    /**
     * Time zone to express it in
     */
    timeZone?: string;
    /**
     * Force 12-hour or 24-hour
     */
    hour12?: boolean;
    // Rarely-used options
    hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
    formatMatcher?: 'basic' | 'best fit';
}

export const formatDate = (dateString: string, options: DateTimeFormatOptions) => {
    // use Date.parse to check that the dateString is valid
    if (Number.isNaN(Date.parse(dateString))) {
        return 'Invalid date format';
    }

    const d = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', options).format(d);
};
