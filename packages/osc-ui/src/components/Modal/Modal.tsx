import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Heading
} from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';

export interface Props {
    Open?: boolean;
    ModalButtonText: string;
    title: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    hideHeaderCloseButton: boolean;
    hideFooterCloseButton: boolean;
    closeDisabled: boolean;
    overlayColour: string;
    primaryActionButton: boolean;
    primaryActionButtonText: string;
    onClick: () => void;
}

export const OSCModal: FC<Props> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        Open,
        ModalButtonText,
        title,
        size,
        children,
        hideHeaderCloseButton,
        hideFooterCloseButton,
        closeDisabled,
        overlayColour,
        primaryActionButton,
        primaryActionButtonText,
        onClick
    } = props;
    return (
        <>
            <Button onClick={onOpen}>{ModalButtonText}</Button>
            <Modal
                closeOnOverlayClick={!closeDisabled}
                blockScrollOnMount={true}
                size={size}
                isOpen={Open ? Open : isOpen}
                onClose={onClose}
            >
                <ModalOverlay backgroundColor={overlayColour} />
                <ModalContent>
                    <ModalHeader>
                        <Heading>{title}</Heading>
                    </ModalHeader>
                    {!hideHeaderCloseButton && !closeDisabled && <ModalCloseButton />}
                    <ModalBody>{children}</ModalBody>

                    <ModalFooter>
                        {!hideFooterCloseButton && !closeDisabled && (
                            <Button mr={3} className="o-modal-close" onClick={onClose}>
                                Close
                            </Button>
                        )}
                        {primaryActionButton && (
                            <Button onClick={onClick}>{primaryActionButtonText}</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
