import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import React, { useEffect, useState } from 'react';
import breakpoints from '../../../../../tokens/media-queries';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { classNames } from '../../utils/classNames';
import { rem } from '../../utils/rem';
import { Icon } from '../Icon/Icon';

import './header.scss';

// TODO: Move logo into spritesheet and remove this
export const Logo = () => (
    <a href="/" className="c-header__logo">
        <Icon label="Open Study College">
            <svg
                width="278"
                height="33"
                viewBox="0 0 278 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18.6315 14.5118C18.6315 9.92031 15.5615 6.56777 11.3493 6.56777C7.1371 6.56777 4.06717 9.84743 4.06717 14.5118C4.06717 19.1034 7.1371 22.4559 11.3493 22.4559C15.5615 22.4559 18.6315 19.1762 18.6315 14.5118ZM0.211914 14.5118C0.211914 8.0254 4.8525 2.99658 11.4207 2.99658C17.9889 2.99658 22.4867 8.0254 22.4867 14.5118C22.4867 20.9983 17.8461 26.0271 11.2779 26.0271C4.70971 25.9542 0.211914 20.9983 0.211914 14.5118Z"
                    fill="#062134"
                />
                <path
                    d="M37.6935 18.156C37.6935 15.3136 36.0515 13.7102 33.9811 13.7102C32.6246 13.7102 31.5537 14.2932 30.6256 15.1678V21.5085C31.5537 22.1644 32.696 22.6746 33.9811 22.6746C35.9087 22.6746 37.6935 21.0712 37.6935 18.156ZM24.9141 29.161H27.0559V13.9288H24.9141V10.7949H30.5542V12.4712C31.6965 11.378 32.9102 10.5034 34.8378 10.5034C38.6216 10.5034 41.406 13.6373 41.406 18.0831C41.406 22.3831 38.4075 25.8085 34.5522 25.8085C32.9815 25.8085 31.6965 25.2255 30.6256 24.4238V29.161H32.9815V32.2221H24.9141V29.161Z"
                    fill="#062134"
                />
                <path
                    d="M47.3315 16.9171H54.3281C54.2567 14.8764 52.9716 13.5646 50.8298 13.5646C49.3305 13.4917 47.7599 14.4391 47.3315 16.9171ZM47.4029 19.4679C47.9027 21.7273 49.7589 22.7476 52.1863 22.7476C53.9711 22.7476 55.756 22.1646 57.4694 21.2171L57.1838 24.4968C55.6846 25.4442 53.8283 25.8086 51.6865 25.8086C46.9745 25.8086 43.6904 22.7476 43.6904 18.229C43.6904 14.0747 46.5462 10.5764 51.044 10.5764C55.6846 10.5764 58.0406 13.7103 58.0406 17.6459C58.0406 18.229 57.9692 18.9578 57.8978 19.4679H47.4029Z"
                    fill="#062134"
                />
                <path
                    d="M65.6801 13.2001C67.0366 11.8154 68.6073 10.5764 70.7491 10.5764C72.4625 10.5764 73.7476 11.3052 74.4616 12.4713C74.9613 13.273 75.2469 14.2934 75.2469 15.5323V22.6018H77.3887V25.6629H69.6782V22.6018H71.6772V16.4069C71.6772 15.8239 71.6058 15.2408 71.3916 14.8764C71.0347 14.2205 70.4635 13.929 69.6068 13.929C68.3217 13.929 67.0366 14.6578 65.8943 15.6781V22.6018H67.8933V25.6629H60.04V22.6018H62.1818V13.929H60.04V10.7951H65.6801V13.2001Z"
                    fill="#062134"
                />
                <path
                    d="M83.5283 20.8525C83.5283 19.2491 84.4564 18.2288 85.8129 18.2288C87.2408 18.2288 88.1689 19.322 88.1689 20.4152C88.1689 20.9254 88.0975 21.3627 87.8833 21.7271C88.6687 22.3101 89.8824 22.6745 91.3102 22.6745C93.6662 22.6745 95.2369 21.5813 95.2369 19.6864C95.2369 17.8644 93.452 16.9898 91.2388 16.1881C87.2408 14.7305 84.385 13.4186 84.385 9.26438C84.385 5.69319 87.1694 2.99658 91.5958 2.99658C95.6652 2.99658 98.8066 5.11014 98.8066 7.80675C98.8066 9.41014 97.8784 10.2847 96.5934 10.2847C95.0941 10.2847 94.2374 9.11862 94.2374 8.0254C94.2374 7.51523 94.3088 7.2237 94.4515 7.00506C93.8804 6.64065 92.9523 6.34912 91.5958 6.34912C89.454 6.34912 88.1689 7.44234 88.1689 9.04573C88.1689 10.8678 89.9537 11.6695 92.167 12.4712C96.0936 13.8559 99.0207 15.2406 99.0207 19.3949C99.0207 23.622 95.808 26.0271 91.3816 26.0271C86.9552 25.9542 83.5283 23.5491 83.5283 20.8525Z"
                    fill="#062134"
                />
                <path
                    d="M104.09 23.8407C103.733 23.2576 103.59 22.4559 103.59 21.5085V13.9288H100.806V10.7949H103.59V7.66101L107.16 6.05762V10.722H111.515V13.8559H107.16V20.7796C107.16 21.2169 107.231 21.5813 107.374 21.8729C107.659 22.3102 108.159 22.6017 108.873 22.6017C109.801 22.6017 110.872 22.2373 111.729 21.8L111.443 24.9339C110.444 25.4441 109.302 25.8085 107.945 25.8085C106.232 25.8813 104.875 25.2254 104.09 23.8407Z"
                    fill="#062134"
                />
                <path
                    d="M116.084 23.9136C115.656 23.1119 115.37 22.0915 115.37 20.9254V13.9288H113.229V10.7949H118.94V20.0509C118.94 20.7068 119.011 21.1441 119.226 21.5814C119.583 22.2373 120.154 22.5288 121.01 22.5288C122.296 22.5288 123.581 21.8 124.723 20.7797V13.9288H122.51V10.7949H128.364V22.5288H130.506V25.5898H124.866V23.2576C123.509 24.6424 121.939 25.8814 119.797 25.8814C118.083 25.8814 116.798 25.0797 116.084 23.9136Z"
                    fill="#062134"
                />
                <path
                    d="M143.427 21.217V14.8763C142.499 14.2203 141.357 13.7102 140 13.7102C138.001 13.7102 136.145 15.3136 136.145 18.2288C136.145 21.0712 137.858 22.6746 140 22.6746C141.357 22.6746 142.499 22.0915 143.427 21.217ZM132.504 18.3017C132.504 14.0017 135.574 10.5763 139.429 10.5763C141.285 10.5763 142.642 11.3051 143.427 11.961V4.01695H141.214V0.883057H146.997V22.5288H149.139V25.5898H143.427V23.9864C142.356 25.0068 141 25.8814 139.144 25.8814C135.36 25.8814 132.504 22.7475 132.504 18.3017Z"
                    fill="#062134"
                />
                <path
                    d="M153.851 32.2948C151.924 32.2948 150.781 31.1287 150.781 29.9626C150.781 28.7236 151.638 28.0677 152.566 28.0677C153.423 28.0677 153.923 28.5779 154.137 29.1609C154.494 29.088 154.922 28.7965 155.279 28.2863C155.493 27.9948 155.707 27.6304 155.922 27.1202L156.993 24.788L151.852 13.8558H150.067V10.7219H157.564V13.6372H155.422L158.777 21.5084L162.133 13.7101H159.92V10.7948H167.345V13.9287H165.56L158.777 28.5779C158.42 29.2338 158.063 29.8897 157.635 30.327C156.564 31.6389 155.279 32.2948 153.851 32.2948Z"
                    fill="#062134"
                />
                <path
                    d="M173.484 14.6576C173.484 7.73387 178.696 2.99658 184.336 2.99658C188.691 2.99658 192.332 5.83896 192.332 8.53557C192.332 9.62879 191.618 10.4305 190.619 10.4305C189.762 10.4305 189.12 9.77455 189.12 8.89997C189.12 8.17116 189.619 7.58811 190.19 7.44234C189.619 6.27624 187.478 4.67285 184.336 4.67285C179.053 4.67285 175.412 9.41014 175.412 14.5847C175.412 19.4678 179.124 24.2051 184.479 24.2051C187.121 24.2051 189.334 23.2576 191.404 21.3627L192.404 22.7474C190.19 24.9339 187.192 25.8813 184.479 25.8813C177.768 25.9542 173.484 20.3423 173.484 14.6576Z"
                    fill="#062134"
                />
                <path
                    d="M207.539 18.5204C207.539 15.1679 205.398 12.6899 202.256 12.6899C199.186 12.6899 196.973 15.095 196.973 18.5204C196.973 21.9459 199.115 24.351 202.256 24.351C205.398 24.2781 207.539 21.873 207.539 18.5204ZM195.26 18.5204C195.26 14.4391 198.116 11.1594 202.256 11.1594C206.469 11.1594 209.324 14.4391 209.324 18.5204C209.324 22.6018 206.469 25.8815 202.256 25.8815C198.116 25.8815 195.26 22.6018 195.26 18.5204Z"
                    fill="#062134"
                />
                <path
                    d="M212.108 24.0593H214.536V2.48645H212.108V0.883057H216.249V24.0593H218.677V25.5898H212.108V24.0593Z"
                    fill="#062134"
                />
                <path
                    d="M221.032 24.0593H223.46V2.48645H221.032V0.883057H225.173V24.0593H227.672V25.5898H221.032V24.0593Z"
                    fill="#062134"
                />
                <path
                    d="M232.098 17.4272H241.451C241.237 14.6577 239.738 12.7628 236.81 12.7628C234.383 12.6899 232.384 14.512 232.098 17.4272ZM232.027 18.8848C232.313 22.456 234.383 24.2781 237.739 24.2781C239.666 24.2781 240.88 23.695 242.522 22.6747L242.379 24.4238C240.951 25.3713 239.166 25.8086 237.524 25.8086C233.098 25.8086 230.242 22.7476 230.242 18.5204C230.242 14.6577 232.741 11.1594 236.953 11.1594C240.951 11.1594 243.093 14.3662 243.093 17.7916C243.093 18.3018 243.022 18.5933 243.022 18.8848H232.027Z"
                    fill="#062134"
                />
                <path
                    d="M247.948 18.4476C247.948 21.5815 250.09 24.0594 253.017 24.0594C255.087 24.0594 256.586 23.0391 257.872 21.6543V14.512C256.729 13.4916 255.301 12.6899 253.231 12.6899C250.018 12.6899 247.948 15.3865 247.948 18.4476ZM259.514 26.2459C259.514 28.0679 259.085 29.3798 258.228 30.2543C257.015 31.712 255.016 32.295 252.874 32.295C250.804 32.295 249.304 31.6391 248.519 30.9103C248.091 30.473 247.805 29.8899 247.805 29.3798C247.805 28.4323 248.448 27.7764 249.304 27.7764C250.018 27.7764 250.447 28.3594 250.447 29.0154C250.447 29.3798 250.304 29.7442 250.018 30.1086C250.375 30.4001 251.375 30.7645 253.088 30.7645C254.516 30.7645 256.015 30.4001 256.943 29.3069C257.443 28.6509 257.872 27.7035 257.872 26.4645V23.3306C256.658 24.6425 255.159 25.5899 252.945 25.5899C249.233 25.5899 246.234 22.6018 246.234 18.4476C246.234 14.7306 248.876 11.1594 253.302 11.1594C255.159 11.1594 256.801 11.8882 257.943 13.0543V11.3781H261.87V12.9086H259.585V26.2459H259.514Z"
                    fill="#062134"
                />
                <path
                    d="M266.153 17.4272H275.506C275.291 14.6577 273.792 12.7628 270.865 12.7628C268.509 12.6899 266.51 14.512 266.153 17.4272ZM266.153 18.8848C266.439 22.456 268.509 24.2781 271.864 24.2781C273.792 24.2781 275.006 23.695 276.648 22.6747L276.505 24.4238C275.077 25.3713 273.292 25.8086 271.65 25.8086C267.224 25.8086 264.368 22.7476 264.368 18.5204C264.368 14.6577 266.867 11.1594 271.079 11.1594C275.077 11.1594 277.219 14.3662 277.219 17.7916C277.219 18.3018 277.219 18.5933 277.148 18.8848H266.153Z"
                    fill="#062134"
                />
            </svg>
        </Icon>
    </a>
);

export interface SharedNavProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {}

export const Header = (props: HeaderProps) => {
    const { className, children, ...attr } = props;
    const ref = useRef<HTMLDivElement>(null);
    const headerHeight = useHeight(ref);
    const classes = classNames('c-header', 'o-container', className);

    return (
        <header
            className={classes}
            {...attr}
            ref={ref}
            style={{
                ...attr.style,
                // Set the header height as state so we can use it to help position things such as the nav
                ['--header-height' as string]: `${headerHeight}px`,
            }}
        >
            {children}
        </header>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Header nav
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderNavProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Sets the data-state attribute of the button.
     *
     * @default false
     */
    isOpen: boolean;
}

export const HeaderNav = (props: HeaderNavProps) => {
    const { className, children, isOpen = false, ...attr } = props;
    const classes = classNames('c-header__nav', className);
    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    useEffect(() => {
        // Lock document body when the nav is open
        if (isOpen && !isDesktop) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [isDesktop, isOpen]);

    return (
        <div
            className={classes}
            {...attr}
            style={{
                ...attr.style,
                // Ensure we can always scroll
                overflowY: isOpen ? 'auto' : null,
            }}
        >
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Header action bar
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderActionBarProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
    const { className, children, ...attr } = props;
    const classes = classNames('c-header__action-bar', className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * useHeight
 * -----------------------------------------------------------------------------------------------*/
const useHeight = (ref: RefObject<HTMLElement | null>) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        // Get the bottom position of the current ref
        // This will allow us to take into account thing like padding on the body
        const handleResize = () => {
            setHeaderHeight(ref.current.offsetHeight);
        };

        // Triggered at the first client-side load and if query changes
        handleResize();

        // Listen for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return headerHeight;
};
