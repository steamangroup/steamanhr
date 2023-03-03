import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  Box,
  Text,
  Badge,
  CircularProgress,
  useToast,
  Tooltip,
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

import { useRouter } from "next/router";
import DeleteModal from "./DeleteModal";
import { deleteLeave, getLeaves } from "@/lib/helper/leave";
import LeaveAction from "./LeaveRequestAction";

export default function LeaveTable({ children }) {
  const { isLoading, isError, data, error } = useQuery("leaves", getLeaves);

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;
  if (isError) return <div>Got error</div>;
  return (
    <Box mt="1.25rem">
      <LeaveAction />
      <VStack
        spacing={2}
        sx={{
          borderWidth: "1px",
          borderRadius: "0.375rem",
          alignItems: "stretch",
          mt: 5,
        }}
      >
        <LeaveTable.Heading />
        {children}
      </VStack>
    </Box>
  );
}

LeaveTable.Heading = function () {
  return (
    <Flex
      sx={{
        p: "0.5rem",
        //px: "0.75rem",
        //py: "0.2rem",
        color: "white",
        gap: "0.625rem",
        fontSize: "0.75rem",
        bg: "#419170",
      }}
    >
      <Box flex={0.5}></Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Employee
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Leave Type
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Leave Status
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Start Date
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          End Date
        </Text>
      </Box>
      <Box flex={1.5}>
        <Text fontSize={15} fontWeight="400">
          Duration
        </Text>
      </Box>
      <Box flex={1.8}>
        <Text fontSize={15} fontWeight="400">
          Actions
        </Text>
      </Box>
    </Flex>
  );
};

LeaveTable.Row = function ({
  employee,
  leaveType,
  fullName,
  leaveStatus,
  startDate,
  endDate,
  leaveDuration,
  _id,
}) {
  const toast = useToast();
  //return delete id
  const deleteId = useSelector((state) => state.app.client.deleteId);

  console.log(`leave delete id ${deleteId}`);
  const router = useRouter();
  const queryClient = useQueryClient();

  const visible = useSelector((state) => state.app.client.showAddForm);
  //console.log("Update vaBlue");
  //console.log(visible);
  //console.log(_id);
  //executing action using dispatch
  const dispatch = useDispatch();

  const viewLeaveRecord = () => {
    //updating value of the state
    dispatch(toggleChangeAction(_id));
    router.push("/employees/view");

    if (!visible) {
      dispatch(updateAction(_id));
    }
  };

  const OpenUpdateForm = () => {
    //updating value of the state
    dispatch(toggleChangeAction(_id));
    router.push("/leaves/add");

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
      await deleteLeave(deleteId);
      await queryClient.prefetchQuery("leaves", getLeaves);
      await dispatch(deleteAction(null));
      //router.push("/employees");
    }
    toast({
      title: "Success",
      description: "Leave deleted successfully",
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
        bg: "#fbfdfd",
        _hover: {
          bg: "#e0f1ea",
          cursor: "pointer",
        },
        "&:nth-child(even)": {
          bg: "#eef7f3",
        },
      }}
    >
      <Flex>
        <Avatar size="sm" name={fullName} bg="lightgray" color="black" />
      </Flex>
      <Flex flex={1.2}>
        <Text whiteSpace="nowrap">{employee}</Text>
      </Flex>
      <Flex flex={1}>
        <Text whiteSpace="nowrap">{leaveType}</Text>
      </Flex>
      <Flex
        //textAlign="center"

        // mr={10}
        flex={1}
        //whiteSpace="nowrap"
      >
        <Text
          fontSize={11}
          color="white"
          borderRadius={10}
          bgColor={`${
            leaveStatus === "approve"
              ? "#5DBB63"
              : leaveStatus === "pending"
              ? "#ff6100"
              : "red.500"
          }`}
          px={1}
          textAlign="center"
          height={5}
        >
          {leaveStatus}
        </Text>
      </Flex>
      <Flex flex={1} textAlign="center">
        <Text whiteSpace="nowrap">{startDate}</Text>
      </Flex>
      <Flex flex={1} textAlign="center">
        <Text>{endDate}</Text>
      </Flex>
      <Flex flex={0.8} textAlign="center">
        <Text>{leaveDuration}</Text>
      </Flex>

      <Flex flex={1} gap={5} justifyContent="center">
        <Tooltip label="View record">
          <ExternalLinkIcon onClick={viewLeaveRecord} />
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
