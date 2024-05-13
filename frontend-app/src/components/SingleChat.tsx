import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ContextProvider'
import { Box, FormControl, Icon, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Authentication/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Authentication/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from "./ScrollableChat"
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from '@socket.io/component-emitter';

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;



function SingleChat({fetchAgain,setFetchAgain}) {
    const [messages , setMessages] = useState<string[] | "">([]);
    const [loading , setLoading] = useState(false);
    const [newMessage , setNewMessage] = useState()
    const [socketConnected, setSocketConnected] = useState<boolean>(false)
    const toast = useToast();

    const {user, selectedChat, setSelectedChat} = ChatState();

    const fetchMessages = async() => {
        if(!selectedChat) return ;

        try {
            const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };

                setLoading(true);

                const {data} = await axios.get(`/api/message/${selectedChat._id}`,
                    config
                );
                console.log("Messages: ",messages)

                setMessages(data);
                setLoading(false);
                console.log(selectedChat)

                socket.emit("join-chat", selectedChat._id)

        } catch (error) {
            toast({
                title: "Error occured!",
                description: "Failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    useEffect(()=>{
        fetchMessages();

        selectedChatCompare = selectedChat; 
    },[selectedChat])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connect', () => {
            setSocketConnected(true);
            console.log("User connected to the server");
        });
    
                
    }, []);
    

    const sendMessage = async(e) => {
        if(e.key === "Enter" && newMessage ){
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                };

                const {data} = await axios.post(`/api/message`,{
                   content: newMessage,
                    chatId: selectedChat?._id,
                },
                config
            );

            console.log(data)

            setNewMessag("");
            setMessages([...messages,data])


            } catch (error) {
                toast({
                    title: "Error occured!",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                });
            }
        }
    }

    const typingHandler = (e) => {
            setNewMessag(e.target.value);

            // typing indicator logic
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
                                            fetchMessages={fetchMessages}
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
                                color='black'
                             
                            />
                        ):(
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )
                    };

                    <FormControl onKeyDown={sendMessage} isRequired mt={3} >
                        <Input
                            variant={'filled'}
                            bg={'#e0e0e0'}
                            placeholder='Enter a message...'
                            onChange={typingHandler}
                            value={newMessage}
                            border={'1px'}
                            borderColor={'black'}
                            color={'black'}
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