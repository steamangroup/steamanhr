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
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

export default function DeleteModal({ deletehandler, onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box h="18px" onClick={onDelete} mt="-3px">
        <Tooltip label="delete record">
          <DeleteIcon
            onClick={onOpen}
            mt="-4px"
            color="red.500"
            cursor="pointer"
          />
        </Tooltip>
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
