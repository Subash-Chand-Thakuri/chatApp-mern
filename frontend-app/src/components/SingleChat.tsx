import React from 'react'
import { ChatState } from '../Context/ContextProvider'
import { Box, Icon, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Authentication/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Authentication/UpdateGroupChatModal';

function SingleChat({fetchAgain,setFetchAgain}) {
    const {user, selectedChat, setSelectedChat} = ChatState();

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