import { SearchIcon } from '@sanity/icons';
import { Autocomplete, Box, Card, Flex, Text } from '@sanity/ui';
import { colors } from 'osc-design-tokens';
import type { StringInputProps, StringSchemaType } from 'sanity';
import { set, unset } from 'sanity';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const colorNames = Object.keys(colors.default).filter((color) => {
    if (
        color.includes('-90') ||
        color.includes('-180') ||
        color.includes('-270') ||
        color.includes('error') ||
        color.includes('success') ||
        color.includes('notice') ||
        color.includes('warning') ||
        color.includes('neutral')
    ) {
        return false;
    }

    return true;
});

colorNames.push('multicolor');

const colorValues: { value: string; payload: { color: string } }[] = colorNames.map(
    (colorName) => ({
        value: colorName,
        payload: {
            color:
                colorName === 'multicolor'
                    ? colors.default['gradient-primary']
                    : colors.default[colorName],
        },
    })
);

console.log(colorValues);

export const ColorPickerRestricted = (props: StringInputProps<StringSchemaType>) => {
    const { elementProps, onChange, value = '' } = props;

    const handleChange = (value: string) => {
        onChange(value ? set(value) : unset());
    };
    console.log('colors', colors.default);
    console.log('values', colorValues);

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
                    <div
                        style={{
                            backgroundColor:
                                colors.default[value] && !colors.default[value].includes('gradient')
                                    ? colors.default[value]
                                    : colors.default['primary'],
                            width: '1.25em',
                            height: '1.25em',
                            backgroundImage:
                                colors.default[value] && colors.default[value].includes('gradient')
                                    ? colors.default[value]
                                    : colors.default['gradient-primary'],
                        }}
                    ></div>
                ) : (
                    SearchIcon
                )
            }
            openButton
            options={colorValues}
            // custom option render function
            renderOption={(option) => (
                <Card as="button">
                    <Flex align="center">
                        <Box paddingLeft={3} paddingY={2}>
                            <div
                                style={{
                                    backgroundColor: !option.payload.color.includes('gradient')
                                        ? option.payload.color
                                        : '',
                                    width: '1.25em',
                                    height: '1.25em',
                                    backgroundImage: option.payload.color.includes('gradient')
                                        ? option.payload.color
                                        : '',
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
        />
    );
};
