import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react';


interface User {
  name: string;
  pic: string;
  email: string;
  token: string;
  _id:string;
}

interface UserListItemProps {
  user: User;
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({user, handleFunction }) => {
 

  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#e8e8d8'
      _hover={{
        background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
        color: 'white',
      }}
      w='100%'
      display='flex'
      alignItems='center'
      color='black'
      px={3}
      py={2}
      mb={2}
      borderRadius='lg'
    >
      <Avatar 
        mr={2}
        size='sm'
        cursor='pointer'
        name={user?.name}
        src={user?.pic}

      />
      <Box>
        <Text>{user?.name}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user?.email}
        </Text>
      </Box>
      
    </Box>
  )
}

export default UserListItem