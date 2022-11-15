import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Carousel';
import { Carousel } from './Carousel';

export default {
    title: 'osc-ui/Carousel',
    component: Carousel
} as Meta;

const Template: Story<Props> = (args) => <Carousel {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    mediaArray: [
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        },
        {
            image: {
                asset: {
                    url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    caption: 'test'
                }
            }
        }
    ],
    active: true,
    delay: '3000',
    slidesPerPage: 3, // fine
    slideGap: 10,
    axis: 'x',
    height: 500,
    loop: false, // fine
    startIndex: 1, // fine
    ssr: false
};

export const HorizontalOneSlide = Template.bind({});
HorizontalOneSlide.args = {
    ...Primary.args,
    axis: 'x',
    slidesPerPage: 1
};

export const VerticalTwoSlide = Template.bind({});
VerticalTwoSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 2
};

export const VerticalMultiSlide = Template.bind({});
VerticalMultiSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 3
};
