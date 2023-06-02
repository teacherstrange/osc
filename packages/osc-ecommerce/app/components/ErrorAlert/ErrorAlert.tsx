import { Link } from '@remix-run/react';
import { Alert } from 'osc-ui';

interface ErrorAlertProps {
    errors: any[];
}

export const ErrorAlert = (props: ErrorAlertProps) => {
    const { errors } = props;

    // Log the error to the browser console
    for (const error of errors) {
        console.error(error.data.errors ? error : error.data.errors);
    }

    return (
        <Alert status="error">
            Oops, something went wrong! Please try again, if this issue persists{' '}
            <Link to="/contact" className="u-text-underline">
                get in touch
            </Link>
        </Alert>
    );
};
