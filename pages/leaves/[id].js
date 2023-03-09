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
  const [leaveDays, setLeaveDays] = useState();
  // const [endDate, setEndDate] = useState([]);
  const [name, setName] = useState();
  const [user, setUser] = useState();

  console.log(userId);

  useEffect(() => {
    if (data) {
      console.log(data);
      Array.isArray(data)
        ? data.map((element) => {
            console.log("Elements here");
            // console.log(element);
            const { leaveType, leaveStatus, startDate, endDate, user } =
              element;
            setLeaveStatus(leaveStatus);

            setUser(user);

            const { firstname } = user;
            setName(firstname);
          }, [])
        : null;
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

  function getLeaveDuration(date1, date2) {
    let start = new Date(date1);
    let end = new Date(date2);
    //console.log("Leave information here ooooo");
    //console.log(date1, date2);
    //console.log(start);
    //console.log(end);
    let diff = Math.abs(end - start);
    let days = diff / (1000 * 3600 * 24);

    const duration = `${days} days`;
    // console.log("This is the duration of the employee");
    //console.log(duration);
    return duration;
  }

  return (
    <Layout navHeading="Leaves">
      <LeaveTable>
        {Array.isArray(data)
          ? data.map((leaveData, i) => (
              <LeaveTable.Row
                key={i}
                employee={name}
                leaveType={leaveData.leaveType}
                leaveStatus={leaveData.leaveStatus}
                startDate={leaveData.startDate}
                endDate={leaveData.endDate}
                leaveDuration={`${leaveData.leaveDuration} days`}
              />
            ))
          : null}
      </LeaveTable>
    </Layout>
  );
}
