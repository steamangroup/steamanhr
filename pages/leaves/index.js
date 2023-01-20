import { userMenu } from "@/components/config/navigation";
import Layout from "@/components/layout";
import LeaveListView from "@/components/leave/LeaveListView";
import LeaveTable from "@/components/leave/LeaveTable";

const tab = [];

export default function LeavePage() {
  const menu = userMenu.leaves.tabs;
  console.log(menu);
  return (
    <Layout navHeading="Leave" pageTabs={menu}>
      <LeaveTable>
        <LeaveTable.Row
          leaveType="Annual Leave"
          leaveTypeColor="green"
          leaveStatus="Approved"
          leaveDates="2022/03/23 - 2022/03/29"
          leaveDuration="6 Days"
        />
      </LeaveTable>
    </Layout>
  );
}
