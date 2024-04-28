import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState, User } from "../../../Context/ContextProvider";

function GroupChatModal({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName,setGroupChatName] = useState<string | null>(null);
  const [selectedUsers,setSelectedUsers] = useState<User[] | []>([]);
  const [search,setSearch] = useState<string>("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState<boolean>(false);

  const toast = useToast();

  const {user, chats, setChats} = ChatState();

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'35px'}
            fontFamily={'Works sans'}
            display={'flex'}
            justifyContent={'center'}
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
