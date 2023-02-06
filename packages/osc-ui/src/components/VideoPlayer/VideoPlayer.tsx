import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { ReactPlayerProps } from 'react-player';
import VimeoPlayer from 'react-player/vimeo';
import YouTubePlayer from 'react-player/youtube';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { classNames } from '../../utils/classNames';
import type { IconProps } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

import './video-player.scss';

/*
TODO: To support ONLY Vimeo and Youtube (No video upload i.e. MP4) -> Sanity thing
*/

/* -------------------------------------------------------------------------------------------------
 * VideoPlayer
 *
 * We're importing two separate packages, rather than the entire react-player/lazy package
 * as we're only using two players this keeps the bundle size much smaller
 *
 * https://www.npmjs.com/package/react-player
 * -----------------------------------------------------------------------------------------------*/
export interface VideoPlayerProps extends Omit<ReactPlayerProps, 'config'> {
    /**
     * The url of a video to play
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
    /**
     * Set the video player component to render
     * @default youtube
     */
    variant?: 'youtube' | 'vimeo';
    /**
     * Autoplay the video
     * @default false
     */
    autoplay?: boolean;
    /**
     * Set the colour of the overlay
     * @default hsla(0deg 0% 0% / 50%)
     */
    overlayColor?: string;
    /**
     * Set whether the overlay should be present when playing
     * @default false
     */
    preserveOverlay?: boolean;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const {
        autoplay = false,
        className,
        url,
        previewImage,
        playIcon,
        variant = 'youtube',
        overlayColor,
        preserveOverlay = false,
        ...rest
    } = props;
    const classes = classNames('c-video-player', className);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [hasBeenInteracted, setHasBeenInteracted] = useState(false);

    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersectionThreshold = 0.5; // intersect when 50% of the element is in view
    const intersection = useIntersectionObserver(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: intersectionThreshold,
    });

    useEffect(() => {
        // IF the player is set to autoplay OR has been interacted with then
        // set the play state based on the intersection observer
        if (autoplay || hasBeenInteracted) {
            intersection && intersection.intersectionRatio < intersectionThreshold
                ? setIsPlaying(false)
                : setIsPlaying(true);
        }
    }, [autoplay, hasBeenInteracted, intersection]);

    let showPreview: boolean | VideoPlayerProps['previewImage'];
    // IF autoplay is true disable the preview image
    // ELSE if previewImage is truthy, set the preview image
    // ELSE show the default preview
    if (autoplay === true) {
        showPreview = false;
    } else if (previewImage) {
        showPreview = previewImage;
    } else {
        showPreview = true;
    }

    return (
        <div className={classes} ref={intersectionRef}>
            {variant === 'youtube' ? (
                <YouTubePlayer
                    url={url}
                    playing={isPlaying}
                    wrapper={Wrapper}
                    controls={true}
                    light={showPreview}
                    playIcon={playIcon}
                    volume={1}
                    muted={autoplay} // make sure video is muted when autoplay is true
                    width="100%"
                    height="100%"
                    onClickPreview={() => {
                        setHasBeenInteracted(true);
                        setIsPlaying(true);
                    }}
                    {...rest}
                />
            ) : (
                <VimeoPlayer
                    url={url}
                    playing={isPlaying}
                    wrapper={Wrapper}
                    controls={true}
                    light={showPreview}
                    playIcon={playIcon}
                    volume={1}
                    muted={autoplay} // make sure video is muted when autoplay is true
                    width="100%"
                    height="100%"
                    onClickPreview={() => setIsPlaying(true)}
                    {...rest}
                />
            )}
            {!isPlaying || preserveOverlay ? <VideoPlayerOverlay color={overlayColor} /> : null}
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
 * VideoPlayerOverlay
 * -----------------------------------------------------------------------------------------------*/
interface VideoPlayerOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Custom class
     */
    className?: string;
    /**
     * Set the colour of the overlay
     */
    color?: string;
}
const VideoPlayerOverlay = (props: VideoPlayerOverlayProps) => {
    const { className, color, ...rest } = props;

    return (
        <div
            className="c-video-player__overlay"
            {...rest}
            style={{
                ...rest.style,
                backgroundColor: color ? color : 'hsla(0deg 0% 0% / 50%)',
            }}
        ></div>
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
