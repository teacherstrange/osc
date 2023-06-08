import { Alert } from 'osc-ui';

export const AlreadyInCartMessage = () => {
    return (
        <Alert status="info" displayIcon={false}>
            <p>
                You already have this course in your basket.{' '}
                <strong>
                    If you are looking to enrol multiple people onto the same course, please give us
                    a call on <a href="tel:01213294666">0121 329 4666</a> to discuss packages.
                </strong>
            </p>
        </Alert>
    );
};
