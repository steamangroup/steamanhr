import React, { useEffect, useReducer, useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  ButtonGroup,
  Button,
  useToast,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import {
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/lib/helper/employee";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { getLeave, getLeaves, updateLeave } from "@/lib/helper/leave";
import UpdateEmployeeForm from "../employees/NewEmployee/UpdateEmployee";
import { roles } from "@/utils/constants";
import { date } from "joi";
import { render } from "react-dom";

function UpdateLeaveForm({ formId, formData, setFormData }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [leaveApprovalForm, setLeaveApprovalForm] = useState(false);
  const [leaveDenialForm, setLeaveDenialForm] = useState(false);

  const updateMutation = useMutation(
    (newData) => updateLeave(formId, newData),
    {
      onSuccess: async (data) => {
        //updating and retwuning new updated employee data
        //queryClient.setQueryData("users", (old) => [data]);
        queryClient.prefetchQuery("leaves", getLeaves);
        router.push("/leaves");
      },
    }
  );

  const { isLoading, isError, data, error } = useQuery(["leaves", formId], () =>
    getLeave(formId)
  );

  //updating our employee data

  //console.log(formId);
  if (isLoading)
    return (
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Fetching leave update form.</AlertTitle>
        <AlertDescription>Just a few seconds</AlertDescription>
      </Alert>
    );
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Fetch error</AlertTitle>
        <AlertDescription>
          Could not retrieve update leave form
        </AlertDescription>
      </Alert>
    );
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
    //console.log(days);
    return days;
  }

  console.log("Checking more data");
  //function to check onChanging of leave status
  function LeaveStatusHandler(e) {
    const val = e.target.value;
    if (val === "approved") {
      setLeaveApprovalForm(true);
      setLeaveDenialForm(false);
      console.log("It has been approved");
    } else if (val === "rejected") {
      setLeaveDenialForm(true);
      setLeaveApprovalForm(false);
      console.log("It has been rejected");
    } else {
      console.log("Nothing to set");
    }
  }

  function LeaveDenialForm(setFormData) {
    return (
      <VStack spacing={10}>
        <Box w={300}>
          <Text
            fontSize={16}
            fontWeight="400"
            mt={12}
            boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            borderRadius={20}
            textAlign="center"
            bg="#0b665c"
            color="white"
            p={1}
          >
            Line manager Consent form
          </Text>
        </Box>
        <FormControl>
          <FormLabel color="red.700">Name of Line Manager</FormLabel>
          <Input
            size="sm"
            type="text"
            isrequired="true"
            name="lineManagerName"
            onChange={setFormData}
            h={10}
            borderRadius={10}
            border="0.1rem solid red"
            color="red.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="red.700">Date for denial</FormLabel>
          <Input
            size="sm"
            type="date"
            isrequired="true"
            name="leaveDenialDate"
            onChange={setFormData}
            //defaultValue={Date.now()}
            h={10}
            borderRadius={10}
            border="0.1rem solid red"
            color="red.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="red.700">Reason for leave denial</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="leaveDenialReason"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            // defaultValue={leaveReason}
            h={10}
            borderRadius={10}
            border="0.1rem solid red"
            color="red.700"
          />
        </FormControl>
      </VStack>
    );
  }
  function LeaveApprovalForm(setFormData) {
    return (
      <VStack spacing={10}>
        <Box w={300}>
          <Text
            fontSize={16}
            fontWeight="400"
            mt={12}
            boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            borderRadius={20}
            textAlign="center"
            bg="#0b665c"
            color="white"
            p={1}
          >
            Line manager Consent form
          </Text>
        </Box>

        <FormControl>
          <FormLabel color="teal.700">Name of Line Manager</FormLabel>
          <Input
            size="sm"
            type="text"
            isrequired="true"
            name="lineManagerName"
            onChange={setFormData}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.700">Date for approval</FormLabel>
          <Input
            size="sm"
            type="date"
            isrequired="true"
            name="leaveApprovalDate"
            onChange={setFormData}
            //defaultValue={Date.now()}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.700">Reason for leave approval</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="leaveApprovalReason"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            // defaultValue={leaveReason}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          />
        </FormControl>
      </VStack>
    );
  }

  const {
    leaveType,
    startDate,
    endDate,
    leaveReason,
    handingOverNotes,
    leaveStatus,
  } = data;
  const leaveDuration = getLeaveDuration(endDate, startDate);
  console.log(leaveDuration);

  // let model = {
  //  leaveDuration: leaveDuration,
  //};

  //() => updateMutation.mutate(model);

  console.log("Leave data");
  console.log(data);

  const handleUpdateLeaveData = async (e) => {
    e.preventDefault();

    //overiding the data value with our form data

    let updated_data = Object.assign({}, data, formData);
    console.log("Updated data");
    console.log(updated_data);

    toast({
      title: "Success",
      description: "Leave record updated successfully",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top-right",
    });
    router.push("/leaves");

    await updateMutation.mutate(updated_data);
  };

  return (
    <Layout navHeading="Leave  Update Form">
      <Stack spacing={7} w={900} m="auto">
        <HStack spacing={10}>
          <FormControl>
            <FormLabel color="teal.700">Leave Start date</FormLabel>
            <Input
              size="sm"
              type="date"
              isrequired="true"
              name="startDate"
              onChange={setFormData}
              defaultValue={startDate}
              h={10}
              borderRadius={10}
              border="0.1rem solid teal"
              color="teal.700"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700">Leave End date</FormLabel>
            <Input
              size="sm"
              type="date"
              isrequired="true"
              name="endDate"
              onChange={setFormData}
              defaultValue={endDate}
              h={10}
              borderRadius={10}
              border="0.1rem solid teal"
              color="teal.700"
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel color="teal.700">Reason for Time off</FormLabel>
          <Select
            size="sm"
            name="leaveType"
            onChange={setFormData}
            isrequired="true"
            defaultValue={leaveType}
            placeholder={leaveType}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          >
            <option value="health">Health</option>
            <option value="vacation">Vacation</option>
            <option value="bereavement">Bereavement</option>
            <option value="study">Study</option>
            <option value="career">Career responsibilities</option>
            <option value="emergency">Emergency</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color="teal.700">Explanation</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="leaveReason"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            defaultValue={leaveReason}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.700">Handing Over Notes</FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="handingOverNotes"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            //placeholder={handingOverNotes}
            defaultValue={handingOverNotes}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.700">Leave Status</FormLabel>
          <Select
            size="sm"
            type="text"
            name="leaveStatus"
            isrequire="true"
            onChange={setFormData}
            onChangeCapture={LeaveStatusHandler}
            //defaultValue={leaveStatus}
            placeholder={leaveStatus}
            h={10}
            borderRadius={10}
            border="0.1rem solid teal"
            color="teal.700"
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="pending">Pending</option>
          </Select>
        </FormControl>

        {leaveApprovalForm ? (
          <LeaveApprovalForm setFormData={setFormData} />
        ) : null}
        {leaveDenialForm ? <LeaveDenialForm setFormData={setFormData} /> : null}

        <Stack direction="row" spacing={4} flex="end">
          <Button
            colorScheme="yellow"
            color="white"
            onClick={handleUpdateLeaveData}
          >
            update
          </Button>
          <Button colorScheme="red">Exit</Button>
        </Stack>
      </Stack>{" "}
    </Layout>
  );
}

export default UpdateLeaveForm;
