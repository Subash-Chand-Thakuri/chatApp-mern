import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

function HomePage() {
  
  return (
    <Container maxW="xl">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Open sans" color="black">
          Chat With Me
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius={"7px"}>
        <Tabs size="md" variant="enclosed">
          <TabList mb="1rem">
            <Tab _selected={{ color: 'white', bg: 'darkGreen.500' }} width="50%">Login</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal' }} width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <Login />
            </TabPanel>
            <TabPanel>
                <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
