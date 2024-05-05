import React, { useState } from 'react'
import { ChatState } from '../Context/ContextProvider'
import { Box, FormControl, Icon, Input, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Authentication/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Authentication/UpdateGroupChatModal';

function SingleChat({fetchAgain,setFetchAgain}) {
    const [messages , setMessags] = useState([]);
    const [loading , setLoading] = useState(false);
    const [newMessages , setNewMessags] = useState()

    const {user, selectedChat, setSelectedChat} = ChatState();

    const sendMessage = () => {

    }

    const typingHandler = () => {
        
    }

  return (
    <>
        {selectedChat? (
            <>
                <Text
                    fontSize={{base: "28px", md:"30px"}}
                    pb={3}
                    px={2}
                    fontFamily={'Work sans'}
                    display='flex'
                    justifyContent={{base: "space-between"}}
                    alignItems={'center'}
                    color={'black'}
                    w={'100%'}
                >
                        <Icon
                            display={{base: "flex", md: 'none'}}
                            as={ArrowBackIcon}
                            color={'black'}
                            onClick={()=> setSelectedChat(null)}
                        />
                        {
                            !selectedChat.isGroupChat ? (
                                <>
                                {getSender(user!,selectedChat.users)}
                                <ProfileModal user={getSenderFull(user!,selectedChat.users)} />
                                </>
                            ):(
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <UpdateGroupChatModal
                                            fetchAgain={fetchAgain}
                                            setFetchAgain={setFetchAgain}
                                        />
                                    </>
                            )
                        }
                        
                </Text>
                <Box
                    display='flex'
                    flexDir='column'
                    justifyContent={'flex-end'}
                    p={3}
                    bg={'#e6e6e4'}
                    w={'100%'}
                    h={'100%'}
                    borderRadius={'lg'}
                    overflowY={'hidden'}
                >
                    {
                        loading ? (
                            <Spinner
                                size={'xl'}
                                w={20}
                                h={20}
                                alignSelf={'center'}
                                margin={'auto'}
                            />
                        ):(
                            <></>
                        )
                    };

                    <FormControl onKeyDown={sendMessage} isRequired mt={3} >
                        <Input
                            variant={'filled'}
                            bg={'#e0e0e0'}
                            placeholder='Enter a message...'
                            onChange={typingHandler}
                        />
                    </FormControl>
                </Box>
            </>
        ):(
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} h={'100%'} >
                <Text fontSize='3xl' pb={3} fontFamily={'Wrok sans'} color={'black'} >
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat