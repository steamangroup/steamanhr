import UserAccountTable from "@/components/account/UserTable";
//import { userMenu } from "@/components/config/navigation";
//import EmployeeTable from "@/components/employees/EmployeeTable";
import Layout from "@/components/layout";
import { getUsers } from "@/lib/helper/user";
//import { getUsers } from "@/database/controllers/users";
import { CircularProgress } from "@chakra-ui/react";
import { useQuery } from "react-query";

export default function UsersPage() {
  //const menu = userMenu.employees.tabs;

  //console.log(getUser());
  //getUser().then((res) => console.log(res));
  //using react query to cache our data, so we return data from our memory
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  if (isLoading)
    return (
      <Layout navHeading="Users">
        <UserAccountTable>
          <CircularProgress isIndeterminate color="green.300" />
        </UserAccountTable>
      </Layout>
    );
  if (isError) return <div>Got Error {error}</div>;
  console.log("Hii User account data");
  console.log(data);
  return <Layout navHeading="Asset Management"></Layout>;
}
