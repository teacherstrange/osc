import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Image } from '../Image/Image';
import { VideoPlayer } from './VideoPlayer';

beforeEach(() => {
    // Fetch is used by react-player in the background so we need to
    // mock it out here as window.fetch isn't available in the test environment
    window.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve('accepted'),
        })
    );
});

test('renders the default video player preview', async () => {
    render(<VideoPlayer url="https://youtu.be/w36Yhxxuk_c" />);

    await waitFor(() => {
        expect(document.querySelector('.react-player__preview')).toBeInTheDocument();
    });

    expect(document.querySelector('.o-icon')).toBeInTheDocument();
    expect(document.querySelector('.c-video-player__overlay')).toBeInTheDocument();
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
        />
    );

    await waitFor(() => {
        expect(document.querySelector('.react-player__preview')).toBeInTheDocument();
    });

    expect(document.querySelector('.o-icon')).toBeInTheDocument();
    expect(document.querySelector('.c-video-player__overlay')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
});

test("doesn't render the video player preview if autoplay is true", async () => {
    render(<VideoPlayer autoplay={true} url="https://youtu.be/w36Yhxxuk_c" />);

    await waitFor(() => {
        expect(document.querySelector('.react-player__preview')).not.toBeInTheDocument();
    });
});

test('clears the icon, content and overlay when the video is played', async () => {
    const user = userEvent.setup();
    render(
        <VideoPlayer url="https://youtu.be/w36Yhxxuk_c">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sit dicta voluptatum
                aspernatur neque possimus animi, nihil ex deleniti, sapiente illo ab, velit in hic!
                Nam quasi ea velit error?
            </p>
        </VideoPlayer>
    );

    const preview = document.querySelector('.react-player__preview');
    await waitFor(() => {
        expect(preview).toBeInTheDocument();
    });

    const playBtn = document.querySelector('.c-video-player__btn');
    const overlay = document.querySelector('.c-video-player__overlay');
    const content = document.querySelector('.c-video-player__content');

    expect(playBtn).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    user.click(preview);

    await waitFor(() => {
        expect(preview).not.toBeInTheDocument();
    });

    expect(playBtn).toHaveClass('is-hidden');
    expect(overlay).toHaveClass('is-hidden');
    expect(content).toHaveClass('is-hidden');
});

test("doesn't clear the content or overlay if preserveContent is true", async () => {
    const user = userEvent.setup();
    render(
        <VideoPlayer url="https://youtu.be/w36Yhxxuk_c" preserveContent={true}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sit dicta voluptatum
                aspernatur neque possimus animi, nihil ex deleniti, sapiente illo ab, velit in hic!
                Nam quasi ea velit error?
            </p>
        </VideoPlayer>
    );

    const preview = document.querySelector('.react-player__preview');
    await waitFor(() => {
        expect(preview).toBeInTheDocument();
    });

    const playBtn = document.querySelector('.c-video-player__btn');
    const overlay = document.querySelector('.c-video-player__overlay');
    const content = document.querySelector('.c-video-player__content');

    expect(overlay).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    user.click(preview);

    await waitFor(() => {
        expect(preview).not.toBeInTheDocument();
    });

    expect(playBtn).toHaveClass('is-hidden');
    expect(overlay).not.toHaveClass('is-hidden');
    expect(content).not.toHaveClass('is-hidden');
});
