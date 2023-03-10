import Layout from "@/components/layout";
import LeaveTable from "@/components/leave/LeaveTable";
import { getLeaves } from "@/lib/helper/leave";
import { CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

export default function LeavePage() {
  const [element, setElement] = useState({});
  const [employee, setEmployee] = useState();
  const [name, setName] = useState([]);
  const [duration, setDuration] = useState();
  //const dispatch = useDispatch();
  //const []
  const empId = useSelector((state) => state.app.client.employeeId);

  useEffect(() => {
    if (data) {
      console.log(data);
      data.map(
        (element, i) => {
          //console.log(element);
          //  console.log("This is the element");
          const user = element.user;
          //  console.log(user);

          if (user) {
            console.log("Data here");
            const { leaveType } = data;
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              // const { user } = data;
              const user = element.user;

              const firstname = user.firstname;
              setEmployee(firstname);
              console.log(firstname);

              // console.log(element);
              const { startDate, endDate } = element;
              // console.log(startDate);
            }
          }
        },

        []
      );
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
  if (isError) return <CircularProgress isIndeterminate color="red.300" />;

  return (
    <Layout navHeading="Leave">
      <LeaveTable>
        {data.map((leaveData, i) => (
          <LeaveTable.Row
            key={i}
            fullName={`${leaveData.user.firstname} ${leaveData.user.lastname} `}
            _id={leaveData._id}
            employee={`${leaveData.user.firstname} ${leaveData.user.lastname} `}
            leaveType={leaveData.leaveType}
            //leaveTypeColor=""
            leaveStatus={leaveData.leaveStatus}
            startDate={leaveData.startDate}
            endDate={leaveData.endDate}
            leaveDuration={leaveData.leaveDuration}
          />
        ))}
      </LeaveTable>
    </Layout>
  );
}
