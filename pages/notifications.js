import { userMenu } from "@/components/config/navigation";
import Layout from "@/components/layout";
import React from "react";

export default function notification() {
  const menu = userMenu.notifications.tabs;
  return <Layout pageTabs={menu} navHeading="Notification"></Layout>;
}
