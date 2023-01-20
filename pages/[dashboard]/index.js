import { userMenu } from "@/components/config/navigation";
import EmployeeProfile from "@/components/dashboard/EmployeeProfile";
import Layout from "@/components/layout";
import LeaveOverView from "@/components/leave/LeaveOverView";
import { VStack } from "@chakra-ui/react";

export default function DashboardPage() {
  const menu = userMenu.dashboard.tabs;
  return (
    <Layout pageTabs={menu} navHeading="Your profile">
      <VStack spacing="2.5rem" alignItems="stretch">
        <EmployeeProfile
          fullName="Emmanuel Nutsugah"
          jobTitle="Software Engineer"
          workEmail="emmanuel.nutsugah@steamangroup.com"
          businessUnit="Head Office"
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
