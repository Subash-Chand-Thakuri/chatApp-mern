import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { ChatState, User } from '../../Context/ContextProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import { useState } from 'react';

interface UpdateGroupChatModalProps {
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    fetchMessages: () => void;
  }

  const UpdateGroupChatModal: React.FC<UpdateGroupChatModalProps> = ({
    fetchAgain,
    setFetchAgain,
    fetchMessages
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedChat, setSelectedChat, user } = ChatState();
    const [groupChatName, setGroupChatName] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [renameLoading, setRenameLoading] = useState<boolean>(false);

    const toast = useToast();

    const handleRemove = async(user1: User) => {
       

        if(selectedChat?.groupAdmin?._id !== user?._id && user1._id !== user?._id){
            toast({
                title: "Only admins can add someone!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return ;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,

                },
            };

            const {data} = await axios.put(`/api/chat/groupremove`,{
                chatId: selectedChat?._id,
                userId: user1._id,
            },
        config
    );

    user1._id === user?._id ? setSelectedChat(null) : setSelectedChat(data)
    setFetchAgain(!fetchAgain);
    fetchMessages();
    setLoading(false);
            
        } catch (error: any) {
            toast({
                title: "Error Occured!",
                description: error.response?.data?.message || 'Failed to remove user',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

    const handleRename = async() => {
        if(!groupChatName) return;

        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const {data} = await axios.put(`/api/chat/grouprename`,{
                chatId: selectedChat!._id,
                chatName: groupChatName,
            },
            config
        );

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);

        } catch (error: any) {
            toast({
                title: "Error Occured",
                description: error.response?.data?.message || 'Failed to rename group',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setRenameLoading(false);
        }
        setGroupChatName('');
    };

    const handleSearch = async(query:string) => {
        setSearch(query);
        if(!query){
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const {data} = await axios.get(`/api/user/?search=${search}`,config);
            // console.log(data);
            setSearchResult(data.users);
            setLoading(false);
            
        } catch (error: any) {
            toast({
                title: "Error Occured!",
                description: "Failed to load the seach results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
            setLoading(false);
        }
    };

    const handleAddUser = async(user1: User) => {
        if(selectedChat?.users.find(u=> u._id === user1._id)){
            toast({
                title: "User already in the group",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return ;
        }

        if(selectedChat?.groupAdmin?._id !== user?._id){
            toast({
                title: "Only admins can add someone!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return ;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,

                },
            };

            const {data} = await axios.put(`/api/chat/groupadd`,{
                chatId: selectedChat?._id,
                userId: user1._id,
            },
        config
    );

    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    setLoading(false);
            
        } catch (error: any) {
            toast({
                title: "Error Occured!",
                description: error.response?.data?.message || 'Failed to add user',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    }

  return (
    <>
      <IconButton aria-label='Clikc' display={{base: 'flex'}} icon={<ViewIcon/>} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'35px'}
            fontFamily={'Work sans'}
            display={'flex'}
            justifyContent={'center'}
          >{selectedChat?.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <Box w={'100%'} display={'flex'} flexWrap={'wrap'} pb={3} >
                    {selectedChat?.users.map(u => (
                         <UserBadgeItem
                         key={u?._id}
                         user={u}
                         handleFunction={() => handleRemove(u)}
                       />
                    ))}
                </Box>
                <FormControl
                    display={'flex'}
                >
                    <Input
                        placeholder='Chat Name'
                        mb={3}
                        value={groupChatName}
                        onChange={(e)=> setGroupChatName(e.target.value)}
                    />
                    <Button
                        variant={'solid'}
                        colorScheme='teal'
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                    >Update</Button>
                </FormControl>

                <FormControl
                    display={'flex'}
                >
                    <Input
                        placeholder='Add User to group'
                        mb={3}
                        onChange={(e)=> handleSearch(e.target.value)}
                    />
                   
                </FormControl>
                    {loading ? (
                        <Spinner size={'lg'} />
                    ):(
                        searchResult?.map((user)=>(
                            <UserListItem
                            key={user?._id}
                            user={user}
                            handleFunction={()=> handleAddUser(user)}
                            />
                        ))
                    )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => user && handleRemove(user)} bg='red' >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal