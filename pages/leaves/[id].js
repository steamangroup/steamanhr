import Layout from "@/components/layout";
import LeaveTable from "@/components/leave/LeaveTable";
import { getEmployeeLeaves } from "@/lib/helper/leave";
import { CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function EmployeeLeavePage() {
  const userId = useSelector((state) => state.app.client.userId);
  const [leaveType, setLeaveType] = useState();
  const [leaveStatus, setLeaveStatus] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [name, setName] = useState();
  const [user, setUser] = useState();
  console.log(userId);

  useEffect(() => {
    if (data) {
      data.forEach((element) => {
        console.log("Elements here");
        console.log(element);
        const { leaveType, leaveStatus, startDate, endDate, user } = element;
        setLeaveStatus(leaveStatus);
        setLeaveType(leaveType);
        setStartDate(startDate);
        setEndDate(endDate);
        setUser(user);

        const { firstname } = user;
        setName(firstname);
      }, []);
    } else {
      console.log("Data not available");
    }

    // console.log(employees, i);
  });

  const { isLoading, isError, data, error } = useQuery(["leaves", userId], () =>
    getEmployeeLeaves(userId)
  );

  if (isLoading)
    return (
      <Layout navHeading="Leaves">
        <LeaveTable>
          <CircularProgress isIndeterminate color="green.300" />
        </LeaveTable>
      </Layout>
    );
  if (isError) return <div>Got Error {error}</div>;

  console.log("Leave individual  information");
  console.log(data);
  console.log("Attributes here ");
  console.log(leaveType);
  console.log(leaveStatus);
  console.log(startDate);
  console.log(endDate);
  console.log(user);
  console.log(name);

  //const { firstname } = user;

  return (
    <Layout navHeading="Leaves">
      <LeaveTable>
        {data.map((leaveData, i) => (
          <LeaveTable.Row
            key={i}
            employee={name}
            leaveType={leaveType}
            leaveStatus={leaveStatus}
            startDate={startDate}
            endDate={endDate}
            leaveDuration="3 days"
          />
        ))}
      </LeaveTable>
    </Layout>
  );
}
