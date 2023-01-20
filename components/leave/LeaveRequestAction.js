import React, { useState } from "react";
import {
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import LeaveRequestForm from "./RequestLeaveForm";
//import AddEmployeeForm from "./AddEmployeeForm";

function NewLeaveRequest() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    leaveType: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leaveReason: "",
    handingOverNotes: "",
  });

  const handleAddEmployee = () => {
    alert("new leave requested");
    console.log(newLeaveRequest);
  };

  return (
    <Flex justifyContent="space-between" w="50vw">
      <Box>
        <Text></Text>
      </Box>

      <Box>
        <Button
          onClick={onOpen}
          colorScheme="green"
          size="sm"
          rightIcon={<AddIcon />}
        >
          New leave request
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LeaveRequestForm
              newLeaveRequest={newLeaveRequest}
              setNewLeaveRequest={setNewLeaveRequest}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleAddEmployee}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default NewLeaveRequest;
