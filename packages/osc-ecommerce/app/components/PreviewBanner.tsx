import { Button } from 'osc-ui';

export const PreviewBanner = () => {
    return (
        <div className="preview-banner u-bg-color-primary u-color-tertiary">
            <div className="o-container o-grid u-pt-xs u-pb-xs">
                <div className="o-grid__col--12 o-grid__col--8@mob u-self-center">
                    <p className="t-font-l u-mb-0">Preview Mode</p>
                </div>

                <div className="o-grid__col--12 o-grid__col--4@mob u-self-center">
                    <form action="/resources/preview" method="POST">
                        <Button variant="quaternary" isInversed type="submit">
                            Exit Preview Mode
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
