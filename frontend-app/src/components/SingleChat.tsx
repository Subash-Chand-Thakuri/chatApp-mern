import React, { KeyboardEvent, useEffect, useState } from 'react'
import { ChatState, User,MessageType } from '../Context/ContextProvider'
import { Box, FormControl, Icon, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Authentication/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Authentication/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from "./ScrollableChat"
import io, { Socket } from "socket.io-client"
// import { DefaultEventsMap } from '@socket.io/component-emitter';
import Lottie from 'react-lottie'
import animationData from "../assets/animations/typing.json"

const API_URL = import.meta.env.VITE_API_URL;

const ENDPOINT = `${API_URL}`;
let socket: Socket, selectedChatCompare;

interface ChatBoxProps {
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  
  function SingleChat({ fetchAgain, setFetchAgain }: ChatBoxProps){
    const [messages , setMessages] = useState<string[] | "">([]);
    const [loading , setLoading] = useState(false);
    const [newMessage , setNewMessage] = useState<string>("")
    const [socketConnected, setSocketConnected] = useState<boolean>(false)
    const [typing,setTyping] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const toast = useToast();
    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

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
                // console.log(selectedChat)

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

    
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connected', () => {
            setSocketConnected(true);
        }); 
        socket.on('typing',()=>setTyping(true));
        socket.on("stop typing", () => setIsTyping(false))
        
        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
            // Handle errors appropriately (e.g., display notification)
          });
        
          return () => {
            socket.disconnect(); // Clean up socket on component unmount
          };
        
    }, []);
    
    useEffect(()=>{
        fetchMessages();

        selectedChatCompare = selectedChat; 
    },[selectedChat])

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if(!selectedChatCompare! || selectedChat?._id !== newMessageReceived.chat._id ){
                if(!notification.includes(newMessageReceived)){
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain)
                }
            }else{
                setMessages([...messages, newMessageReceived])
            }
        })
    })
    

    const sendMessage = async(e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && newMessage ){
            socket.emit('stop typing', selectedChat?._id)
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
            socket.emit("new message", data)
            setNewMessage("");
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

    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewMessage(e.target.value);

            if(!socketConnected) return;

            if(!typing){
               setTyping(true) 
               socket.emit("typing", selectedChat?._id)
            }

            const lastTypingTime = new Date().getTime();
            const timerLength = 3000;
            setTimeout(() => {
                const timeNow = new Date().getTime();
                const timeDiff = timeNow - lastTypingTime;

                if(timeDiff >= timerLength && typing){
                    socket.emit("stop typing", selectedChat?._id);
                    setTyping(false)
                }

            },timerLength)
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
                                <ProfileModal user={getSenderFull(user!,selectedChat.users) as User } />
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
                                <ScrollableChat messages={Array.isArray(messages) ? (messages as unknown as MessageType[]).map((message: MessageType) => ({ _id: message._id, content: message.content, sender: message.sender })) : []} />


                            </div>
                        )
                    };

                    <FormControl onKeyDown={sendMessage} isRequired mt={3} >
                        {isTyping?<div>
                            <Lottie 
                                    options={defaultOptions}
                                    width={70}
                                    style={{marginBottom: 15, marginLeft: 0}}
                                />
                        </div>:<></>}
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