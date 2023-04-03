export const PreviewBanner = () => {
    return (
        <div className="preview-banner u-bg-color-primary u-color-tertiary">
            <p className="t-font-l">Preview Mode</p>

            {/* // TODO: Add preview resource */}
            <form action="/resources/preview" method="POST">
                <button type="submit">Exit Preview Mode</button>
            </form>
        </div>
    );
};
