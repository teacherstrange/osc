import type { RefinementData } from './types';

export const SORTING_INDEXES = [
    {
        value: 'shopify_products_grouped_by_id_price_desc',
        label: 'Price - High to Low',
    },
    {
        value: 'shopify_products_grouped_by_id_price_asc',
        label: 'Price - Low to High',
    },
    {
        value: 'shopify_products_grouped_by_id_alphabetical_asc',
        label: 'A to Z',
    },
    {
        value: 'shopify_products_grouped_by_id_alphabetical_desc',
        label: 'Z to A',
    },
];

export const REFINEMENT_DATA: RefinementData[] = [
    {
        attribute: 'tbc',
        sortBy: ['name:asc'],
        accordionItem: true,
        title: 'Result type',
        type: 'checkbox-list',
        value: 'result',
    },
    {
        attribute: 'tbc',
        sortBy: ['name:asc'],
        accordionItem: true,
        title: 'Monthly payments',
        type: 'checkbox-list',
        value: 'monthly_payment',
    },
    {
        accordionItem: true,
        accordionValue: 'price',
        attribute: 'price',
        prefix: '£',
        start: [100, 200],
        type: 'slider',
        title: 'Price',
    },
    {
        attribute: 'meta.osc.award',
        sortBy: ['name:asc'],
        accordionItem: true,
        title: 'Award',
        type: 'checkbox-list',
        value: 'award',
    },
    {
        attribute: 'meta.osc.awarding_body',
        sortBy: ['name:asc'],
        accordionItem: true,
        title: 'Awarding body',
        type: 'checkbox-list',
        value: 'awarding_body',
    },
    {
        attribute: 'options.study-method',
        sortBy: ['name:asc'],
        accordionItem: true,
        title: 'Study method',
        type: 'checkbox-list',
        value: 'study_method',
    },
];

export const VIEW_OPTIONS = [
    {
        description: { label: 'List View' },
        value: 'listview',
        name: 'List View',
    },
    {
        description: { label: 'Grid View' },
        value: 'gridview',
        name: 'Grid View',
    },
] as const;
