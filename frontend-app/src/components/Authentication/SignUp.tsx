import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function SignUp() {

  const [show,setShow] = React.useState<boolean>(false);
  const [conShow,setConshow] = React.useState<boolean>(false);
  const [loading,setLoading] = React.useState<boolean>(false);
  const [name,setName] = React.useState<string>();
  const [email,setEmail] = React.useState<string>();
  const [confirmpassword,setConfirmpassword] = React.useState<string>();
  const [password,setPassword] = React.useState<string>();
  const [pic,setPic] = React.useState<string>();
  const toast = useToast()
  const navigate = useNavigate()

  const postDetails = (pics:File) => {
    setLoading(true);
    if(pics === undefined){
      
      toast({
        title: 'Please select an image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return;

    }

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","chatApp-mern");
      data.append("cloud_name","diemdrcq6");
      // console.log('Starting upload...');
      fetch("https://api.cloudinary.com/v1_1/diemdrcq6/image/upload", {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        }
      }).then(res => res.json())
        .then(data => {
          // console.log('Upload successful:', data.url.toString());
          // console.log(data)
          setPic(data.url.toString());
          setLoading(false);
        }).catch(err => {
          console.log(err);
          setLoading(false);
        })


    }else{
      toast({
        title: 'Unsupported image format.',
        description: 'Only JPEG and PNG formats are allowed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }
  }

  const submitHandler = async() => {
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
      
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return;
    }else if(password !== confirmpassword){
      toast({
        title: 'Password must be same on the both fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return ;
    }

    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const {data} = await axios.post(`${API_URL}/api/user`, {name,email,password,pic}, config);

        toast({
          title: 'Registeration successful',
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
    <VStack spacing='5px'>
        <FormControl id='name' isRequired>
          <FormLabel>Name</FormLabel>
          <Input 
            placeholder='Enter the name'
            onChange={(e)=> setName(e.target.value)}
            
          />
        </FormControl>

        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type='email'
            placeholder='Enter the email'
            onChange={(e)=> setEmail(e.target.value)}
            
          />
        </FormControl>

        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input 
            type={ show? "text": "password"}
            placeholder='Enter the password'
            onChange={(e)=> setPassword(e.target.value)}
            
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" 
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirmPassword' isRequired>
          <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input 
            type={ conShow? "text": "password"}
            placeholder='Enter the password again'
            onChange={(e)=> setConfirmpassword(e.target.value)}
            
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" 
              onClick={ ()=> setConshow(!conShow)}
            >
              {conShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic'>
          <FormLabel>Upload your picture</FormLabel>
          <Input 
            type='file'
            p={1.5}
            accept='image/'
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                postDetails(e.target.files[0]);
              }
            }}
          />
        </FormControl>

        <Button
          colorScheme='blue'
          width="100%"
          style={{marginTop: 15}}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
        
    </VStack>
  )
}

export default SignUp