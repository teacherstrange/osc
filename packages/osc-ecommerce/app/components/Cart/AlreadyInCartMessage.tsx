import { Link } from '@remix-run/react';
import { Alert } from 'osc-ui';

export const AlreadyInCartMessage = () => {
    return (
        <Alert status="info" displayIcon={false}>
            <p>
                If you are looking to enrol multiple people on the same course, please{' '}
                <Link to="/contact" className="u-text-underline">
                    contact us
                </Link>{' '}
                to discuss the best offers.
            </p>
        </Alert>
    );
};
