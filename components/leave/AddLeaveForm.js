import React, { useEffect, useReducer, useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Textarea,
  CircularProgress,
  HStack,
} from "@chakra-ui/react";
import { useQueryClient, useMutation, useQuery } from "react-query";

import { useRouter } from "next/router";

import Layout from "@/components/layout";

import { addLeave, getLeavePeriod } from "@/lib/helper/leave";
import { getUser } from "@/lib/helper/user";
import { useSelector } from "react-redux";

function AddLeaveForm({ formData, setFormData }) {
  const toast = useToast();
  const router = useRouter();
  //const queryClient = useQueryClient();
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(0);
  const [disable, setDisable] = useState(false);
  const userId = useSelector((state) => state.app.client.userId);
  //console.log(`userId  ${userId}`);
  const empId = useSelector((state) => state.app.client.employeeId);
  console.log(`Employee Id in leave ${empId}`);

  const addMutation = useMutation(addLeave, {
    onSuccess: () => {
      return toast({
        title: "Success",
        description: "Leave requested successfully",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  useEffect(() => {
    if (durationData) {
      durationData.map((duration) => {
        const { _id, total, remainingDays } = duration;
        console.log(_id);
        if (userId === _id) {
          console.log("Leave duration data");
          //setTotalLeaveDays(totalLeaveDays);
          setRemainingLeaveDays(remainingDays);
          console.log(total);
          console.log(remainingDays);
          if (remainingDays === 0 || remainingDays < 0) {
            setDisable(true);
          }
        }
        console.log(duration);
        console.log("This is disbled button");
        console.log(disable);
      });
    }
  }, [remainingLeaveDays]);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  const {
    isLoading: durationLoading,
    isError: durationError,
    data: durationData,
  } = useQuery("leaves", getLeavePeriod);

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;
  if (isError) return <CircularProgress isIndeterminate color="red.300" />;
  if (durationLoading)
    return <CircularProgress isIndeterminate color="green.300" />;
  if (durationError)
    return <CircularProgress isIndeterminate color="red.300" />;

  let { role, _id } = data;

  //getting leave duration function
  function getLeaveDuration(date1, date2) {
    let start = new Date(date1);
    let end = new Date(date2);
    console.log("Leave information is here. Check out ");
    console.log(start);
    console.log(end);
    let diff = Math.abs(end - start);
    let days = diff / (1000 * 3600 * 24);

    //const duration = `${days} days`;
    console.log("This is the duration of the employee");
    console.log(days);
    return days;
  }

  const handleAddLeave = (e) => {
    e.preventDefault();
    const formLength = Object.keys(formData).length;
    console.log(formLength);
    if (formLength !== 5) {
      return toast({
        title: "Error",
        description: "No Field should be left blank",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    }

    let {
      leaveReason,
      leaveType,
      endDate,
      handingOverNotes,
      startDate,
      leaveStatus,
    } = formData;

    console.log("Testing the data");
    console.log(startDate);
    console.log(endDate);
    console.log(leaveReason);

    // console.log("This is the duration of the leave");
    const leaveDuration = getLeaveDuration(endDate, startDate);
    console.log(leaveDuration);

    const model = {
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      leaveReason: leaveReason,
      handingOverNotes: handingOverNotes,
      leaveStatus: leaveStatus ?? "pending",
      user: userId,
      leaveDuration: leaveDuration,
    };

    //adding new user ot db
    addMutation.mutate(model);
    if (addMutation.isLoading) return <div>Loading......</div>;
    if (addMutation.isError) return <div>Error........</div>;
    if (addMutation.isSuccess)
      return toast({
        title: "Success",
        description: "Leave added successfully",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });

    router.push(`/leaves/${_id}`);
  };

  return (
    <Layout navHeading="Leave Form">
      <Stack>
        <FormControl>
          <FormLabel>Leave Type</FormLabel>
          <Select
            size="sm"
            name="leaveType"
            onChange={setFormData}
            isrequired="true"
            //defaultChecked="annual"
            placeholder="Select option"
          >
            <option value="annual">Annual Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="martenity" disabled={true}>
              Maternity Leave
            </option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <HStack spacing={5}>
          <FormControl>
            <FormLabel>Leave Start date</FormLabel>
            <Input
              size="sm"
              type="date"
              isrequired="true"
              name="startDate"
              onChange={setFormData}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Leave End date</FormLabel>
            <Input
              size="sm"
              type="date"
              isrequired="true"
              name="endDate"
              onChange={setFormData}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Leave Reason</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="leaveReason"
            isrequired="true"
            onChange={setFormData}
            cols={4}
          />
        </FormControl>
        <FormControl>
          <FormLabel>handing Over Notes</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="handingOverNotes"
            isrequired="true"
            onChange={setFormData}
            cols={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Leave Status</FormLabel>
          <Select
            size="sm"
            type="text"
            name="leaveStatus"
            isrequire="true"
            onChange={setFormData}
            // defaultValue="pending"
            //placeholder="Pending"
          >
            {role === "ADMIN" ? (
              <>
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
              </>
            ) : (
              <option value="pending">Pending</option>
            )}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={4} flex="end">
          <Button
            bg="green.600"
            color="white"
            _hover={{
              bg: "green.600",
            }}
            onClick={handleAddLeave}
            isDisabled={remainingLeaveDays < 0 ? true : false}
          >
            Save
          </Button>
          <Button
            bg="red.600"
            color="white"
            _hover={{
              bg: "red.600",
            }}
          >
            Exit
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
}

export default AddLeaveForm;
