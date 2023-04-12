import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PostsList from "components/post/PostsList";
import { usePosts } from "hooks/posts";
import { useUser } from "hooks/users";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "hooks/auth";
import { useState } from "react";

export default function Profile() {
  const { id } = useParams();
  const { posts, isLoading: postsLoading } = usePosts(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFollowing, setIsFollowing] = useState(false);

  if (userLoading) return "Loading...";

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Stack spacing="5">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Avatar size="2xl" user={user} />

        <Stack ml="10">
          <Text fontSize="2xl">{user.username}</Text>
          <HStack spacing="8">
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Posts: {posts.length}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Likes: 
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM YYY")}
            </Text> 
          </HStack>
        </Stack>

        <EditProfile isOpen={isOpen} onClose={onClose} />
        
        {!authLoading && authUser.id !== user.id && (
          <div style={{ position: "absolute", top: 10, right: 5 }}>
            <Button
              style={{
                border: "2px solid teal",
                borderColor: "teal",
              }}
              display="flex"
              colorScheme={isFollowing ? "gray" : "teal"}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
        )}
      </Flex>
      {!authLoading && authUser.id === user.id && (
        <Button
          style={{ border: "2px solid teal", borderColor: "teal" }}
          display="flex"
          colorScheme="teal"
          onClick={onOpen}
        >
          Edit Profile
        </Button>
      )}
      <Divider />
      {postsLoading ? (
        <Text>Posts are loading...</Text>
      ) : (
        <PostsList posts={posts} />
      )}
    </Stack>
  );
}
