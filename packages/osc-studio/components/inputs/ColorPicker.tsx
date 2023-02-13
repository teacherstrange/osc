import type { FormFieldProps } from '@sanity/base/components';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { SearchIcon } from '@sanity/icons';
import { Autocomplete, Box, Card, Flex, Text } from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import React from 'react';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
const colors =
    process.env.NODE_ENV !== 'production'
        ? require('../../../../tokens/colors')
        : require('../../tokens/colors');

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

const colorNames = Object.keys(colors.default).filter((color) => !color.includes('shadow'));

const colorValues: { value: string; payload: { color: string } }[] = colorNames.map(
    (colorName) => ({
        value: colorName,
        payload: {
            color: colors.default[colorName],
        },
    })
);

export const ColorPicker = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
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
                        <div
                            style={{
                                backgroundColor:
                                    !colors.default[value].includes('gradient') &&
                                    colors.default[value],
                                width: '1.25em',
                                height: '1.25em',
                                backgroundImage:
                                    colors.default[value].includes('gradient') &&
                                    colors.default[value],
                            }}
                        ></div>
                    ) : (
                        SearchIcon
                    )
                }
                openButton
                options={colorValues}
                placeholder={type.placeholder ? type.placeholder : 'Search for a colour'}
                // custom option render function
                renderOption={(option) => (
                    <Card as="button">
                        <Flex align="center">
                            <Box paddingLeft={3} paddingY={2}>
                                <div
                                    style={{
                                        backgroundColor:
                                            !option.payload.color.includes('gradient') &&
                                            option.payload.color,
                                        width: '1.25em',
                                        height: '1.25em',
                                        backgroundImage:
                                            option.payload.color.includes('gradient') &&
                                            option.payload.color,
                                    }}
                                ></div>
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
ColorPicker.displayName = 'ColorPicker';
