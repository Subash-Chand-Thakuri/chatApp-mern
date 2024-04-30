import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState, User } from "../../../Context/ContextProvider";
import axios from "axios";

function GroupChatModal({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName,setGroupChatName] = useState<string | null>(null);
  const [selectedUsers,setSelectedUsers] = useState<User[] | []>([]);
  const [search,setSearch] = useState<string>("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState<boolean>(false);

  const toast = useToast();

  const {user, chats, setChats} = ChatState();

  const handleSearch = async (query: string) => {
    setSearch(query);
    if(!query){
      return;
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
      };

      const {data} = await axios.get(`/api/user?search=${search}`, config);
      console.log(data)
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  };


  const handleSubmit = () => {}

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
          <ModalBody display={'flex'} flexDir={'column'} alignItems={'center'}>
            <FormControl>
              <Input placeholder="Chat Name" mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users eg: John,Sur, Bhur" mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* selected users */}
              {/* render searched users */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
