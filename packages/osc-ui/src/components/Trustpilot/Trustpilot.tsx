import React, { useEffect, useState, useRef } from 'react';

export interface Props {
    stars?: string;
    theme?: 'light' | 'dark';
    template?: 'slider' | 'grid' | 'minicarousel' | 'microstar';
    height?: string;
}

type TemplateID =
    | '539adbd6dec7e10e686debee'
    | '539ad0ffdec7e10e686debd7'
    | '54ad5defc6454f065c28af8b'
    | '5419b732fbfb950b10de65e5';

type Status = 'idle' | 'loading' | 'ready' | 'error';

export const Trustpilot = ({
    stars = '4,5',
    theme = 'light',
    template = 'slider',
    height = '240px'
}: Props) => {
    const src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    // We need a reference to this element to load the TrustBox
    const ref = useRef(null);
    // Keep track of script status
    const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle');

    let templateID: TemplateID;

    // Apply the appropriate ID depending on the template set
    switch (template) {
        case 'slider':
            templateID = '54ad5defc6454f065c28af8b';
            break;

        case 'grid':
            templateID = '539adbd6dec7e10e686debee';
            break;

        case 'minicarousel':
            templateID = '539ad0ffdec7e10e686debd7';
            break;

        case 'microstar':
            templateID = '5419b732fbfb950b10de65e5';
            break;
    }

    useEffect(() => {
        if (!src) {
            setStatus('idle');
            return;
        }

        // Check if exsisting script has already been created
        let script: HTMLScriptElement = document.querySelector(`script[src="${src}"]`);
        if (!script) {
            script = document.createElement('script');
            script.src = src;
            script.async = true;

            document.body.appendChild(script);
        }

        // Listen for when the script loads and apply appropriate status
        const setStateFromEvent = (e: Event) => {
            e.type === 'load' ? setStatus('ready') : setStatus('error');
        };
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);

        // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
        // If it's not, it means the script isn't loaded  just yet.
        // When it is, it will automatically load the TrustBox.
        if (window.Trustpilot) {
            window.Trustpilot.loadFromElement(ref.current, true);
        }

        // Cleanup event listeners
        return () => {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, []);

    return (
        <>
            <div
                ref={ref}
                className="trustpilot-widget"
                data-locale="en-GB"
                data-template-id={templateID}
                data-businessunit-id="4d94e64900006400050f5e27"
                data-style-height={height}
                data-style-width="100%"
                data-theme={theme}
                data-stars={stars}
                data-status={status}
                data-testid="trustpilot"
            >
                <a
                    href="https://uk.trustpilot.com/review/www.openstudycollege.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Trustpilot
                </a>
            </div>
        </>
    );
};
