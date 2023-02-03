import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Image } from '../Image/Image';
import { PlayIcon, VideoPlayer } from './VideoPlayer';

beforeEach(() => {
    // Window.fetch isn't available in the test environment
    window.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve('accepted'),
        })
    );
});

test('renders the default video player preview', async () => {
    render(<VideoPlayer url="https://youtu.be/w36Yhxxuk_c" playIcon={<PlayIcon />} />);

    await waitFor(() => {
        expect(document.querySelector('.react-player__preview')).toBeInTheDocument();
    });

    expect(document.querySelector('.o-icon')).toBeInTheDocument();
});

test('renders the custom video player preview', async () => {
    render(
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
            playIcon={<PlayIcon />}
        />
    );

    await waitFor(() => {
        expect(document.querySelector('.react-player__preview')).toBeInTheDocument();
    });

    expect(document.querySelector('.o-icon')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
});
