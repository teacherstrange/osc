import React from 'react';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

interface ArrowProps {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
}

export const Arrow = (props: ArrowProps) => {
    const { disabled, left, onClick } = props;
    const classes = classNames(
        'c-carousel__arrow',
        left && 'c-carousel__arrow--left',
        !left && 'c-carousel__arrow--right'
    );

    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {left ? (
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                ) : null}

                {!left ? <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" /> : null}
            </svg>
            <VisuallyHidden>{left ? 'Previous slide' : 'Next slide'}</VisuallyHidden>
        </button>
    );
};
