import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { FormFieldProps } from '@sanity/base/components';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { Box, Stack, Text } from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import { withDocument } from 'part:@sanity/form-builder';
import React, { forwardRef, useState } from 'react';
import colors from '../../../../../tokens/colors';

import styles from './variantPicker.css';

interface Props {
    /**
     * Schema information
     */
    type: {
        initialValue?: string;
        description?: string;
        title?: string;
        name?: string;
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

const VariantPicker = forwardRef<HTMLSelectElement, Props>((props, ref) => {
    const { type, readOnly, markers, presence, onFocus, onBlur, onChange, value } = props;

    console.log(props);

    // Creates a unique ID for our input
    const inputId = uuid();

    const colorNames = Object.keys(colors.default).filter((color) => !color.includes('shadow'));

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(
        value
            ? colorNames.findIndex((item) => item === value)
            : type.initialValue
            ? colorNames.findIndex((item) => item === type.initialValue)
            : 0
    );

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (index) => {
        setSelectedIndex(index);
        setIsOptionsOpen(false);
    };

    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case ' ':
            case 'SpaceBar':
            case 'Enter':
                e.preventDefault();
                setSelectedThenCloseDropdown(index);
                handleChange(e);
                break;
            default:
                break;
        }
    };

    const handleListKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(
                    selectedIndex - 1 >= 0 ? selectedIndex - 1 : colorNames.length - 1
                );
                handleChange(e);
                break;
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(selectedIndex == colorNames.length - 1 ? 0 : selectedIndex + 1);
                handleChange(e);
                break;
            default:
                break;
        }
    };

    const handleChange = React.useCallback(
        // useCallback will help with performance
        (event) => {
            const inputValue = event.currentTarget.dataset.value; // get current value
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
        },
        [onChange]
    );

    return (
        <FormField
            description={type.description} // Creates description from schema
            title={type.title} // Creates label from schema title
            __unstable_markers={markers} // Handles all markers including validation
            __unstable_presence={presence} // Handles presence avatars
        >
            <Stack>
                <Box
                    className={styles['variant-picker']}
                    id={inputId}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    data-selected-value={colorNames[selectedIndex]}
                >
                    <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={isOptionsOpen}
                        className={styles['variant-picker__button']}
                        onClick={toggleOptions}
                        onKeyDown={handleListKeyDown}
                        disabled={readOnly}
                    >
                        <span
                            className={styles['variant-picker__list-item__color']}
                            style={{
                                backgroundColor:
                                    !colorNames[selectedIndex].includes('gradient') &&
                                    colors.default[colorNames[selectedIndex]],
                                backgroundImage:
                                    colorNames[selectedIndex].includes('gradient') &&
                                    colors.default[colorNames[selectedIndex]],
                                border:
                                    colorNames[selectedIndex].includes('tertiary') &&
                                    '1px solid hsl(0deg 0% 87%)',
                            }}
                        ></span>
                        {colorNames[selectedIndex]}
                        <ChevronDownIcon className={styles['variant-picker__icon']} />
                    </button>

                    <ul
                        role="listbox"
                        aria-activedescendant={colorNames[selectedIndex]}
                        tabIndex={-1}
                        onKeyDown={handleListKeyDown}
                        className={styles['variant-picker__list']}
                        style={{
                            display: isOptionsOpen ? 'block' : 'none',
                        }}
                        ref={ref}
                    >
                        {colorNames.map((color, i) => {
                            return (
                                <Text
                                    as="li"
                                    key={i}
                                    id={color}
                                    role="option"
                                    aria-selected={selectedIndex == i}
                                    tabIndex={0}
                                    onKeyDown={handleKeyDown(i)}
                                    onClick={(e) => {
                                        setSelectedThenCloseDropdown(i);
                                        handleChange(e);
                                    }}
                                    className={styles['variant-picker__list-item']}
                                    data-value={color}
                                >
                                    <span
                                        className={styles['variant-picker__list-item__color']}
                                        style={{
                                            backgroundColor:
                                                !color.includes('gradient') &&
                                                colors.default[color],
                                            backgroundImage:
                                                color.includes('gradient') && colors.default[color],
                                            border:
                                                color.includes('tertiary') &&
                                                '1px solid hsl(0deg 0% 87%)',
                                        }}
                                    ></span>
                                    {color}
                                </Text>
                            );
                        })}
                    </ul>
                </Box>
            </Stack>
        </FormField>
    );
});
VariantPicker.displayName = 'VariantPicker';

export default withDocument(VariantPicker);
