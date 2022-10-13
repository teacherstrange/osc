import { useMemo } from 'react';
import React, { useEffect, useState, useRef } from 'react';

type TemplateName = 'slider' | 'grid' | 'minicarousel' | 'microstar';

type TemplateID =
    | '539adbd6dec7e10e686debee'
    | '539ad0ffdec7e10e686debd7'
    | '54ad5defc6454f065c28af8b'
    | '5419b732fbfb950b10de65e5';

type Status = 'idle' | 'loading' | 'ready' | 'error';

interface Templates {
    id: TemplateID;
    name: TemplateName;
    responsiveHeight: string;
}

export interface Props {
    stars?: string;
    theme?: 'light' | 'dark';
    template?: TemplateName;
    height?: string;
}

export const Trustpilot = ({
    stars = '4,5',
    theme = 'light',
    template = 'slider',
    height = '240px'
}: Props) => {
    const src: string = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

    const templates = useMemo(() => {
        const templates: Templates[] = [
            {
                id: '54ad5defc6454f065c28af8b',
                name: 'slider',
                responsiveHeight: '240px'
            },
            {
                id: '539adbd6dec7e10e686debee',
                name: 'grid',
                responsiveHeight: '400px'
            },
            {
                id: '539ad0ffdec7e10e686debd7',
                name: 'minicarousel',
                responsiveHeight: '350px'
            },
            {
                id: '5419b732fbfb950b10de65e5',
                name: 'microstar',
                responsiveHeight: '64px'
            }
        ];

        return templates;
    }, []);

    // We need a reference to this element to load the TrustBox
    const ref = useRef(null);
    // Keep track of script status
    const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle');
    const [iframeHeight, setIframeHeight] = useState<string>(height);

    let templateID: TemplateID;

    // Apply the appropriate ID depending on the template set
    for (const key in templates) {
        if (Object.prototype.hasOwnProperty.call(templates, key)) {
            const element = templates[key];

            if (template === element.name) {
                templateID = element.id;
            }
        }
    }

    // Setup the third party script tag and render the TrustPilot widget
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

    // Adjust the height when the screen is resized to ensure things don't get cut off
    useEffect(() => {
        const breakpoint = window.matchMedia('(max-width: 300px)');

        const setHeightFromEvent = () => {
            for (const key in templates) {
                if (Object.prototype.hasOwnProperty.call(templates, key)) {
                    const element = templates[key];

                    if (templateID === element.id) {
                        if (breakpoint.matches) {
                            setIframeHeight(element.responsiveHeight);
                            return;
                        } else {
                            setIframeHeight(height);
                            return;
                        }
                    }
                }
            }
        };

        if (status === 'ready' || window.Trustpilot) {
            const iframe = document.querySelector<HTMLElement>(
                `[data-template-id="${templateID}"] > iframe`
            );

            if (iframe) {
                iframe.style.height = iframeHeight;
                setHeightFromEvent();
                window.addEventListener('resize', setHeightFromEvent);
            }
        }

        // Cleanup event listeners
        return () => {
            window.removeEventListener('resize', setHeightFromEvent);
        };
    }, [height, iframeHeight, status, templateID, templates]);

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
