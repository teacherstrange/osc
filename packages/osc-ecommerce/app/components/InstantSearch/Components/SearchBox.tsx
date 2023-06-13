import { TextInput } from 'osc-ui';
import { useCallback, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import type { UseSearchBoxProps } from 'react-instantsearch-hooks';

export const SearchBox = (props: UseSearchBoxProps) => {
    const queryHook: UseSearchBoxProps['queryHook'] = useCallback(
        (query: string, search: (value: string) => void) => {
            search(query);
        },
        []
    );

    const { refine, query } = useSearchBox({ ...props, queryHook });

    const ref = useRef<HTMLInputElement>(null);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Nothing to submit as Algolia updates results on each keystroke.
        // This is simply UX tweak so that when a user hits return it removes focus from text input
        ref.current?.blur();
    };

    return (
        <form onSubmit={onSubmit}>
            <TextInput
                icon={{ id: 'search', className: 't-font-l' }}
                className="c-input c-input__text c-input__text--quaternary t-font-l"
                label="Search"
                id="search"
                name="Search"
                variants={['quaternary']}
                type="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => refine(e.target.value)}
                ref={ref}
                value={query}
            />
        </form>
    );
};
