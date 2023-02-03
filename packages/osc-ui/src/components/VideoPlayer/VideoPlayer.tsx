import type { ReactElement, ReactNode } from 'react';
import React, { useState } from 'react';
import type { ReactPlayerProps } from 'react-player/lazy';
import ReactPlayer from 'react-player/lazy';
import { classNames } from '../../utils/classNames';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

import './video-player.scss';

/*
TODO: To support ONLY Vimeo and Youtube (No video upload i.e. MP4) -> Sanity thing
TODO: Pause on scroll out of view (iframe api)
TODO: custom play icon
TODO: overlay?
TODO: Tests
*/

/* -------------------------------------------------------------------------------------------------
 * VideoPlayer
 *
 * https://www.npmjs.com/package/react-player
 * -----------------------------------------------------------------------------------------------*/
export interface VideoPlayerProps extends ReactPlayerProps {
    /**
     * The url of a video or song to play
     */
    url: ReactPlayerProps['url'];
    /**
     * Set a custom preview image for the video, can either be a url or a specific component
     */
    previewImage?: string | ReactElement;
    /**
     * Element or component to use as the play icon
     */
    playIcon?: ReactElement;
    /**
     * Custom class
     */
    className?: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const { className, url, previewImage, playIcon, ...rest } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const classes = classNames('c-video-player', className);

    return (
        <div className={classes}>
            <ReactPlayer
                url={url}
                playing={isPlaying}
                wrapper={Wrapper}
                controls={true}
                light={previewImage ?? true}
                playIcon={playIcon}
                width="100%"
                height="100%"
                onClickPreview={() => setIsPlaying(true)}
                {...rest}
            />
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Play Icon
 * -----------------------------------------------------------------------------------------------*/
interface PlayIconProps extends Omit<IconProps, 'id'> {
    /**
     * The id of the icon to reference from the spritesheet
     * @default play
     */
    id?: string;
}

export const PlayIcon = (props: PlayIconProps) => {
    const { id = 'play', ...rest } = props;
    return (
        <div className="c-video-player__btn">
            <Icon id={id} {...rest} />
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * VideoPlayer Wrapper
 * -----------------------------------------------------------------------------------------------*/
interface VideoPlayerWrapperProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

const Wrapper = (props: VideoPlayerWrapperProps) => {
    const { children, className } = props;
    const classes = classNames('c-video-player__wrapper', className);

    return <div className={classes}>{children}</div>;
};
