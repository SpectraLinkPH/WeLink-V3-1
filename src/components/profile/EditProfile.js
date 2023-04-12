import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "hooks/auth";
import { useUpdateAvatar } from "hooks/users";
import Avatar from "./Avatar";

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
    updateUser,
  } = useUpdateAvatar(user?.id);

  const [newUserId, setNewUserId] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSave() {
    // Update the user's ID
    await updateUser({ id: newUserId });
    // Update the user's avatar
    await updateAvatar();
    // Close the modal
    onClose();
  }

  if (authLoading) return "Loading...";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="5">
            <Avatar user={user} overrideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          <FormControl py="4">
            <FormLabel htmlFor="newUserId">Change user ID</FormLabel>
            <Input
              id="newUserId"
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
            />
          </FormControl>
          <Button
            loadingText="Uploading"
            w="full"
            my="6"
            colorScheme="teal"
            onClick={handleSave}
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
