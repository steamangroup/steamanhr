import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
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
import AddEmployeeForm from "./AddEmployeeForm";
import LeaveOverView from "@/components/leave/LeaveOverView";
import { useRouter } from "next/router";

function NewEmployeeAction() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEmployee, setNewEmployee] = useState({
    workProfile: {
      title: "",
      fullName: "",
      profilePicture: "",
      businessUnit: "",
      employmentType: "",
      workEmail: "",
      jobTitle: "",
      //teams: [],
      department: "",
      officeLocation: "",
      employmentStatus: "",
      employmentStartDate: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      contactNumber: "",
      placeOfResidence: "",
      educationalLevel: "",
      snnit: "",
      nationaldNumber: "",
      tin: "",
      numberOfDependents: "",
      nextOfKinName: "",
      nextOfKinNumber: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      employeeBankName: "",
      accountHolder: "",
      accountNumber: "",
      healthCondition: "",
      onMedication: "",
      extraInformation: "",
    },
  });

  const toast = useToast();
  const handleAddEmployee = (e) => {
    const formData = newEmployee.workProfile;
    //const formLength = Object.values(formData).length;
    e.preventDefault();
    if (formData.fullName || formData.title || formData.employmentType === "") {
      return toast({
        title: "Unsuccesful",
        description: "Creation of employee unsucessful ",
        status: "error",
        position: "top-right",
        duration: 1200,
        isClosable: true,
      });
    } else {
      return toast({
        title: "Employee added",
        description: "New employee has been added successfully",
        status: "success",
        position: "top-right",
        duration: 1200,
        isClosable: true,
      });
    }

    //alert(newEmployee);
  };

  return (
    <Flex justifyContent="space-between" w="50vw">
      <Box>
        <Text>All Employees</Text>
      </Box>

      <Box>
        <Button
          onClick={onOpen}
          colorScheme="green"
          size="sm"
          rightIcon={<AddIcon />}
        >
          Add Employee
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
          <ModalHeader>Add Employee Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEmployeeForm
              newEmployee={newEmployee}
              setNewEmployee={setNewEmployee}
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

export default NewEmployeeAction;
