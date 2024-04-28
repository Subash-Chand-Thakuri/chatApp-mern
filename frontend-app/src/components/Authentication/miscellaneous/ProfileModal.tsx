import React from "react";
import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

interface User {
    name: string;
    pic: string;
    email: string;
    token: string;
}

function ProfileModal({
    user,
    children,
}: {
    user ?: User;
    children?: React.ReactNode;
}): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const userName = user?.name || "Unkown User";

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    display={{ base: "flex" }}
                    aria-label="Close Modal"
                    icon={<ViewIcon />}
                    onClick={onOpen}
                />
            )}

            <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
                <ModalOverlay />
                <ModalContent h='400px'>
                    <ModalHeader
                      fontSize='40px'
                      fontFamily='Work sans'
                      display='flex'
                      justifyContent='center'
                    >{userName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                      display="flex"
                      flexDir='column'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Image 
                        borderRadius="full"
                        boxSize = "150px"
                        src={user?.pic}
                        alt={user?.name}
                      />
                      <Text
                        fontSize={{base:"28px",md:"30px"}}
                        fontFamily="Work sans"
                      >
                        Email: {user?.email}
                      </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfileModal;
