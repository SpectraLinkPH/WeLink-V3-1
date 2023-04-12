import { Box, Text } from "@chakra-ui/react";
import Header from "./Header";
import Actions from "./Actions";

export default function Post({ post }) {
  const { text } = post;

  return (
    <Box p="2" maxW="600px" textAlign="left" style={{ borderRadius: '5px', border: '2px solid teal', borderColor: 'teal', marginBottom: '15px' }}>
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header post={post} />

        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize="md" color="teal">
            {text}
          </Text>
        </Box>

        <Actions post={post} />
      </Box>
    </Box>
  );
}
