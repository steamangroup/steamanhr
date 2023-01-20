import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  Box,
  Text,
  Badge,
  Button,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";

import NewEmployeeAction from "./NewEmployee/NewEmployeeAction";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UpdateEmployeeForm from "./NewEmployee/UpdateEmployeeForm";
import { useState } from "react";
export default function EmployeeTable({ children }) {
  //const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mt="0.5rem">
      <NewEmployeeAction />
      <VStack
        spacing={2}
        sx={{
          borderWidth: "1px",
          borderRadius: "0.375rem",
          alignItems: "stretch",
          mt: "1rem",
        }}
      >
        <EmployeeTable.Heading />
        {children}
      </VStack>
    </Box>
  );
}

EmployeeTable.Heading = function () {
  return (
    <Flex
      sx={{
        px: "0.75rem",
        //py: "0.1rem",
        color: "gray",
        gap: "0.1rem",
        fontSize: "0.75rem",
      }}
    >
      <Box flex={2}></Box>
      <Box flex={6}>
        <Text fontSize={15} fontWeight="400">
          Full name
        </Text>
      </Box>
      <Box flex={6}>
        <Text fontSize={15} fontWeight="400">
          Employee Type
        </Text>
      </Box>
      <Box flex={8}>
        <Text fontSize={15} fontWeight="400">
          Work Email
        </Text>
      </Box>
      <Box flex={6}>
        <Text fontSize={15} fontWeight="400">
          Phone
        </Text>
      </Box>
      <Box flex={6}>
        <Text fontSize={15} fontWeight="400">
          Business Unit
        </Text>
      </Box>
      <Box flex={3}>
        <Text fontSize={15} fontWeight="400">
          Actions
        </Text>
      </Box>
    </Flex>
  );
};

EmployeeTable.Row = function ({
  profilePicture,
  fullName,
  businessUnit,
  employmentType,
  workEmail,
  contactNumber,
  employmentStatus,
  employmentStatusColor,
}) {
  const [newEmployee, setNewEmployee] = useState({
    workProfile: {
      profilePicture: "",
      title: "",
      fullName: "",
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  //const toast = useToast();
  const handleUpdateEmployee = (e) => {
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
    <Flex
      sx={{
        p: "0.75rem",
        w: "100%",
        gap: "0.625rem",
        borderTopWidth: "1px",
        fontSize: "0.875rem",
      }}
    >
      <Flex flex={2}>
        <Image src={profilePicture || "#"} borderRadius="full" boxSize="50px" />
      </Flex>

      <Flex flex={6}>
        <Text whiteSpace="nowrap">{fullName}</Text>
      </Flex>
      <Box flex={6}>
        <Text>{employmentType || "Unknown"}</Text>
      </Box>

      <Box flex={8}>
        <Text>{workEmail}</Text>
      </Box>
      <Box flex={6}>
        <Text>{contactNumber}</Text>
      </Box>
      <Box flex={6}>
        <Text>{businessUnit}</Text>
      </Box>

      {/******
 *  <Box flex={6}>
        <Badge mx="0.625rem" colorScheme={employmentStatusColor}>
          {employmentStatus}
        </Badge>
      </Box>
 * 
 */}
      <Flex flex={3} gap={5}>
        <DeleteIcon onClick={() => alert("Delete")} />

        <EditIcon onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateEmployeeForm
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Back
              </Button>
              <Button colorScheme="green" onClick={handleUpdateEmployee}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};
