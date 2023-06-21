import { useEffect, useState } from 'react';

/**
 * Gets the distance scrolled from the top of the page.
 *
 * @returns Number of pixels scrolled from the top of the page
 */
export const useScroll = () => {
    const [scrollPosY, setScrollPosY] = useState<number>(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollPosY(window.scrollY);

                    ticking = false;
                });

                ticking = true;
            }
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosY;
};
