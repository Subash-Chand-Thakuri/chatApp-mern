import { Box, Button, Tooltip ,Text, Menu, MenuButton, Avatar} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../../Context/ContextProvider";

function SideDrawer() {
  const [search, setSearch] = useState<string | null>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [loading, setLoadin] = useState<boolean>(false);
  const [loadingChat, setLoadinChat] = useState<boolean>(false);

  const {user} = ChatState();

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.200'
        w="100%"
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost" colorScheme='cyan'>
          <i className="fa-brands fa-searchengin"></i>
          <Text p='4' display={{base:"none", md:'flex',}} >
              Search User
          </Text>
        </Button>
        </Tooltip>
        <Text fontSize='2xl' fontFamily="work sans" color="black">
          Chat-With-Me
        </Text>
        <div>
          <Menu>
            <MenuButton
              p={1}
            />
              <BellIcon boxSize={6}     color='black' margin={1} />
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              <Avatar size='sm' cursor='pointer' name={user?.name } />
            </MenuButton> 
          </Menu>

        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
