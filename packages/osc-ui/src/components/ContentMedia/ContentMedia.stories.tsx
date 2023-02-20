import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Carousel } from '../Carousel/Carousel';
import { Image } from '../Image/Image';
import { List, ListItem } from '../List/List';
import { TextInput } from '../TextInput/TextInput';
import { Trustpilot } from '../Trustpilot/Trustpilot';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import type { ContentMediaProps } from './ContentMedia';
import { ContentMedia, ContentMediaBlock, ContentMediaFormContainer } from './ContentMedia';

export default {
    title: 'osc-ui/Content Media',
    component: ContentMedia,
    subcomponents: { ContentMediaBlock, ContentMediaFormContainer },
    parameters: {
        docs: {
            description: {
                component:
                    'A component for displaying content alongside a piece of media, which could be an image, a video or a form.',
            },
        },
    },
    argTypes: {
        mobileMediaPosition: {
            control: 'select',
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

const AdjustWidthsTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="media" cols={7}>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676288291/9b17bb1298dcfbed19cac005af4453d8_gwpd23.png"
                    width={610}
                    height={451}
                    alt="A woman smiling while looking forward"
                    className="o-img--contain"
                />
            </ContentMediaBlock>

            <ContentMediaBlock variant="content" cols={5}>
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
                        <h2>Working with animals</h2>
                        <p>
                            We all love animals, but this is an area where you could turn your
                            passion for working with animals into a long-term career. The
                            opportunities to work with animals consist of both employed and
                            self-employed jobs, including:
                        </p>

                        <List>
                            <ListItem>Dog groomer </ListItem>
                            <ListItem>Dog walker/sitter </ListItem>
                            <ListItem>Animal behaviouralist </ListItem>
                            <ListItem>Vet or veterinary assistant </ListItem>
                            <ListItem>Dog trainer </ListItem>
                            <ListItem>Zoologist </ListItem>
                            <ListItem>Pet shop assistant</ListItem>
                        </List>

                        <p>
                            The animal care industry is largely unregulated unless you want to
                            become a vet which will require a relevant degree. This means that
                            requirements for different jobs will depend on the employer. We would
                            recommend at least studying a relevant course to ensure that you have a
                            good understanding of the basics and demonstrate your commitment to your
                            chosen career.
                        </p>
                        <div className="c-btn-group c-btn-group--row">
                            <Button variant="secondary">View Courses</Button>
                        </div>
                    </div>
                </div>
            </ContentMediaBlock>

            <ContentMediaBlock variant="media">
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676300839/1676527ac9d63f81fad332aeefbf3953_wnmgjv.png"
                    width={610}
                    height={475}
                    alt="A poodle sitting and facing forwards"
                    className="o-img--contain"
                />
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

const CarouselMediaContentTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <Carousel carouselName="Media content" slidesPerView={1}>
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
                                If you're passionate about working with children, whether that's
                                babies and toddlers, young children, teens, or children with special
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
                                To work with children, you'll need to look into obtaining the
                                relevant qualifications as well as a Disclosure and Barring Service
                                (DBS) check to demonstrate that you are fit to work with children
                                aged under 18.
                            </p>
                            <div className="c-btn-group c-btn-group--row">
                                <Button variant="secondary">View Courses</Button>
                            </div>
                        </div>
                    </div>
                </ContentMediaBlock>
            </ContentMedia>
            <ContentMedia {...args} mobileMediaPosition="above">
                <ContentMediaBlock variant="content">
                    <div className="c-content">
                        <div className="c-content__inner c-content__inner--left">
                            <h2>Working with animals</h2>
                            <p>
                                We all love animals, but this is an area where you could turn your
                                passion for working with animals into a long-term career. The
                                opportunities to work with animals consist of both employed and
                                self-employed jobs, including:
                            </p>

                            <List>
                                <ListItem>Dog groomer </ListItem>
                                <ListItem>Dog walker/sitter </ListItem>
                                <ListItem>Animal behaviouralist </ListItem>
                                <ListItem>Vet or veterinary assistant </ListItem>
                                <ListItem>Dog trainer </ListItem>
                                <ListItem>Zoologist </ListItem>
                                <ListItem>Pet shop assistant</ListItem>
                            </List>

                            <p>
                                The animal care industry is largely unregulated unless you want to
                                become a vet which will require a relevant degree. This means that
                                requirements for different jobs will depend on the employer. We
                                would recommend at least studying a relevant course to ensure that
                                you have a good understanding of the basics and demonstrate your
                                commitment to your chosen career.
                            </p>
                            <div className="c-btn-group c-btn-group--row">
                                <Button variant="secondary">View Courses</Button>
                            </div>
                        </div>
                    </div>
                </ContentMediaBlock>

                <ContentMediaBlock variant="media">
                    <Image
                        src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676300839/1676527ac9d63f81fad332aeefbf3953_wnmgjv.png"
                        width={610}
                        height={475}
                        alt="A poodle sitting and facing forwards"
                        className="o-img--contain"
                    />
                </ContentMediaBlock>
            </ContentMedia>
        </Carousel>
    </div>
);

const CarouselMediaTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="media">
                <Carousel carouselName="Media" slidesPerView={1}>
                    <Image
                        src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676288291/9b17bb1298dcfbed19cac005af4453d8_gwpd23.png"
                        width={610}
                        height={451}
                        alt="A woman smiling while looking forward"
                        className="o-img--contain"
                    />
                    <Image
                        src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1676301526/7b60f9b0ad556847bcaffc42cfe9ff36_xxkjaq.png"
                        width={610}
                        height={475}
                        alt="A person, looking to the right and applying makeup to their face"
                        className="o-img--contain"
                    />
                </Carousel>
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

const TrustpilotTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="media" align="center">
                <Trustpilot height="24px" stars="4,5" template="microstar" theme="light" />
            </ContentMediaBlock>

            <ContentMediaBlock variant="content">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2 className="t-font-xl u-text-bold">Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione id
                            minima voluptate debitis officia accusantium maxime molestiae, maiores
                            porro, nulla harum totam aut nisi, quas ipsum temporibus perspiciatis
                            iusto voluptates.
                        </p>
                    </div>
                </div>
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

const VideoTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            <ContentMediaBlock variant="media" align="center">
                <VideoPlayer
                    url="https://youtu.be/w36Yhxxuk_c"
                    previewImage={
                        <Image
                            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675425684/maxresdefault_si26jj.jpg"
                            width={968}
                            height={544}
                            alt="A cartoon man sitting on an armchair with his laptop on his knees. He's looking at his laptop and there are some shelves and lights in the background."
                        />
                    }
                />
            </ContentMediaBlock>

            <ContentMediaBlock variant="content">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione id
                            minima voluptate debitis officia accusantium maxime molestiae, maiores
                            porro, nulla harum totam aut nisi, quas ipsum temporibus perspiciatis
                            iusto voluptates.
                        </p>
                    </div>
                </div>
            </ContentMediaBlock>
        </ContentMedia>
    </div>
);

const FormTemplate: Story<ContentMediaProps> = ({ ...args }) => (
    <div className="o-container">
        <ContentMedia {...args}>
            {/* Note: u-pt-4xl doesn't currently work. See: https://github.com/Open-Study-College/osc/pull/714 */}
            <ContentMediaBlock variant="content" align="start" className="u-pt-4xl">
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione id
                            minima voluptate debitis officia accusantium maxime molestiae, maiores
                            porro, nulla harum totam aut nisi, quas ipsum temporibus perspiciatis
                            iusto voluptates.
                        </p>
                    </div>
                </div>
            </ContentMediaBlock>

            <ContentMediaBlock variant="media" align="center">
                <ContentMediaFormContainer>
                    <h2>Book a call back</h2>
                    <p>
                        Our education specialists can help you find the right course for your
                        requirements. Fill in the form below and one of them will give you a call
                        back at the time requested.
                    </p>
                    <form className="c-content-media__form">
                        <TextInput id="full-name" name="Full Name" required type="text" />
                        <TextInput id="email" name="Email" required type="email" />
                        <Button isFull>Enrol Now</Button>
                    </form>
                    <p>
                        By completing this form you are expressing interest in Open Study College.
                        We will send you information about our courses and any special offers we
                        think will be useful to you. You will be able to unsubscribe at anytime. See
                        our Privacy Policy.
                    </p>
                </ContentMediaFormContainer>
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
AlignMedia.parameters = {
    docs: {
        description: {
            story: 'You can vertically align the content or the media by adding the `align` prop to the `ContentMediaBlock` subcomponent',
        },
    },
};

export const AdjustWidths = AdjustWidthsTemplate.bind({});
AdjustWidths.args = {
    ...Primary.args,
};
AdjustWidths.parameters = {
    docs: {
        description: {
            story: 'You can adjust the width of each content block by changing the `cols` prop. The `ContentMedia` uses our `o-grid` class so the `cols` will be a range of 1 - 12 and influence how many columns each block should span.',
        },
    },
};

export const ReverseLayout = ReverseLayoutTemplate.bind({});
ReverseLayout.args = {
    ...Primary.args,
    mobileMediaPosition: 'above',
};
ReverseLayout.parameters = {
    docs: {
        description: {
            story: 'You can change whether the media is on the left or right by changing the order in the markup. If you want to ensure the media is always on top on mobile devices, you can set the `mobileMediaPosition` prop to `above`.',
        },
    },
};

export const CarouselMediaContent = CarouselMediaContentTemplate.bind({});
CarouselMediaContent.args = {
    ...Primary.args,
};
CarouselMediaContent.parameters = {
    docs: {
        description: {
            story: 'Wrap your `ContentMedia` components in a `Carousel` to be able to carousel through them.',
        },
    },
};

export const CarouselMedia = CarouselMediaTemplate.bind({});
CarouselMedia.args = {
    ...Primary.args,
};
CarouselMedia.parameters = {
    docs: {
        description: {
            story: 'To carousel just the content of a `ContentMediaBlock` wrap a `Carousel` around the contents inside.',
        },
    },
};

export const TrustpilotMedia = TrustpilotTemplate.bind({});
TrustpilotMedia.args = {
    ...Primary.args,
};
export const VideoMedia = VideoTemplate.bind({});
VideoMedia.args = {
    ...Primary.args,
};
export const FormMedia = FormTemplate.bind({});
FormMedia.args = {
    ...Primary.args,
};
