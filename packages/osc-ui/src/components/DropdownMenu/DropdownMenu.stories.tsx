import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './DropdownMenu';

import { ChevronRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import './dropdown-menu.scss';

export default {
    title: 'osc-ui/Dropdown Menu',
    component: DropdownMenu,
    parameters: {
        docs: {
            description: {
                component:
                    'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
            },
        },
    },
    argTypes: {
        defaultOpen: {
            name: 'defaultOpen',
            type: 'boolean',
            description:
                'The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.',
        },
        open: {
            name: 'open',
            type: 'boolean',
            description: `The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange.`,
        },
        onOpenChange: {
            name: 'onOpenChange',
            type: 'function',
            description: 'Event handler called when the open state of the dropdown menu changes.',
        },
        modal: {
            name: 'modal',
            type: 'boolean',
            description:
                'The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.',
        },
        dir: {
            name: 'dir',
            type: 'string',
            description:
                'The reading direction of submenus when applicable. If omitted, inherits globally from DirectionProvider or assumes LTR (left-to-right) reading mode.',
        },
    },
} as Meta;

const dropdownMenuTrigger = (
    <DropdownMenuTrigger asChild={true}>
        <button className="c-dropdown-menu__icon-button" aria-label="Customise options">
            <HamburgerMenuIcon />
        </button>
    </DropdownMenuTrigger>
);

const Template: Story = (args) => {
    const { menuItems } = args;
    return (
        <DropdownMenu>
            {dropdownMenuTrigger}
            <DropdownMenuContent>
                {menuItems.map((item, index) => (
                    <DropdownMenuItem key={index} className="c-dropdown-menu__item">
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const TemplateWithCheckboxItems: Story = (args) => {
    const [bookmarksChecked, setBookmarksChecked] = useState(false);
    const [urlsChecked, setUrlsChecked] = useState(false);

    return (
        <DropdownMenu>
            {dropdownMenuTrigger}
            <DropdownMenuContent>
                <DropdownMenuItem className="c-dropdown-menu__item">Item 1</DropdownMenuItem>
                <DropdownMenuSeparator className="c-dropdown-menu__separator" />
                <DropdownMenuCheckboxItem
                    checked={bookmarksChecked}
                    onCheckedChange={() => setBookmarksChecked(!bookmarksChecked)}
                    className="c-dropdown-menu__checkbox-item"
                >
                    Show Bookmarks <div className="c-dropdown-menu__icon--right-slot">⌘+B</div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={urlsChecked}
                    onCheckedChange={() => setUrlsChecked(!urlsChecked)}
                    className="c-dropdown-menu__checkbox-item"
                >
                    Show full URLs
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const TemplateWithRadioItems: Story = (args) => {
    const [person, setPerson] = useState('Blue');
    const { courses } = args;

    return (
        <DropdownMenu>
            {dropdownMenuTrigger}
            <DropdownMenuContent>
                <DropdownMenuItem className="c-dropdown-menu__item">
                    New Window <div className="c-dropdown-menu__icon--right-slot">⌘+N</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="c-dropdown-menu__separator" />
                <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
                    <DropdownMenuLabel className="c-dropdown-menu__label">
                        Colours
                    </DropdownMenuLabel>
                    {courses.map(({ id, value, disabled }) => (
                        <DropdownMenuRadioItem key={id} value={value} disabled={disabled}>
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const TemplateWithSubMenu: Story = (args) => {
    const { submenuItems } = args;

    return (
        <DropdownMenu>
            {dropdownMenuTrigger}
            <DropdownMenuContent>
                <DropdownMenuItem className="c-dropdown-menu__item">
                    New Window <div className="c-dropdown-menu__icon--right-slot">⌘+N</div>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="c-dropdown-menu__sub-trigger">
                        More Options
                        <div className="c-dropdown-menu__icon--right-slot">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent
                            className="c-dropdown-menu__sub-content"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            {submenuItems.map((item, index) => (
                                <DropdownMenuItem key={index} className="c-dropdown-menu__item">
                                    {item}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const Primary = Template.bind({});
export const WithCheckboxItems = TemplateWithCheckboxItems.bind({});
export const WithRadioItems = TemplateWithRadioItems.bind({});
export const WithSubMenu = TemplateWithSubMenu.bind({});

Primary.args = {
    menuItems: ['Menu item 1', 'Menu item 2', 'Menu item 3'],
};
WithRadioItems.args = {
    courses: [
        { disabled: false, id: 1, value: 'Red' },
        { disabled: true, id: 2, value: 'Yellow' },
        { disabled: false, id: 3, value: 'Green' },
        { disabled: false, id: 4, value: 'Blue' },
    ],
};
WithSubMenu.args = {
    submenuItems: ['Sub item 1', 'Sub item 2', 'Sub item 3'],
};
