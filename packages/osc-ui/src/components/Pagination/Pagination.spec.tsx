import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Pagination } from './Pagination';

const NUMBER_LOADED = 10;
const TOTAL = 30;
const ITEM_TYPE_DESCRIPTION = 'blog posts';

test('should render the Pagination component with the correct progress details, a "Load more" button and a Progress slider', () => {
    render(
        <Pagination
            itemTypeDescription={ITEM_TYPE_DESCRIPTION}
            numberLoaded={NUMBER_LOADED}
            total={TOTAL}
        />
    );

    expect(
        screen.getByText((_, element) => element.className === 'c-pagination__progress-details')
    ).toHaveTextContent("You've viewed 10 of 30 blog posts");
    expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('should render a loading button is IsLoading is true', () => {
    render(
        <Pagination
            isLoading={true}
            itemTypeDescription={ITEM_TYPE_DESCRIPTION}
            numberLoaded={NUMBER_LOADED}
            total={TOTAL}
        />
    );

    expect(screen.getByRole('button', { name: 'Loading' })).toBeInTheDocument();
});

test('should not render a Load More button if numberLoaded is equal to the total', () => {
    const NUMBER_LOADED_SAME_AS_TOTAL = TOTAL;
    render(
        <Pagination
            isLoading={true}
            itemTypeDescription={ITEM_TYPE_DESCRIPTION}
            numberLoaded={NUMBER_LOADED_SAME_AS_TOTAL}
            total={TOTAL}
        />
    );
    expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();
});

test('should call onPaginate function when the button is clicked', async () => {
    const user = userEvent.setup();

    const mockOnPaginateFunction = vi.fn();

    render(
        <Pagination
            itemTypeDescription={ITEM_TYPE_DESCRIPTION}
            numberLoaded={NUMBER_LOADED}
            onPaginate={mockOnPaginateFunction}
            total={TOTAL}
        />
    );

    const button = screen.getByRole('button', { name: 'Load more' });
    await user.click(button);

    expect(mockOnPaginateFunction).toHaveBeenCalledTimes(1);
});
