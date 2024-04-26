import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async() => {
    setLoading(true);
    if(!email || !password ){
      
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return;
    }

    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const {data} = await axios.post("/api/user/login", {email,password}, config);
          console.log("It's a data:",data)
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });

        localStorage.setItem("userInfo",JSON.stringify(data));

        setLoading(false);
        navigate('/chats')

    } catch (error: unknown) {
      if(error instanceof Error)
        {toast({
        title: 'Error Occured',
        description: error.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }else {
      console.error('Unexpected error:', error);
    }
      setLoading(false);
    }
  }



  return (
    <VStack spacing="5px">
      <FormControl id="email1" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter the email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password1" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter the password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading = {loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        variant="solid"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123565656");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
