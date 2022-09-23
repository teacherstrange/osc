import './header.css';
import type { FC } from 'react';
import React from 'react';
import {
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionIcon,
    Box,
    AccordionPanel
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export interface Props {
    [x: string]: string;
}

export const Header: FC<Props> = (props) => {
    const { className, ...other } = props;
    return (
        <Accordion className={`o-header ${className}`} {...other}>
            <AccordionItem>
                <Link to={`/login`}>login link</Link>
                <h2>
                    <AccordionButton>
                        <Box className="tester" flex="1" textAlign="left">
                            changed title again 2
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel color={'primary'} bg={'secondary'} pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            Section 2 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
