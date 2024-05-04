import { Box, SkeletonText, Stack } from "@chakra-ui/react";

function ChatLoading() {
  return (
    <Stack>
      <Box padding="6" boxShadow="lg" bg="white">
        {/* <SkeletonCircle size="10" /> */}
        <SkeletonText mt="4" noOfLines={23} spacing="4" skeletonHeight="4" />
      </Box>
    </Stack>
  );
}

export default ChatLoading;
