import { userMenu } from "@/components/config/navigation";
import Layout from "@/components/layout";
import LeaveTable from "@/components/leave/LeaveTable";
import { getLeaves } from "@/lib/helper/leave";
import { getUser } from "@/lib/helper/user";
import { leaveDurationAction } from "@/redux/reducer";
import { CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

//const tab = [];

export default function LeavePage() {
  const [element, setElement] = useState({});
  const dispatch = useDispatch();
  const empId = useSelector((state) => state.app.client.employeeId);
  console.log("Leave Page");
  console.log(`Employee id ${empId}`);
  //console.log(menu);
  const duration = useSelector((state) => state.app.client.leaveDuration);
  console.log(duration);

  useEffect(() => {
    if (data) {
      data.forEach((element, i) => {
        console.log("Use state here");
        const { employees } = element;

        setElement(employees);

        data.forEach((element) => {
          const [year, month, day] = element.startDate.split("-");
          console.log(month);
          console.log(day);
          console.log(year);
          const [y, m, d] = element.endDate.split("-");
          console.log(month);
          console.log(day);
          console.log(year);
          const days = d - day;
          // console.log("The days");
          //console.log(days);

          dispatch(leaveDurationAction(days));
        });
      }, []);
    } else {
      console.log("Data not available");
    }

    // console.log(employees, i);
  });

  const { isLoading, isError, data, error } = useQuery("leaves", getLeaves);

  if (isLoading)
    return (
      <Layout navHeading="Leaves">
        <LeaveTable>
          <CircularProgress isIndeterminate color="green.300" />
        </LeaveTable>
      </Layout>
    );
  if (isError) return <div>Got Error {error}</div>;

  console.log("Leave information");

  console.log("Function leave here");
  console.log(duration);
  //const { fullName } = ele;
  console.log("Element is here");
  const { fullName } = element;
  console.log(element);
  console.log(fullName);
  return (
    <Layout navHeading="Leave">
      <LeaveTable>
        {data.map((leaveData, i) => (
          <LeaveTable.Row
            key={i}
            _id={leaveData._id}
            employee={fullName}
            leaveType={leaveData.leaveType}
            //leaveTypeColor=""
            leaveStatus={leaveData.leaveStatus}
            startDate={leaveData.startDate}
            endDate={leaveData.endDate}
            leaveDuration={`${duration === "undefined" ? 0 : duration} days`}
          />
        ))}
      </LeaveTable>
    </Layout>
  );
}
