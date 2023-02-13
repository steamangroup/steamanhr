import { userMenu } from "@/components/config/navigation";
import EmployeeTable from "@/components/employees/EmployeeTable";
import Layout from "@/components/layout";
import { getUsers } from "@/lib/helper/employee";
import { CircularProgress } from "@chakra-ui/react";
import { useQuery } from "react-query";

export default function EmployeePage() {
  const menu = userMenu.employees.tabs;

  //console.log(getUser());
  //getUser().then((res) => console.log(res));
  //using react query to cache our data, so we return data from our memory
  const { isLoading, isError, data, error } = useQuery("employees", getUsers);

  if (isLoading)
    return (
      <Layout pageTabs={menu} navHeading="Employees">
        <EmployeeTable>
          <CircularProgress isIndeterminate color="green.300" />
        </EmployeeTable>
      </Layout>
    );
  if (isError) return <div>Got Error {error}</div>;
  console.log(data);
  return (
    <Layout pageTabs={menu} navHeading="Employees">
      <EmployeeTable>
        {data.map((employeeData, i) => (
          <EmployeeTable.Row
            key={i}
            _id={employeeData._id}
            profilePicture={employeeData.profilePicture}
            fullName={employeeData.fullName}
            employmentType={employeeData.employmentType}
            employmentStatus={employeeData.employmentStatus}
            workEmail={employeeData.workEmail}
            contactNumber={employeeData.contactNumber}
            employmentStatusColor={employeeData.employmentStatusColor}
            businessUnit={employeeData.businessUnit}
          />
        ))}
      </EmployeeTable>
    </Layout>
  );
}
