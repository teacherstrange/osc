import type { Meta, Story } from '@storybook/react';
import type { Key } from 'react';
import React from 'react';
import type { AccordionProps } from './Accordion';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './Accordion';

export default {
    title: 'osc-ui/Accordion',
    component: Accordion
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

export const Primary = Template.bind({});

Primary.args = {
    children: [
        {
            title: 'Section 1 title',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            title: 'Section 2 title',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            title: 'Section 3 title',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    ],
    type: 'single',
    defaultValue: '0',
    collapsible: true
};

export const AllowMultiple = Template.bind({});

AllowMultiple.args = {
    ...Primary.args,
    type: 'multiple',
    defaultValue: ['0']
};

export const HasHeadingLevel2 = Template2.bind({});
HasHeadingLevel2.args = {
    ...Primary.args,
    type: 'multiple',
    defaultValue: ['0']
};
