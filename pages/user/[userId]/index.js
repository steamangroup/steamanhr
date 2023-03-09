import { userMenu } from "@/components/config/navigation";
import EmployeeProfile from "@/components/dashboard/EmployeeProfile";
import Layout from "@/components/layout";
import LeaveOverView from "@/components/leave/LeaveOverView";
import { VStack } from "@chakra-ui/react";
import { getEmployeeData, getUser } from "@/lib/helper/user";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  BusinessUnitAction,
  employeeAction,
  jobTitleAction,
  remaingleaveDaysAction,
  userEmail,
} from "@/redux/reducer";
import Cookies from "js-cookie";
import {
  getApprovedLeaves,
  getLeaveDuration,
  getLeavePeriod,
  getPendingLeaves,
  getRejectedLeaves,
} from "@/lib/helper/leave";
import axios from "axios";

export default function DashboardPage() {
  /****
  const pending = "http://localhost:3000/api/leaves/status/pending/";
  const approved = "http://localhost:3000/api/leaves/status/approved/";
  const rejected = "http://localhost:3000/api/leaves/status/rejected/";
  const remaining = "http://localhost:3000/api/leaves/duration";
  * */

  const PENDING_API_URL =
    "https://steamanhr.netlify.app/api/leaves/status/pending/";
  const APPROVED_API_URL =
    "https://steamanhr.netlify.app/api/leaves/status/approved/";
  const REJECTED_API_URL =
    "https://steamanhr.netlify.app/api/leaves/status/rejected/";
  const REMAINING_DURATION_API_URL =
    "https://steamanhr.netlify.app/api/leaves/duration";

  const dispatch = useDispatch();
  const [empData, setEmpData] = useState();
  const [pendingLeave, setPendingLeave] = useState(0);
  const [approvedLeave, setApprovedLeave] = useState(0);
  const [rejectedLeave, setRejectedLeave] = useState(0);
  const [totalLeaveDays, setTotalLeaveDays] = useState(0);
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(0);
  //const [remaining, setR] = useState();
  //const [job, setJobTitle] = useState();

  const userId = useSelector((state) => state.app.client.userId);
  const remainingDays = useSelector((state) => state.app.client.remainingDays);
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
      const { email } = data;
      console.log(email);
      dispatch(userEmail(email));

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
      } else {
        console.log("No email");
      }
    } else {
      console.log("No data available");
    }
    //return () => console.log("Completed useEffect cycle..");
  }, [user_email]);

  useEffect(() => {
    Cookies.set("userId", userId ? userId : undefined);
    if (empData) {
      const { _id, businessUnit, jobTitle } = empData;
      dispatch(employeeAction(_id));

      dispatch(BusinessUnitAction(businessUnit));

      dispatch(jobTitleAction(jobTitle));
      Cookies.set("business", business ? business : undefined);
      Cookies.set("job", job ? job : undefined);
      console.log(_id);
      console.log(businessUnit);
      console.log(jobTitle);
    }
  }, [empData]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${PENDING_API_URL}${userId}`, {
          responseType: "json",
        })
        .then(function (res) {
          console.log("Pending data");
          const { status, data } = res;
          if (status === 200) {
            console.log(data);
            setPendingLeave(data);
          }
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
        });
    }

    //approved api fetch
    if (userId) {
      axios
        .get(`${APPROVED_API_URL}/${userId}`, {
          responseType: "json",
        })
        .then(function (res) {
          console.log("Approved data");
          console.log(res);
          const { status, data } = res;
          if (status === 200) {
            console.log(data);
            setApprovedLeave(data);
          }
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
        });
      //rejected api fetch
      axios
        .get(`${REJECTED_API_URL}/${userId}`, {
          responseType: "json",
        })
        .then(function (res) {
          console.log("Rejected data");
          const { status, data } = res;
          if (status === 200) {
            console.log(data);
            setRejectedLeave(data);
          }
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
        });
    } else {
      console.log("No user leave status available");
    }
  }, []);

  //Remaining Leaves days fetch
  useEffect(() => {
    axios
      .get(`${REMAINING_DURATION_API_URL}`, {
        responseType: "json",
      })
      .then(function (res) {
        console.log("Remaining data");
        console.log(res);
        const { data } = res;
        data.map((infor) => {
          console.log(infor);
          const { _id, total, remainingDays } = infor;
          if (userId === _id) {
            console.log(remainingDays);
            setRemainingLeaveDays(remainingDays);
          }
        });
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data);
      });

    /*****
    if (durationData) {
      durationData.map((duration) => {
        const { _id, total, remainingDays } = duration;
        console.log(_id);
        if (userId === _id) {
          console.log("Leave duration data");
          setTotalLeaveDays(totalLeaveDays);
          setRemainingLeaveDays(remainingDays);
          console.log(total);

          //Cookies.get("remainingDays");
          //Cookies.set("remainingDays", remainingDays);
          console.log(remainingDays);
        }
        console.log(duration);
      });
    }
    * */
  }, []);

  const { isLoading, isError, data } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  //const queryClient = useQueryClient();

  /*****
  const {
    isLoading: durationLoading,
    isError: durationError,
    data: durationData,
    error,
  } = useQuery("leaves", getLeavePeriod);
* */
  if (isLoading) return <div>Loading...........</div>;
  if (isError) return <div>Erorr............</div>;

  /***
  if (durationLoading) return <div>Loading...........</div>;
  if (durationError) return <div>Erorr............</div>;
* */
  //leave duration useEffect

  //  console.log(durationData);

  //const email = data.email;

  let username = `${data.firstname} ${data.lastname}`;
  //const { email } = data;
  // console.log(email);
  // dispatch(userEmail(email));
  //console.log(email);
  //console.log("This is the data we have been waiting for");
  //console.log(data);
  //console.log("This is the information ");
  //console.log(empData);
  //if (empData) {
  //const { jobTitle, businessUnit } = empData;

  // const menu = userMenu.dashboard.tabs;
  console.log("Testing place");
  console.log(empId);
  console.log(job);
  console.log(business);

  console.log("Leave statuses");
  console.log(pendingLeave);
  console.log(approvedLeave);
  console.log(rejectedLeave);
  console.log(remainingDays);

  //data = Array.from(data);
  return (
    <Layout navHeading="Your profile">
      <VStack spacing="2.5rem" alignItems="stretch">
        <EmployeeProfile
          fullName={username === "undefined" ? null : username}
          workEmail={data.email}
          jobTitle={job === "undefined" ? null : job}
          businessUnit={business === "undefined" ? null : business}
        />
        <LeaveOverView
          pendingLeaveTime={pendingLeave}
          approvedLeaveTime={approvedLeave}
          rejectedLeaveTime={rejectedLeave}
          remainingLeaveTime={remainingLeaveDays}
          totalLeaveTime={20}
        />
      </VStack>
    </Layout>
  );
}
