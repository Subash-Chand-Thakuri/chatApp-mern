import React, { useEffect, useState } from "react";
import { ChatState, User } from "../../Context/ContextProvider";
import { Text, Box, Button, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

function MyChats() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") || ""));
    fetchChats();
    // console.log("chats: ", chats);
    // console.log("selectedChat: ", selectedChat);
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Wrok sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={"black"}
      >
        Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#f8f8f8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflow={"hidden"}
      >
        {chats ? (
          <Stack overflow={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38b2ac" : "#e8e8e8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat && loggedUser
                    ? getSender(loggedUser, chat?.users)
                    : chat?.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
