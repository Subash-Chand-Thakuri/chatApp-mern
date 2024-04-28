import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../Context/ContextProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../../UserAvatar/UserListItem";


interface User {
  name: string;
  pic: string;
  email: string;
  token: string;
  _id:string;
}

function SideDrawer() {
  const [search, setSearch] = useState<string | null>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const navigate = useNavigate()
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
  }

  const handleSearch = async() => {
    // console.log(user)
    if(!search){
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
      } ;

      const {data} = await axios.get(`/api/user?search=${search}`,config);
      // console.log("data: ",data.users)

      setLoading(false);
      setSearchResult(data.users);
      // console.log("searchResult data: ",searchResult)

    } catch (error) {
      toast({
        title:"Error occured",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }

  };


  const accessChat = async (userId:string) =>{
    try {
      
      setLoadingChat(true);

      const config = {
        "Content-type": "application/json",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const {data} = await axios.post("/api/chat",{userId}, config);

      if(!chats?.find((c) => c._id === data._id)) setChats([data, ...chats!])
      
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();

    } catch (error) {
      toast({
        title:"Error occured",
        description: error instanceof Error ? error.message : "Unkown error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.200"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button onClick={onOpen} variant="ghost" colorScheme="cyan">
            <i className="fa-brands fa-searchengin"></i>
            <Text p="4" display={{ base: "none", md: "flex" }}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work sans" color="black">
          Chat-With-Me
        </Text>
        <div>
          <Menu>
            <MenuButton p={1} />
            <BellIcon boxSize={6} color="black" margin={1} />
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name || "Unknown User"}
                src={user?.pic}
              />
            </MenuButton>
              <MenuList color="black">
            <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
            </ProfileModal>
                <MenuDivider></MenuDivider>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
          </Menu>
        </div>
      </Box>
      
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' >
              Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display='flex' pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search!}
                onChange={(e)=> setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading/>
            ):(
              searchResult?.map(user=>(
                <UserListItem
                user={user} 
                key={user._id}
                handleFunction={()=>accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
