import React, { useRef } from "react";
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
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

function LeaveRequestForm({ newLeaveRequest, setNewLeaveRequest }) {
  const initialRef = useRef(null);
  const userId = useSelector((state) => state.app.client.userId);
  console.log(`This  ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );

  if (isLoading) return <div>Loading...........</div>;
  //if (isError) return <div>Erorr............</div>;
  console.log(data);
  const role = data.role;
  console.log(role);
  return (
    <Stack>
      <FormControl>
        <FormLabel>Leave Type</FormLabel>
        <Select
          size="sm"
          isrequired
          onChange={(e) => {
            setNewLeaveRequest((prevState) => ({
              ...prevState,
              leaveType: e.target.value,
            }));
          }}
          value={newLeaveRequest.leaveType}
        >
          <option value="annualleave">Annual leave</option>
          <option value="sickleave" disabled="true">
            Sick Leave
          </option>
          <option value="maternityleave" disabled="true">
            Maternity Leave
          </option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Start date</FormLabel>
        <Input
          size="sm"
          type="date"
          //defaultValue="Date of Birth"
          isrequired
          onChange={(e) => {
            setNewLeaveRequest((prevState) => ({
              ...prevState,
              leaveStartDate: e.target.value,
            }));
          }}
          value={newLeaveRequest.leaveStartDate}
        />
      </FormControl>

      <FormControl>
        <FormLabel>End date</FormLabel>
        <Input
          size="sm"
          type="date"
          isrequired
          onChange={(e) => {
            setNewLeaveRequest((prevState) => ({
              ...prevState,
              leaveEndDate: e.target.value,
            }));
          }}
          value={newLeaveRequest.leaveEndDate}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Reason</FormLabel>
        <Textarea
          size="sm"
          isrequired
          onChange={(e) => {
            setNewLeaveRequest((prevState) => ({
              ...prevState,
              leaveReason: e.target.value,
            }));
          }}
          value={newLeaveRequest.leaveReason}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Handing over note</FormLabel>
        <Textarea
          size="sm"
          isrequired
          onChange={(e) => {
            setNewLeaveRequest((prevState) => ({
              ...prevState,
              handingOverNotes: e.target.value,
            }));
          }}
          value={newLeaveRequest.handingOverNotes}
        />
      </FormControl>

      {role === "ADMIN" ? (
        <FormControl>
          <FormLabel>Leave Status</FormLabel>
          <Select
            size="sm"
            isrequired
            onChange={(e) => {
              setNewLeaveRequest((prevState) => ({
                ...prevState,
                leaveStatus: e.target.value,
              }));
            }}
            value={newLeaveRequest.leaveStatus}
          >
            <option value="pending">Pending</option>
            <option value="approve">Approve</option>
            <option value="maternityleave">Reject</option>
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default LeaveRequestForm;
