import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import { List, ListItem } from '../List/List';
import type { ContentMediaProps } from './ContentMedia';
import { ContentMedia, ContentMediaBlock } from './ContentMedia';

export default {
    title: 'osc-ui/ContentMedia',
    component: ContentMedia,
    subcomponents: { ContentMediaBlock },
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="media">
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676288291/9b17bb1298dcfbed19cac005af4453d8_gwpd23.png"
                    width={610}
                    height={451}
                    alt="A woman smiling while looking forward"
                    className="o-img--contain"
                />
            </ContentMediaBlock>

            <ContentMediaBlock variant="content">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2>Working with children</h2>
                        <p>
                            If you're passionate about working with children, whether that's babies
                            and toddlers, young children, teens, or children with special
                            educational needs, there is a wide variety of careers you could look
                            into. Working with children gives you the opportunity to inspire and
                            help raise the next generation. Potential careers include:
                        </p>

                        <List>
                            <ListItem>Teaching assistant</ListItem>
                            <ListItem>Early years educator/nursery nurse </ListItem>
                            <ListItem>Childminder </ListItem>
                            <ListItem>Nanny</ListItem>
                            <ListItem>Child psychologist </ListItem>
                            <ListItem>SEN coordinator </ListItem>
                            <ListItem>Pediatric nurse </ListItem>
                            <ListItem>Play specialist</ListItem>
                        </List>

                        <p>
                            To work with children, you'll need to look into obtaining the relevant
                            qualifications as well as a Disclosure and Barring Service (DBS) check
                            to demonstrate that you are fit to work with children aged under 18.
                        </p>
                        <div className="c-btn-group c-btn-group--row">
                            <Button variant="secondary">View Courses</Button>
                        </div>
                    </div>
                </div>
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

const AlignMediaTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock align="start" variant="media">
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676288291/9b17bb1298dcfbed19cac005af4453d8_gwpd23.png"
                    width={610}
                    height={451}
                    alt="A woman smiling while looking forward"
                    className="o-img--contain"
                />
            </ContentMediaBlock>

            <ContentMediaBlock variant="content">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2>Working with children</h2>
                        <p>
                            If you're passionate about working with children, whether that's babies
                            and toddlers, young children, teens, or children with special
                            educational needs, there is a wide variety of careers you could look
                            into. Working with children gives you the opportunity to inspire and
                            help raise the next generation. Potential careers include:
                        </p>

                        <List>
                            <ListItem>Teaching assistant</ListItem>
                            <ListItem>Early years educator/nursery nurse </ListItem>
                            <ListItem>Childminder </ListItem>
                            <ListItem>Nanny</ListItem>
                            <ListItem>Child psychologist </ListItem>
                            <ListItem>SEN coordinator </ListItem>
                            <ListItem>Pediatric nurse </ListItem>
                            <ListItem>Play specialist</ListItem>
                        </List>

                        <p>
                            To work with children, you'll need to look into obtaining the relevant
                            qualifications as well as a Disclosure and Barring Service (DBS) check
                            to demonstrate that you are fit to work with children aged under 18.
                        </p>
                        <div className="c-btn-group c-btn-group--row">
                            <Button variant="secondary">View Courses</Button>
                        </div>
                    </div>
                </div>
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

const ReverseLayoutTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="content">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2>Working with children</h2>
                        <p>
                            If you're passionate about working with children, whether that's babies
                            and toddlers, young children, teens, or children with special
                            educational needs, there is a wide variety of careers you could look
                            into. Working with children gives you the opportunity to inspire and
                            help raise the next generation. Potential careers include:
                        </p>

                        <List>
                            <ListItem>Teaching assistant</ListItem>
                            <ListItem>Early years educator/nursery nurse </ListItem>
                            <ListItem>Childminder </ListItem>
                            <ListItem>Nanny</ListItem>
                            <ListItem>Child psychologist </ListItem>
                            <ListItem>SEN coordinator </ListItem>
                            <ListItem>Pediatric nurse </ListItem>
                            <ListItem>Play specialist</ListItem>
                        </List>

                        <p>
                            To work with children, you'll need to look into obtaining the relevant
                            qualifications as well as a Disclosure and Barring Service (DBS) check
                            to demonstrate that you are fit to work with children aged under 18.
                        </p>
                        <div className="c-btn-group c-btn-group--row">
                            <Button variant="secondary">View Courses</Button>
                        </div>
                    </div>
                </div>
            </ContentMediaBlock>

            <ContentMediaBlock variant="media">
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676288291/9b17bb1298dcfbed19cac005af4453d8_gwpd23.png"
                    width={610}
                    height={451}
                    alt="A woman smiling while looking forward"
                    className="o-img--contain"
                />
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const AlignMedia = AlignMediaTemplate.bind({});
AlignMedia.args = {
    ...Primary.args,
};

export const ReverseLayout = ReverseLayoutTemplate.bind({});
AlignMedia.args = {
    ...Primary.args,
    mobileMediaPosition: 'above',
};
