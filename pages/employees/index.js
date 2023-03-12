import EmployeeTable from "@/components/employees/EmployeeTable";
import Layout from "@/components/layout";
import { getEmployees } from "@/lib/helper/employee";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { useQuery } from "react-query";

export default function EmployeePage() {
  const { isLoading, isError, data, error } = useQuery(
    "employees",
    getEmployees
  );

  if (isLoading)
    return (
      <Layout navHeading="Employees">
        <EmployeeTable>
          <CircularProgress isIndeterminate color="green.300" />
        </EmployeeTable>
      </Layout>
    );
  if (isError)
    return (
      <Layout navHeading="Employees">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error fetching data</AlertTitle>
          <AlertDescription>
            There was error processing your request due to unstable internet
            connection
          </AlertDescription>
        </Alert>
      </Layout>
    );
  /// console.log(data);
  return (
    <Layout navHeading="Employees">
      <EmployeeTable>
        {data.map((employeeData, i) => (
          <EmployeeTable.Row
            key={i}
            _id={employeeData._id}
            //profilePicture={employeeData.profilePicture}
            // fullName={employeeData.fullName}
            fullName={`${employeeData.firstName}${employeeData.lastName}`}
            firstName={employeeData.firstName}
            lastName={employeeData.lastName}
            employmentType={employeeData.employmentType}
            employmentStatus={employeeData.employmentStatus}
            workEmail={employeeData.workEmail}
            contactNumber={employeeData.contactNumber}
            employmentStatusColor={employeeData.employmentStatusColor}
            department={employeeData.department}
          />
        ))}
      </EmployeeTable>
    </Layout>
  );
}
