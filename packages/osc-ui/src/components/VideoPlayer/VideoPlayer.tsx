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

// TODO: FIX focus styles -_-

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
     * Custom class
     */
    className?: string;
    /**
     * The content of the component
     */
    children?: ReactNode;
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
     * Set whether the content should remain present when video is playing
     * @default false
     */
    preserveContent?: boolean;
    /**
     * Set the video to loop
     * @default false
     */
    loop?: boolean;
    /**
     * Custom path for the icon spritesheet
     */
    iconPath?: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const {
        autoplay = false,
        className,
        url,
        previewImage,
        variant = 'youtube',
        overlayColor,
        preserveContent = false,
        loop = false,
        children,
        iconPath,
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

    const propsObj = {
        url: url,
        playing: isPlaying,
        wrapper: Wrapper, // Wrapper component
        controls: true,
        light: showPreview,
        playIcon: <></>, // Fragment so we can remove the default
        volume: 1, // Manually set the volume so that the muted prop works
        muted: autoplay, // make sure video is muted when autoplay is true
        loop: loop,
        width: '100%',
        height: '100%',
        onClickPreview: () => {
            setHasBeenInteracted(true);
            setIsPlaying(true);
        },
        onPlay: () => {
            setHasBeenInteracted(true);
            setIsPlaying(true);
        },
        onPause: () => {
            setHasBeenInteracted(true);
            setIsPlaying(false);
        },
    };

    return (
        <div className={classes} ref={intersectionRef}>
            {variant === 'youtube' ? (
                <YouTubePlayer {...propsObj} {...rest} />
            ) : (
                <VimeoPlayer {...propsObj} {...rest} />
            )}

            {children ? (
                <VideoPlayerContent
                    className={`c-video-player__content u-p-delta ${
                        !isPlaying || preserveContent ? '' : 'is-hidden'
                    }`}
                >
                    {children}
                </VideoPlayerContent>
            ) : null}

            <PlayIcon path={iconPath} className={!isPlaying ? '' : 'is-hidden'} />

            <VideoPlayerOverlay
                color={overlayColor}
                className={`${!isPlaying ? '' : 'is-hidden'} ${
                    preserveContent ? 'has-content' : ''
                }`}
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
    /**
     * Custom class
     */
    className?: string;
}

export const PlayIcon = (props: PlayIconProps) => {
    const { id = 'play', className, ...rest } = props;
    return (
        <div className={`c-video-player__btn ${className}`}>
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
export const VideoPlayerOverlay = (props: VideoPlayerOverlayProps) => {
    const { className, color, ...rest } = props;

    return (
        <div
            className={`c-video-player__overlay ${className}`}
            {...rest}
            style={{
                ...rest.style,
                backgroundColor: color ? color : 'hsla(0deg 0% 0% / 50%)',
            }}
        ></div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * VideoPlayer Content
 * -----------------------------------------------------------------------------------------------*/
interface VideoPlayerContentProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

export const VideoPlayerContent = (props: VideoPlayerContentProps) => {
    const { children, className } = props;
    const classes = classNames('c-video-player__content', className);

    return <div className={classes}>{children}</div>;
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
