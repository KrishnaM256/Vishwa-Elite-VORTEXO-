import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
} from '@chakra-ui/react';

const DialogBox = ({ isOpen, onClose, title, children, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* {children} */}
                    <section>
                        <p>Student Name</p>
                        <Stack>

                        </Stack>
                    </section>
                </ModalBody>

                <ModalFooter className='flex flex-row gap-3'>
                    <Button
                        style={{
                            backgroundColor: '#7065FF',
                            color: 'white',
                            borderRadius: '5px',
                            height: '35px',
                        }}
                        size="xs"
                    > Add Student </Button>
                    
                    <Button style={{backgroundColor: '#FFFFFF', color: '#828282', border: '1px solid #828282', borderRadius: '5px', height: '35px'}} size="xs" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DialogBox;