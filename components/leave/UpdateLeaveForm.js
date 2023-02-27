import React, { useReducer } from "react";
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
} from "@chakra-ui/react";
import {
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/lib/helper/employee";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { userMenu } from "@/components/config/navigation";
import { getLeave, getLeaves, updateLeave } from "@/lib/helper/leave";
import UpdateEmployeeForm from "../employees/NewEmployee/UpdateEmployee";
import { roles } from "@/utils/constants";

function UpdateLeaveForm({ formId, formData, setFormData }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(["leaves", formId], () =>
    getLeave(formId)
  );

  //updating our employee data
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
  //console.log(formId);
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error</div>;
  const {
    leaveType,
    startDate,
    endDate,
    leaveReason,
    handingOverNotes,
    leaveStatus,
  } = data;
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
  const menu = userMenu.employees.tabs;
  return (
    <Layout pageTabs={menu} navHeading="Leave  Update Form">
      <Stack>
        <FormControl>
          <FormLabel>Leave Type</FormLabel>
          <Select
            size="sm"
            name="leaveType"
            onChange={setFormData}
            isrequired="true"
            defaultValue={leaveType}
            placeholder={leaveType}
          >
            <option value="Annual Leave">Annual Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Martenity Leave">Maternity Leave</option>
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
            defaultValue={startDate}
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
            defaultValue={endDate}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Leave Reason</FormLabel>
          <Input
            size="sm"
            type="text"
            name="leaveReason"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            defaultValue={leaveReason}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Handing Over Notes</FormLabel>
          <Input
            size="sm"
            type="text"
            name="handingOverNotes"
            isrequired="true"
            onChange={setFormData}
            cols={4}
            //placeholder={handingOverNotes}
            defaultValue={handingOverNotes}
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
            //defaultValue={leaveStatus}
            placeholder={leaveStatus}
          >
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="pending">Pending</option>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={4} flex="end">
          <Button colorScheme="yellow" onClick={handleUpdateLeaveData}>
            update
          </Button>
          <Button colorScheme="red">Exit</Button>
        </Stack>
      </Stack>{" "}
    </Layout>
  );
}

export default UpdateLeaveForm;
