
import { ChatState } from '../Context/ContextProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}


function ChatBox({ fetchAgain, setFetchAgain }: ChatBoxProps) {

  const {selectedChat} = ChatState();
  return (
    <Box
      display={{base: selectedChat ? "flex": "none", md:"flex"}}
      alignItems={'center'}
      flexDir={'column'}
      p={3}
      bg={'white'}
      w={{base: "100%", md: "68%"}}
      borderRadius={'lg'}
      borderWidth={'1px'}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox