import { userMenu } from "@/components/config/navigation";
import EmployeeProfile from "@/components/dashboard/EmployeeProfile";
import Layout from "@/components/layout";
import LeaveOverView from "@/components/leave/LeaveOverView";
import { VStack } from "@chakra-ui/react";
import { getEmployeeData, getUser } from "@/lib/helper/user";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ProfilePage() {
  const [empInfor, setEmpInfor] = useState({});
  const userId = useSelector((state) => state.app.client.userId);
  console.log(`This  ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );

  if (isLoading) return <div>Loading...........</div>;
  if (isError) return <div>Erorr............</div>;
  console.log(data);
  let username = `${data.firstname} ${data.lastname}`;

  const email = data.email;

  getEmployeeData(email).then((infor) => {
    console.log("Data");
    setEmpInfor(infor);
    console.log(infor);
  });

  //const dat = getEmployeeData(email)
  //.then((infor) => {
  // console.log("This is the information ");
  //setEmpData(infor);
  // console.log(infor);
  //})
  //.catch((err) => {
  // console.log(`Error is ${err}`);
  //});

  console.log(email);
  console.log("This is the information ");
  console.log(empInfor);
  const menu = userMenu.dashboard.tabs;

  return (
    <Layout pageTabs={menu} navHeading="Profile Information">
      <VStack spacing="2.5rem" alignItems="stretch">
        <EmployeeProfile
          fullName={username}
          jobTitle={empInfor.jobTitle}
          workEmail={data.email}
          businessUnit={empInfor.businessUnit}
        />
      </VStack>
    </Layout>
  );
}
