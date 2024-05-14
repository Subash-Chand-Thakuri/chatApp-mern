import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import {isSameSender, isLatestMessage, isSameSenderMargin, isSameUser}  from '/src/config/ChatLogics'
import { ChatState } from '../Context/ContextProvider'
import { Tooltip, Avatar } from '@chakra-ui/react'


function ScrollableChat({messages}) {
    const {user} = ChatState();
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i) => (
            <div style={{display: 'flex'}} key={m._id} >
                    {
                        (isSameSender(messages,m,i,user._id)
                        || isLatestMessage(messages,i,user._id)
                        ) && (
                            <Tooltip
                                label={m.sender.name}
                                placement='bottom-start'
                                hasArrow
                                
                            >
                                <Avatar 
                                    mt='7px'
                                    mr={1}
                                    size={'sm'}
                                    cursor={'pointer'}
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                    
                                >

                                </Avatar>
                            </Tooltip>
                        )
                        
                    }

                    <span style={{
                        backgroundColor: `${
                            m.sender._id === user._id ? "#702963": "#51414F"
                        }`,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i) ? 3: 10,
                    }} >{m.content}</span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat