import { Box, Button, Code, Stack, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Flex} from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { PROTECTED, USERS } from "lib/routes";
import { Link } from "react-router-dom";
import Avatar from "components/profile/Avatar";
import { AiOutlineUser } from "react-icons/ai";


function ActiveUser({ onClose }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return "Loading...";

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar user={user} />
      <Code>@{user.username}</Code>
      <Button
        style={{ border: '2px solid teal', borderColor: 'teal' }}
        colorScheme="teal"
        w="full"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`}
        onClick={onClose}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        style={{ border: '2px solid teal', borderColor: 'teal' }}
        marginTop="10"
        marginLeft="10"
        px="6"
        height="80vh"
        w="100%"
        maxW="300px"
        borderLeft="1px solid"
        borderLeftColor="teal.100"
        display={{ base: "none", md: "block" }}
      >
        <ActiveUser />
        <Box align="center">
          <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
          <Button
            style={{ border: '2px solid teal', borderColor: 'teal' }}
            variant="outline"
            colorScheme="teal"
            as={Link}
            to={USERS}
            mt="4"
            size="sm"
          >
            ALL USERS
          </Button>
        </Box>
      </Box>
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        bottom="0"
        right="0"
        mr="6"
        mb="6"
        zIndex="docked"
      >
      <Flex justifyContent="center">
      <Button
        leftIcon={<AiOutlineUser />}
        style={{ border: '1px solid black', borderColor: 'black' }}
        onClick={onOpen}
        size="sm"
        colorScheme="#DC143C"
        backgroundColor="teal"
        color="white"
        width="100px"
        height="40px"
      >
        Profile
      </Button>
  </Flex>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Profile</DrawerHeader>
            <DrawerBody>
              <ActiveUser onClose={onClose} />
              <Box align="center">
                <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
                <Button
                  style={{ border: '2px solid rosybrown', borderColor: 'teal' }}
                  variant="outline"
                  colorScheme="teal"
                  as={Link}
                  to={USERS}
                  mt="4"
                  size="sm"
                >
                  ALL USERS
                </Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

