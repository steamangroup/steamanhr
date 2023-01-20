import { userMenu } from "@/components/config/navigation";
import EmployeeTable from "@/components/employees/EmployeeTable";
import Layout from "@/components/layout";
import employeeData from "../../database/data.json";

export default function EmployeePage() {
  const menu = userMenu.employees.tabs;
  console.log(employeeData);
  return (
    <Layout pageTabs={menu} navHeading="Employees">
      <EmployeeTable>
        {employeeData.map((data) => (
          <EmployeeTable.Row
            profilePicture={data.profilePicture}
            fullName={data.fullName}
            employmentType={data.employmentType}
            workEmail={data.workEmail}
            contactNumber={data.contactNumber}
            employmentStatusColor={data.employmentStatusColor}
            businessUnit={data.businessUnit}
          />
        ))}
      </EmployeeTable>
    </Layout>
  );
}
