import { SearchIcon } from '@sanity/icons';
import { Autocomplete, Box, Card, Flex, Text } from '@sanity/ui';
import type { StringInputProps } from 'sanity';
import { set, unset } from 'sanity';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

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
    { value: 'facebook' },
    { value: 'gear' },
    { value: 'graduation-cap' },
    { value: 'grid' },
    { value: 'heart' },
    { value: 'instagram' },
    { value: 'linkedin' },
    { value: 'list' },
    { value: 'minus' },
    { value: 'paper-plane' },
    { value: 'payments' },
    { value: 'phone' },
    { value: 'pinterest' },
    { value: 'plus' },
    { value: 'search' },
    { value: 'star' },
    { value: 'tasks' },
    { value: 'tiktok' },
    { value: 'twitter' },
    { value: 'tick-box' },
    { value: 'user' },
    { value: 'users' },
];

export const IconPicker = (props: StringInputProps) => {
    const { elementProps, onChange, value = '' } = props;

    const handleChange = (value: string) => {
        onChange(value ? set(value) : unset());
    };

    return (
        <Autocomplete
            fontSize={2}
            padding={3}
            {...elementProps}
            onChange={handleChange}
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
            // placeholder={type.placeholder ? type.placeholder : 'Search for an icon'}
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
        />
    );
};
