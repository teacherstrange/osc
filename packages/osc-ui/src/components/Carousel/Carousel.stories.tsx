import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Carousel';
import { Carousel } from './Carousel';

export default {
    title: 'osc-ui/Carousel',
    component: Carousel,
    parameters: {
        docs: {
            description: {
                component: 'Carousel component for displaying various content types'
            }
        }
    },
    argTypes: {
        active: {
            description: 'Setting this to false will not activate or deactivate the carousel.'
        },
        axis: {
            description: 'Direction of the carousel'
        },
        carouselKey: {
            description:
                'ensure the css variables for the height, slidegap, etc. are locally scoped',
            control: false
        },
        delay: {
            description: 'Delay between transitions in milliseconds'
        },
        height: {
            description: 'Height of the carousel items in pixels'
        },
        loop: {
            description: 'Whether or not the carousel should loop back around to the start'
        },
        mediaArray: {
            description: 'Array of objects containing image urls and alt text',
            control: false
        },
        slideGap: {
            description: 'The gap between each slide in pixels'
        },
        slidesPerPage: {
            description: 'Number of slides shown per page'
        },
        ssr: {
            description: 'Controls if the carousel is visible before embla-api inits',
            control: false
        },
        startIndex: {
            description: 'The slide number we should start on'
        }
    }
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
    slidesPerPage: 3,
    slideGap: 10,
    axis: 'x',
    height: 500,
    loop: false,
    startIndex: 1,
    ssr: false
};

export const HorizontalOneSlide = Template.bind({});
HorizontalOneSlide.args = {
    ...Primary.args,
    axis: 'x',
    slidesPerPage: 1
};
HorizontalOneSlide.parameters = {
    docs: {
        description: {
            story: 'Changes one slide at a time.'
        }
    }
};

export const VerticalTwoSlide = Template.bind({});
VerticalTwoSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 2
};
VerticalTwoSlide.parameters = {
    docs: {
        description: {
            story: 'Changes two slides at a time vetically.'
        }
    }
};

export const VerticalMultiSlide = Template.bind({});
VerticalMultiSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 3
};
VerticalMultiSlide.parameters = {
    docs: {
        description: {
            story: 'Changes three slides at a time vetically.'
        }
    }
};
