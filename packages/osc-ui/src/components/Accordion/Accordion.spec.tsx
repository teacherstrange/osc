import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { Content } from '../Content/Content';
import { textContent } from '../Content/textContent';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './Accordion';

beforeEach(() => {
    // Mock resizeObserver
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
});

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
        <Accordion type="single" className="accordion-classname">
            <AccordionItem value="0" className="item-classname">
                <AccordionHeader className="heading-classname">Heading level 2</AccordionHeader>
                <AccordionPanel className="panel-classname">
                    <Content value={textContent} align="left" />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

    await user.click(screen.getByRole('button', { name: 'Heading level 2' }));

    const region = screen.getByRole('region');
    const content = document.querySelector('.c-content');

    expect(region).toHaveAttribute('data-state', 'open');
    expect(content).toBeVisible();
});

test('changes the icon to a chevron', () => {
    render(
        <Accordion type="single">
            <AccordionItem value="0">
                <AccordionHeader icon="chevron">Heading</AccordionHeader>
                <AccordionPanel>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet culpa ea
                    praesentium officiis doloribus commodi earum voluptas doloremque fugiat
                    similique, voluptatibus corporis. Vero laboriosam nihil esse dolores impedit
                    aut!
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

    const plusminus = document.querySelector('.c-accordion__icon--plusminus');
    const chevron = document.querySelector('.c-accordion__icon--chevron');
    expect(plusminus).not.toBeInTheDocument();
    expect(chevron).toBeInTheDocument();
});

test('renders the correct variant classname', () => {
    const classes = [
        'c-accordion',
        'c-accordion__icon',
        'c-accordion__header',
        'c-accordion__trigger',
        'c-accordion__item',
        'c-accordion__content',
        'c-accordion__text',
    ];

    const { rerender } = render(
        <Accordion type="single" variant="secondary">
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

    classes.forEach((className) => {
        expect(document.querySelector(`.${className}`)).toHaveClass(`${className}--secondary`);
    });

    rerender(
        <Accordion type="single" variant="tertiary">
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

    classes.forEach((className) => {
        expect(document.querySelector(`.${className}`)).toHaveClass(`${className}--tertiary`);
    });
});
