import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
  Tooltip,
  CircularProgress,
  Avatar,
} from "@chakra-ui/react";

import { useQuery, useQueryClient } from "react-query";
import { deleteEmployee, getEmployees, getUsers } from "@/lib/helper/employee";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../redux/reducer";
import EmployeeAction from "./NewEmployee/EmployeeActions";
import { useRouter } from "next/router";
import DeleteModal from "./DeleteModal";

export default function EmployeeTable({ children }) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, data, error } = useQuery(
    "employees",
    getEmployees
  );

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;
  if (isError) return <div>Got error</div>;

  return (
    <Box mt="0.5rem">
      <EmployeeAction />

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
      <Box flex={1}></Box>
      <Box flex={6}>
        <Text fontSize={14} fontWeight="400">
          Full name
        </Text>
      </Box>
      <Box flex={5}>
        <Text fontSize={14} fontWeight="400">
          Employee Type
        </Text>
      </Box>
      <Box flex={6}>
        <Text fontSize={14} fontWeight="400">
          Work Email
        </Text>
      </Box>
      <Box flex={5}>
        <Text fontSize={14} fontWeight="400">
          employment Status
        </Text>
      </Box>
      <Box flex={4}>
        <Text fontSize={14} fontWeight="400">
          Phone
        </Text>
      </Box>
      <Box flex={6}>
        <Text fontSize={14} fontWeight="400">
          Business Unit
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={14} fontWeight="400">
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
  _id,
}) {
  const toast = useToast();
  //return delete id
  const deleteId = useSelector((state) => state.app.client.deleteId);

  console.log(`Mine delete ${deleteId}`);
  const router = useRouter();
  const queryClient = useQueryClient();

  const visible = useSelector((state) => state.app.client.showAddForm);
  //console.log("Update vaBlue");
  //console.log(visible);
  //console.log(_id);
  //executing action using dispatch
  const dispatch = useDispatch();

  const viewEmployeeRecord = () => {
    //updating value of the state
    dispatch(toggleChangeAction(_id));
    router.push("employees/view");

    if (!visible) {
      dispatch(updateAction(_id));
    }
  };

  const OpenUpdateForm = () => {
    //updating value of the state
    dispatch(toggleChangeAction(_id));
    router.push("employees/add");

    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    //if form is not visible execute delete action
    //if (!visible) {
    dispatch(deleteAction(_id));
    console.log(`Delete id is ${_id}`);

    //}
  };

  //Delete function
  const handleDelete = async (e) => {
    e.preventDefault();
    //console.log("delete");
    if (deleteId) {
      await deleteEmployee(deleteId);
      await queryClient.prefetchQuery("employees", getEmployees);
      await dispatch(deleteAction(null));
      //router.push("/employees");
    }
    toast({
      title: "Success",
      description: "Employee record deleted successfully",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top-right",
    });
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
      <Flex>
        <Avatar
          size="sm"
          name={fullName}
          bg="lightgray"
          color="black"
          // src='https://via.placeholder.com/200'
        />
        {/** <Image src={profilePicture || "#"} borderRadius="full" boxSize="30px" />
        <Text>{_id}</Text>*/}
      </Flex>

      <Flex flex={3.5}>
        <Text whiteSpace="nowrap" fontSize={14}>
          {fullName}
        </Text>
      </Flex>
      <Box fontSize={13} flex={2}>
        <Text>{employmentType}</Text>
      </Box>

      <Box flex={4} whiteSpace="nowrap" fontSize={14}>
        <Text>{workEmail}</Text>
      </Box>
      <Box flex={1} mx={5}>
        <Text
          borderRadius="30px"
          color="white"
          textAlign="center"
          fontSize={13}
          bgColor={`${employmentStatus === "active" ? "#5DBB63" : "#ff6100"}`}
        >
          {employmentStatus}
        </Text>
      </Box>

      <Box flex={3} whiteSpace="nowrap" textAlign="center" fontSize={14}>
        <Text>{contactNumber}</Text>
      </Box>
      <Box flex={4} whiteSpace="nowrap" fontSize={14}>
        <Text>{businessUnit}</Text>
      </Box>
      <Flex flex={1} gap={5}>
        <Tooltip label="View record">
          <ExternalLinkIcon onClick={viewEmployeeRecord} />
        </Tooltip>
        <Tooltip label="update record">
          <EditIcon
            onClick={OpenUpdateForm}
            color="blue.500"
            cursor="pointer"
          />
        </Tooltip>

        <DeleteModal deletehandler={handleDelete} onDelete={onDelete} />
      </Flex>
    </Flex>
  );
};
