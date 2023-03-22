import React from 'react';
import { render } from 'test-utils';
import { Content } from '../Content/Content';
import { Image } from '../Image/Image';
import { ContentMedia, ContentMediaBlock } from './ContentMedia';
import { workingWithChildren } from './contentMediaContent';

test('renders Content Media component', () => {
    render(
        <ContentMedia>
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
                <Content
                    value={workingWithChildren.body}
                    // @ts-ignore -- Button variant is missing gets added in #961
                    buttons={workingWithChildren.buttons}
                />
            </ContentMediaBlock>
        </ContentMedia>
    );

    expect(document.querySelector('.c-content-media')).toBeInTheDocument();
    expect(document.querySelector('.c-content-media__content')).toBeInTheDocument();
    expect(document.querySelector('.c-content-media__media')).toBeInTheDocument();
});

test('changes the mobile media position', () => {
    render(
        <ContentMedia mobileMediaPosition="above">
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
                <Content
                    value={workingWithChildren.body}
                    // @ts-ignore -- Button variant is missing gets added in #961
                    buttons={workingWithChildren.buttons}
                />
            </ContentMediaBlock>
        </ContentMedia>
    );

    expect(document.querySelector('.c-content-media')).toHaveClass(
        'c-content-media--media-pos-above'
    );
});

test('changes the width of the media', () => {
    render(
        <ContentMedia>
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
                <Content
                    value={workingWithChildren.body}
                    // @ts-ignore -- Button variant is missing gets added in #961
                    buttons={workingWithChildren.buttons}
                />
            </ContentMediaBlock>
        </ContentMedia>
    );

    expect(document.querySelector('.c-content-media__media')).toHaveClass('o-grid__col--7@tab');
    expect(document.querySelector('.c-content-media__content')).toHaveClass('o-grid__col--5@tab');
});
