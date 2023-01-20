export const userMenu = {
  dashboard: {
    title: "Dashboard",
    path: "/[username]",
    tabs: [
      { title: "Overview", path: "/[]username" },
      { title: "Leave", path: "/[username]/leave" },
    ],
  },
  /*****    feed: {
        title: 'Feed',
        path: '/feed',
        tabs: []

    },
     */
  employees: {
    title: "Employees",
    path: "/employees",
    tabs: [],
  },
  leaves: {
    title: "Leaves",
    path: "/leaves",
    tabs: [
      /**** {title: 'Overview', path: '/[username]'},
            {title: 'Leave', path: '/[username]/leave'},
             */
    ],
  },
  notifications: {
    title: "Notifications",
    path: "/notifications",
    tabs: [],
  },
};

/******
export const hrMenu = {
  employees: {
    title: "Employees",
    path: "/employees",
    tabs: [],
  },
  // onboarding: {
  //     title: 'Onboarding',
  //     path: '/onboarding',
  // },
  reports: {
    title: "Reports",
    path: "/reports",
    tabs: [],
  },
};
* */
// export const setupTabs = [
//     {title: 'General', path: 'general'},
//     {title: 'Roles & Access', path: 'roles'},
// ]
