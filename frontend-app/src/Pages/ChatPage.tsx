// import axios from 'axios'
// import React, { useEffect } from 'react'
import { ChatState } from '../Context/ContextProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/Authentication/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { useState } from 'react'

const ChatPage = () => {

  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState<boolean>(false)

  // const fetchChats = async () => {
  //       try {
  //         const {data} = await axios.get('/api/chat');
  
  //         console.log(data)
  //       } catch (error: unknown) {
  //           console.log("Error fecthing chat data:", error)
  //       }
  // }

  // useEffect(() => {
  //   fetchChats();
  // },[])

  return (
    <div style={{width: "100%", color: "white"}}>
        {user && <SideDrawer />}
        <Box 
          display="flex"
          justifyContent='space-between'
          w='100%'
          h='91.5vh'
          p='10px'
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
    </div>
  )
}

export default ChatPage