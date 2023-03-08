import React from 'react';
import '../autocomplete.scss';

//-------------------------------------------------- //
// No results
// ------------------------------------------------- //

export const NoResult = () => {
    return <div>No Results</div>;
};

//-------------------------------------------------- //
// No results
// ------------------------------------------------- //

interface ResultsHeaderProps {
    title: string;
}

export const ResultsHeader = (props: ResultsHeaderProps) => {
    const { title } = props;
    return (
        <>
            <span className="aa-SourceHeaderTitle">{title}</span>
            <span className="aa-SourceHeaderLine" />
        </>
    );
};

//-------------------------------------------------- //
// Product Item
// ------------------------------------------------- //

// TODO - Needs typing correctly
interface ProductItemProps {
    components?: any;
    item?: any;
    onParentStateChange?: any;
    query?: any;
    setQuery?: any;
}

export const ProductItem = (props: ProductItemProps) => {
    const { components, item, onParentStateChange, query, setQuery } = props;

    return (
        <div
            onClick={async () => {
                onParentStateChange(item as any);
                setQuery(query);
            }}
            className="aa-ItemLink"
        >
            <div className="aa-ItemContent">
                {item.image && (
                    <div className="aa-ItemIcon">
                        <img
                            src={item.image as any}
                            alt={item.title as any}
                            width="40"
                            height="40"
                        />
                    </div>
                )}
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                        {item.title && <components.Highlight hit={item} attribute="title" />}
                        {item.label && <components.Highlight hit={item} attribute="label" />}
                    </div>
                    <div className="aa-ItemContentDescription">
                        <components.Snippet hit={item} attribute="sku" />
                    </div>
                </div>
            </div>
            <div className="aa-ItemActions">
                <button
                    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                    type="button"
                    title="Select"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export const ProductItemCustom = (props: ProductItemProps) => {
    const { item } = props;
    return (
        <div key={item.objectID} className="aa-ItemContent">
            {item.image && (
                <div className="aa-ItemIcon">
                    <img src={item.image as any} alt={item.title as any} width="40" height="40" />
                </div>
            )}
            <div className="aa-ItemContentBody">
                <div className="aa-ItemContentTitle">
                    {item.title}
                    {item.label}
                </div>
                <div className="aa-ItemContentDescription"></div>
            </div>
            <div className="aa-ItemActions">
                <button
                    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                    type="button"
                    title="Select"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
