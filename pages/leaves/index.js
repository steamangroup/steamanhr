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
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const empId = useSelector((state) => state.app.client.employeeId);
  // console.log("Leave Page");
  //console.log(`Employee id ${empId}`);
  //const userId = useSelector((state) => state.app.client.userId);

  //console.log(menu);
  const duration = useSelector((state) => state.app.client.leaveDuration);
  console.log(duration);

  useEffect(() => {
    if (data) {
      console.log(data);
      data.map(
        (element, i) => {
          //console.log(element);
          console.log("This is the element");
          const user = element.user;
          if (user) {
            const { firstname } = user;
            // console.log(firstname);
            // setUser(user);
            setName(firstname);
            Object.values(user).forEach(function (key) {
              // console.log(key);
              setUser(key);

              console.log("We are live here oooo");
              for (let i = 0; i < key.length; i++) {
                const dat = key;

                console.log(dat);
              }
            });

            // console.log(user);
          }

          if (user) {
            //  console.log("Use state here");
            //console.log(user.firstname);
            //const { firstname, lastname } = user;
            //const employee_name = `${firstname}` + " " + `${lastname}`;
            //console.log("Employees name");
            //setName(employee_name);
            //console.log(employee_name);
            //console.log("First data here");
            //console.log(firstname);
            //console.log(lastname);
          }
        },

        //  data.forEach((element) => {
        //  const [year, month, day] = element.startDate.split("-");
        // console.log(month);
        //console.log(day);
        //console.log(year);
        //const [y, m, d] = element.endDate.split("-");
        //console.log(month);
        //console.log(day);
        //console.log(year);
        //const days = d - day;
        // console.log("The days");
        //console.log(days);

        //  dispatch(leaveDurationAction(days));
        //});
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

  //console.log("Data here");
  //console.log(data);

  //const { firstname } = user[1];
  return (
    <Layout navHeading="Leave">
      <LeaveTable>
        {data.map((leaveData, i) => (
          <LeaveTable.Row
            key={i}
            _id={leaveData._id}
            employee={name}
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
