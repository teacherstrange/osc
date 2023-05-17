import type { Meta, Story } from '@storybook/react';
import type { Key } from 'react';
import React from 'react';
import type { AccordionProps } from './Accordion';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './Accordion';

export default {
    title: 'osc-ui/Accordion',
    component: Accordion,
    subcomponents: { AccordionHeader, AccordionItem, AccordionPanel },
    parameters: {
        docs: {
            description: {
                component:
                    'The accordion component lets users show and hide sections of related content on a page. Extended from the [Radix Accordion primitive](https://www.radix-ui.com/docs/primitives/components/accordion).',
            },
        },
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        className: {
            description: 'Custom class',
            type: 'string',
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        collapsible: {
            description:
                'When `type` is `"single"`, allows closing content when clicking trigger for an open item.',
            table: {
                type: {
                    summary: 'boolean',
                },
                defaultValue: {
                    summary: 'true',
                },
            },
        },
        disabled: {
            description:
                'When true, prevents the user from interacting with the accordion and all its items.',
            table: {
                type: {
                    summary: 'boolean',
                },
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        defaultValue: {
            description:
                'The value of the item to expand when initially rendered and `type` is `"single"`. Use when you do not need to control the state of the items.',
            type: 'string',
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        onValueChange: {
            description:
                'Event handler called when the expanded state of an item changes and `type` is `"single"` or `"multiple"`.',
            table: {
                type: {
                    name: 'function',
                    summary: '(value: string) => void',
                },
            },
        },
        type: {
            description: 'Determines whether one or multiple items can be opened at the same time.',
            type: 'string',
            table: {
                type: {
                    summary: "'single' | 'multiple'",
                },
                defaultValue: {
                    summary: 'single',
                },
            },
            options: ['single', 'multiple'],
            control: {
                type: 'select',
            },
        },
        value: {
            description:
                'The controlled value of the item to expand when `type` is `"single"` or `"multiple`. Must be used in conjunction with `onValueChange`.',
            type: 'string',
            table: {
                type: {
                    summary: 'string | string[]',
                },
            },
        },
        variant: {
            description: 'Sets the variant style of the accordion.',
            type: 'string',
            table: {
                type: {
                    summary: 'primary | secondary | tertiary',
                },
            },
            options: ['primary', 'secondary', 'tertiary'],
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<AccordionProps> = ({ children, ...args }) => (
    <Accordion {...args}>
        {Array.isArray(children)
            ? children.map(
                  (
                      child: {
                          title: string;
                          content: string;
                      },
                      i: Key
                  ) => (
                      <AccordionItem key={i} value={`${i}`}>
                          <AccordionHeader>{child.title}</AccordionHeader>
                          <AccordionPanel>{child.content}</AccordionPanel>
                      </AccordionItem>
                  )
              )
            : null}
    </Accordion>
);

const Template2: Story<AccordionProps> = ({ children, ...args }) => (
    <Accordion {...args}>
        {Array.isArray(children)
            ? children.map((child, i: Key) => (
                  <AccordionItem key={i} value={`${i}`}>
                      <AccordionHeader asChild={true} as="h2">
                          {child.title}
                      </AccordionHeader>
                      <AccordionPanel>{child.content}</AccordionPanel>
                  </AccordionItem>
              ))
            : null}
    </Accordion>
);

const NestedTemplate: Story<AccordionProps> = ({ children, ...args }) => (
    <Accordion {...args} variant="secondary">
        {Array.isArray(children)
            ? children.map((child, i: Key) => (
                  <AccordionItem key={i} value={`${i}`}>
                      <AccordionHeader icon="chevron" asChild={true} as="h2">
                          {child.title}
                      </AccordionHeader>
                      <AccordionPanel>
                          <Accordion type="single" defaultValue="child-0" collapsible>
                              <AccordionItem value="child-0">
                                  <AccordionHeader icon="plusMinus" asChild={true} as="h3">
                                      Heading
                                  </AccordionHeader>
                                  <AccordionPanel>
                                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
                                      ipsam temporibus et veniam eveniet dolorum? Eaque alias
                                      voluptate quis perferendis repellat omnis temporibus maiores
                                      dolores ad, amet, rerum sed nesciunt!
                                  </AccordionPanel>
                              </AccordionItem>
                              <AccordionItem value="child-1">
                                  <AccordionHeader icon="plusMinus" asChild={true} as="h3">
                                      Heading
                                  </AccordionHeader>
                                  <AccordionPanel>
                                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
                                      ipsam temporibus et veniam eveniet dolorum? Eaque alias
                                      voluptate quis perferendis repellat omnis temporibus maiores
                                      dolores ad, amet, rerum sed nesciunt!
                                  </AccordionPanel>
                              </AccordionItem>
                          </Accordion>
                      </AccordionPanel>
                  </AccordionItem>
              ))
            : null}
    </Accordion>
);

const IconTemplate: Story<AccordionProps> = ({ children, ...args }) => (
    <Accordion {...args}>
        {Array.isArray(children)
            ? children.map((child, i: Key) => (
                  <AccordionItem key={i} value={`${i}`}>
                      <AccordionHeader icon="chevron">{child.title}</AccordionHeader>
                      <AccordionPanel>{child.content}</AccordionPanel>
                  </AccordionItem>
              ))
            : null}
    </Accordion>
);

export const Primary = Template.bind({});
Primary.args = {
    children: [
        {
            title: 'What is included in the cost of my course?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Do I have to sit an exam?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'How will my work get assessed?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ],
    type: 'single',
    defaultValue: '0',
    collapsible: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    ...Primary.args,
    variant: 'tertiary',
};

export const Quaternary = Template.bind({});
Quaternary.args = {
    ...Primary.args,
    variant: 'quaternary',
};

export const AllowMultiple = Template.bind({});
AllowMultiple.args = {
    ...Primary.args,
    type: 'multiple',
    defaultValue: ['0'],
};
AllowMultiple.parameters = {
    docs: {
        description: {
            story: 'Allow multiple panels to be open at a time by passing the `type="multiple"` prop.',
        },
    },
};

export const HasHeadingLevel2 = Template2.bind({});
HasHeadingLevel2.args = {
    ...Primary.args,
    defaultValue: ['0'],
};
HasHeadingLevel2.parameters = {
    docs: {
        description: {
            story: 'Change the heading level by passing `asChild={true}` & `as="h2"` to the `AccordionHeader` subcomponent.',
        },
    },
};

export const HasChevronIcon = IconTemplate.bind({});
HasChevronIcon.args = {
    ...Primary.args,
};
HasChevronIcon.parameters = {
    docs: {
        description: {
            story: 'Change the icon by passing `icon="chevron"` to the `AccordionHeader` subcomponent.',
        },
    },
};

export const HasNestedAccordion = NestedTemplate.bind({});
HasNestedAccordion.args = {
    ...Primary.args,
};
HasNestedAccordion.parameters = {
    docs: {
        description: {
            story: 'You can nest accordions by passing an `Accordion` component as a child to the `AccordionPanel` subcomponent.',
        },
    },
};
