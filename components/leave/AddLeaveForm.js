import React, { useReducer } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useQueryClient, useMutation, useQuery } from "react-query";

import { useRouter } from "next/router";
import { userMenu } from "@/components/config/navigation";
import Layout from "@/components/layout";
import { roles } from "@/utils/constants";
import { addLeave } from "@/lib/helper/leave";
import { getUser } from "@/lib/helper/user";
import { useSelector } from "react-redux";

function AddLeaveForm({ formData, setFormData }) {
  const toast = useToast();
  const router = useRouter();
  //const queryClient = useQueryClient();
  // const [formData, setFormData] = useReducer(formReducer, {});
  const userId = useSelector((state) => state.app.client.userId);
  //console.log(`userId  ${userId}`);
  const empId = useSelector((state) => state.app.client.employeeId);
  console.log(`Employee Id in leave ${empId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  if (isLoading) return <div>Loading.......</div>;
  if (isError) return <div>Loading.......</div>;

  let { role } = data;

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
    console.log(formData);
    console.log(leaveType);
    console.log(leaveReason);

    const model = {
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      leaveReason: leaveReason,
      handingOverNotes: handingOverNotes,
      leaveStatus: leaveStatus ?? "pending",
      user: userId,
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
    // if (role === "STAFF") {
    router.push("/user/[username]");
    //} else {
    // router.push("/leaves");
    //}
  };

  const menu = userMenu.employees.tabs;

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
            <option value="martenity">Maternity Leave</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
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
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
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
