import React, { useEffect, useState } from 'react';
import { Progress } from '../Progress/Progress';
import { Button } from '../Button/Button';
import { classNames } from '../../utils/classNames';
import './pagination.scss';

export interface PaginationProps {
    /**
     * Custom class
     */
    className?: string;
    /**
     * Determines whether more items are being loaded
     */
    isLoading?: boolean;
    /**
     * Number of items loaded
     */
    numberLoaded: number;
    /**
     * External function to control pagination
     */
    onPaginate?: () => void;
    /**
     * Total number of items
     */
    total?: number;
    /**
     * Description of item type
     */
    itemTypeDescription: string;
}

export const Pagination = (props: PaginationProps) => {
    const {
        className,
        isLoading = false,
        itemTypeDescription,
        numberLoaded,
        onPaginate,
        total,
    } = props;

    const [progressLevel, setProgressLevel] = useState<number>(0);

    useEffect(() => {
        const progressAsPercentage = Math.round((numberLoaded / total) * 100);

        setProgressLevel(progressAsPercentage);
    }, [numberLoaded, total]);

    const classes = classNames('c-pagination', className);

    return (
        <div className={classes}>
            <ProgressDetails
                numberLoaded={numberLoaded}
                total={total}
                itemTypeDescription={itemTypeDescription}
            />
            <Progress progressLevel={progressLevel} />
            {total !== numberLoaded ? (
                <Button
                    variant="secondary"
                    className="c-pagination__button"
                    isLoading={isLoading}
                    onClick={onPaginate}
                >
                    Load more
                </Button>
            ) : null}
        </div>
    );
};

interface ProgressDetailsProps {
    numberLoaded: number;
    total: number;
    itemTypeDescription: string;
}

const ProgressDetails = (props: ProgressDetailsProps) => {
    const { numberLoaded, total, itemTypeDescription } = props;

    return (
        <div className="c-pagination__progress-details">
            <span> You've viewed </span>
            {''}
            <span>
                {numberLoaded} of {total}
            </span>{' '}
            <span>{itemTypeDescription}</span>
        </div>
    );
};
