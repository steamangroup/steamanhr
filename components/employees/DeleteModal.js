import { DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React from "react";

export default function DeleteModal({ deletehandler, onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg="yellow" h="18px" onClick={onDelete}>
        <DeleteIcon onClick={onOpen} mt="-4px" />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete employee record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this record</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" onClick={deletehandler}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
