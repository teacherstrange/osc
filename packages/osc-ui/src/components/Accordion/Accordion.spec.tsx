/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Content } from '../Content/Content';
import { textContent } from '../Content/textContent';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './Accordion';

test('has the correct heading level', () => {
    const { rerender } = render(
        <Accordion type="single">
            <AccordionItem value="O">
                <AccordionHeader>Heading level 3</AccordionHeader>
                <AccordionPanel>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet culpa ea
                    praesentium officiis doloribus commodi earum voluptas doloremque fugiat
                    similique, voluptatibus corporis. Vero laboriosam nihil esse dolores impedit
                    aut!
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    rerender(
        <Accordion type="single">
            <AccordionItem value="0">
                <AccordionHeader asChild as="h2">
                    Heading level 2
                </AccordionHeader>
                <AccordionPanel>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet culpa ea
                    praesentium officiis doloribus commodi earum voluptas doloremque fugiat
                    similique, voluptatibus corporis. Vero laboriosam nihil esse dolores impedit
                    aut!
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('extends the classname on each component', () => {
    render(
        <Accordion type="single" className="accordion-classname">
            <AccordionItem value="0" className="item-classname">
                <AccordionHeader className="heading-classname">Heading level 2</AccordionHeader>
                <AccordionPanel className="panel-classname">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet culpa ea
                    praesentium officiis doloribus commodi earum voluptas doloremque fugiat
                    similique, voluptatibus corporis. Vero laboriosam nihil esse dolores impedit
                    aut!
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

    expect(document.querySelector('.accordion-classname')).toBeInTheDocument();
    expect(document.querySelector('.item-classname')).toBeInTheDocument();
    expect(document.querySelector('.heading-classname')).toBeInTheDocument();
    expect(document.querySelector('.panel-classname')).toBeInTheDocument();
});

test('accepts content component as child', async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <Accordion type="single" className="accordion-classname">
                <AccordionItem value="0" className="item-classname">
                    <AccordionHeader className="heading-classname">Heading level 2</AccordionHeader>
                    <AccordionPanel className="panel-classname">
                        <Content value={textContent} align="left" />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Heading level 2' }));

    const region = screen.getByRole('region');
    const content = document.querySelector('.c-content');

    expect(region).toHaveAttribute('data-state', 'open');
    expect(content).toBeVisible();
});
