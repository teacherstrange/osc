import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Carousel';
import { Carousel } from './Carousel';

export default {
    title: 'Carousel',
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
    slidesPerPage: 2, // fine
    slidesToScroll: true,
    slideGap: 10,
    axis: 'y',
    height: 1000,
    loop: false, // fine
    startIndex: 1, // fine
    ssr: false
};
