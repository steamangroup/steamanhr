import { userMenu } from "@/components/config/navigation";
import EmployeeProfile from "@/components/dashboard/EmployeeProfile";
import Layout from "@/components/layout";
import LeaveOverView from "@/components/leave/LeaveOverView";
import { VStack } from "@chakra-ui/react";
import { getEmployeeData, getUser } from "@/lib/helper/user";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  BusinessUnitAction,
  employeeAction,
  jobTitleAction,
  userEmail,
} from "@/redux/reducer";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const [empData, setEmpData] = useState();
  //const [business, setBusinessUnit] = useState();
  //const [job, setJobTitle] = useState();

  const userId = useSelector((state) => state.app.client.userId);
  const user_email = useSelector((state) => state.app.client.email);
  const business = useSelector((state) => state.app.client.business);
  const empId = useSelector((state) => state.app.client.employeeId);
  const job = useSelector((state) => state.app.client.job);

  console.log(`Employee id ${empId}`);
  console.log(`This  ${userId}`);
  console.log(`This is my email ${user_email}`);
  console.log(`This is the business unit : ${business}`);

  useEffect(() => {
    if (data) {
      console.log(data);

      if (user_email) {
        getEmployeeData(user_email)
          .then((infor) => {
            console.log("Data in from the employee data");
            setEmpData(infor);
            console.log(infor);
          })
          .catch((e) => {
            console.log(`Error fetching data with ${e}`);
          });
        // if (empData) {
        // const { _id, businessUnit, jobTitle } = empData;
        //dispatch(employeeAction(_id));

        //setBusinessUnit(businessUnit);

        //setJobTitle(jobTitle);

        //console.log(_id);
        //}
      } else {
        console.log("No email");
      }
    } else {
      console.log("No data available");
    }
    return () => console.log("Cleanup..");
  }, [user_email]);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    // sessionStorage.setItem("userId", `${userId}`);
    //sessionStorage.getItem("userId");
    //}
    Cookies.set("userId", userId ? userId : undefined);
  }, []);

  const { isLoading, isError, data, error, status } = useQuery(
    ["users", userId],
    () => getUser(userId)
  );
  // const {
  // isLoading: Loading,
  //isError: Error,
  //data: emp_data,
  //} = useQuery(["users", user_email], () => getEmployeeData(user_email));

  if (isLoading) return <div>Loading...........</div>;
  if (isError) return <div>Erorr............</div>;
  //if (Loading) return <div>Loading...........</div>;
  // if (Error) return <div>Erorr............</div>;

  //const email = data.email;

  const { email } = data;
  // console.log(email);
  dispatch(userEmail(email));
  let username = `${data.firstname} ${data.lastname}`;

  //console.log(email);
  console.log("This is the information ");
  console.log(empData);
  //if (empData) {
  //const { jobTitle, businessUnit } = empData;

  if (empData) {
    const { _id, businessUnit, jobTitle } = empData;
    dispatch(employeeAction(_id));

    dispatch(BusinessUnitAction(businessUnit));

    dispatch(jobTitleAction(jobTitle));

    console.log(_id);
    console.log(businessUnit);
    console.log(jobTitle);
  }

  // const menu = userMenu.dashboard.tabs;
  console.log("Testing place");
  console.log(empId);
  console.log(job);
  console.log(business);

  return (
    <Layout navHeading="Your profile">
      <VStack spacing="2.5rem" alignItems="stretch">
        <EmployeeProfile
          fullName={username === "undefined" ? null : username}
          workEmail={data.email}
          jobTitle={job === "undefined" ? null : job}
          businessUnit={business}
        />
        <LeaveOverView
          pendingLeaveTime={0}
          approvedLeaveTime={0}
          remainingLeaveTime={20}
          totalLeaveTime={20}
        />
      </VStack>
    </Layout>
  );
}
