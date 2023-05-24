import { Link } from '@remix-run/react';
import { Alert } from 'osc-ui';

export const ErrorAlert = () => {
    return (
        <Alert status="error">
            Oops, something went wrong! Please try again, if this issue persists{' '}
            <Link to="/contact" className="u-text-underline">
                get in touch
            </Link>
        </Alert>
    );
};
