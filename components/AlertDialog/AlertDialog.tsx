import React from 'react';
import { 
    AlertDialog, 
    AlertDialogOverlay, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogBody, 
    AlertDialogFooter, 
    Button 
} from '@chakra-ui/react';

const AlertDialogWrapper = ({isOpen, onClose, onAction, dialogHeader, dialogBody}) => {
    const cancelRef = React.useRef()

    return (
        <AlertDialog
            size='sm'
            motionPreset='slideInBottom'
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {dialogHeader}
                </AlertDialogHeader>
                <AlertDialogBody>
                    {dialogBody}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme='red' onClick={onAction}>
                        Delete
                    </Button>
                    <Button ref={cancelRef} onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogWrapper;