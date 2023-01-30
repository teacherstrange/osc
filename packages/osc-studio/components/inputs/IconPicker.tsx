import type { FormFieldProps } from '@sanity/base/components';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { SearchIcon } from '@sanity/icons';
import { Autocomplete, Box, Card, Flex, Text } from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import React from 'react';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface Props {
    /**
     * Schema information
     */
    type: {
        initialValue?: string;
        description?: string;
        title?: string;
        name?: string;
        placeholder?: string;
    };
    /**
     * Boolean if field is not editable
     */
    readOnly: boolean;
    /**
     * Markers including validation rules
     */
    markers: FormFieldProps['__unstable_markers'];
    /**
     * Presence information for collaborative avatars
     */
    presence: FormFieldProps['__unstable_presence'];
    /**
     * Method to handle focus state
     */
    onFocus: () => void;
    /**
     * Method to handle blur state
     */
    onBlur: () => void;
    /**
     * Method to handle patch events
     */
    onChange: (event: PatchEvent) => void;
    /**
     * Current field value
     */
    value: string;
}

// Can't use fs in a browser, so we have to manually list the icons for now 😭
const icons: { value: string }[] = [
    { value: 'arrow' },
    { value: 'assessment' },
    { value: 'bag' },
    { value: 'bell' },
    { value: 'bookmark' },
    { value: 'calendar' },
    { value: 'check' },
    { value: 'chevron-down' },
    { value: 'chevron-left' },
    { value: 'chevron-right' },
    { value: 'chevron-up' },
    { value: 'clipboard' },
    { value: 'clock' },
    { value: 'close' },
    { value: 'content' },
    { value: 'dashboard' },
    { value: 'discussion' },
    { value: 'document' },
    { value: 'envelope' },
    { value: 'folder' },
    { value: 'gear' },
    { value: 'graduation-cap' },
    { value: 'grid' },
    { value: 'heart' },
    { value: 'list' },
    { value: 'minus' },
    { value: 'paper-plane' },
    { value: 'payments' },
    { value: 'phone' },
    { value: 'plus' },
    { value: 'search' },
    { value: 'star' },
    { value: 'tasks' },
    { value: 'tick-box' },
    { value: 'user' },
    { value: 'users' },
];

export const IconPicker = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { type, readOnly, markers, presence, onFocus, onBlur, onChange, value } = props;
    // Creates a unique ID for our input
    const inputId = uuid();

    return (
        <FormField
            description={type.description} // Creates description from schema
            title={type.title} // Creates label from schema title
            __unstable_markers={markers} // Handles all markers including validation
            __unstable_presence={presence} // Handles presence avatars
        >
            <Autocomplete
                id={inputId}
                fontSize={2}
                padding={3}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readOnly}
                onChange={(value) => {
                    onChange(PatchEvent.from(value ? set(value) : unset()));
                }}
                // custom search filter
                filterOption={(query, option) =>
                    option.value.toLowerCase().indexOf(query.toLowerCase()) > -1
                }
                icon={
                    value ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 25 25"
                            fill="none"
                        >
                            <use href={`/static/spritesheet.svg#${value}`} />
                        </svg>
                    ) : (
                        SearchIcon
                    )
                }
                openButton
                options={icons}
                placeholder={type.placeholder ? type.placeholder : 'Search for an icon'}
                // custom option render function
                renderOption={(option) => (
                    <Card as="button">
                        <Flex align="center">
                            <Box paddingLeft={3} paddingY={2}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                >
                                    <use href={`/static/spritesheet.svg#${option.value}`} />
                                </svg>
                            </Box>
                            <Box flex={1} padding={3}>
                                <Text size={2}>{capitalizeFirstLetter(option.value)}</Text>
                            </Box>
                        </Flex>
                    </Card>
                )}
                value={capitalizeFirstLetter(value)}
                ref={ref}
            />
        </FormField>
    );
});
IconPicker.displayName = 'IconPicker';
