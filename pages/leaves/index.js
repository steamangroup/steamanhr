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
import UsersPage from "../account";

//const tab = [];

export default function LeavePage() {
  const [element, setElement] = useState({});
  const [employee, setEmployee] = useState();
  const [name, setName] = useState([]);
  const [duration, setDuration] = useState();
  //const dispatch = useDispatch();
  //const []
  const empId = useSelector((state) => state.app.client.employeeId);

  // const duration = useSelector((state) => state.app.client.leaveDuration);
  //console.log(`This is the duration ${duration}`);

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
  if (isError) return <div>Got Error {error}</div>;

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
