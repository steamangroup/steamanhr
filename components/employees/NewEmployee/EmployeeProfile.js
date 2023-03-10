import { userMenu } from "@/components/config/navigation";
import {
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  CircularProgress,
} from "@chakra-ui/react";
import { getEmployeeData, getUser } from "@/lib/helper/user";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";

export default function EmployeeProfile() {
  const [empInfor, setEmpInfor] = useState({});
  const userId = useSelector((state) => state.app.client.userId);
  console.log(`This emp ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );

  if (isLoading)
    return (
      <Layout navHeading="Profile Page">
        <CircularProgress isIndeterminate color="green.300" />
      </Layout>
    );
  if (isError)
    return (
      <Layout navHeading="Profile Page">
        <CircularProgress isIndeterminate color="green.300" />
      </Layout>
    );
  console.log(data);
  let username = `${data.firstname} ${data.lastname}`;
  useEffect(() => {
    console.log(data);
    getEmployeeData(data.email)
      .then((infor) => {
        console.log("Data");
        setEmpInfor(infor);
        console.log(infor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data.email]);
  const email = data.email;

  const {
    title,
    jobTitle,
    nationalIDNumber,
    businessUnit,
    employmentType,
    workEmail,
    department,
    officeLocation,
    employmentStatus,
    employmentStartDate,
    dateOfBirth,
    gender,
    maritalStatus,
    contactNumber,
    placeOfResidence,
    educationalLevel,
    snnit,
    numberOfDependents,
    //nationalIDNumber,
    tin,
    nextOfKinName,
    nextOfKinNumber,
    emergencyContactName,
    emergencyContactNumber,
    employeeBankName,
    accountHolder,
    accountNumber,
    healthCondition,
    onMedication,
  } = data;

  console.log(email);
  console.log("This is the information ");
  console.log(empInfor);
  const menu = userMenu.dashboard.tabs;
  return (
    <Stack>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={username}
          name="fullName"
          //onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Select
          size="sm"
          defaultValue={title}
          name=" title"
          //onChange={setFormData}
        >
          <option value="mr.">Mr.</option>
          <option value="mrs.">Mrs.</option>
          <option value="ms.">Ms.</option>
          <option value="dr.">Dr.</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Work Email Address</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={workEmail}
          name="workEmail"
          // onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Type</FormLabel>
        <Select
          size="sm"
          defaultValue={employmentType}
          name=" employmentType"
          //onChange={setFormData}
        >
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
          <option value="Contract">Contract</option>
          <option value="NSS">NSS</option>
          <option value="Intern">Internship</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Business Unit</FormLabel>
        <Select
          size="sm"
          defaultValue={businessUnit}
          name="businessUnit"
          // onChange={setFormData}
        >
          <option value="E-clinicals">E-Clinicals</option>
          <option value="E-commerce">E-commerce</option>
          <option value="The heights bar">The Heights Bar</option>
          <option value="The heights appartment">The Heights Appartment</option>
          <option value="Heights trasacco">Steaman Heights-Trasacco</option>
          <option value="Steaman village">Steaman Village</option>
          <option value="Finance unit">Finance Unit</option>
          <option value="IT Solutions">Steaman IT Solutions</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Department</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={department}
          name="department"
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Job Title</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={jobTitle}
          name="jobTitle"
          //onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Office Location</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={officeLocation}
          name="officeLocation"
          //onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Status</FormLabel>
        <Select
          size="sm"
          defaultValue={employmentStatus}
          name=" employmentStatus"
          //onChange={setFormData}
        >
          <option value="active">Active</option>
          <option value="joining">Joining</option>
          <option value="former">Former</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Employment Start date</FormLabel>
        <Input
          size="sm"
          type="date"
          defaultValue={employmentStartDate}
          name="employmentStartDate"
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          size="sm"
          type="date"
          defaultValue={dateOfBirth}
          name="dateOfBirth"
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Select
          size="sm"
          defaultValue={gender}
          name="gender"
          //onChange={setFormData}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Marital Status</FormLabel>
        <Select
          size="sm"
          defaultValue={maritalStatus}
          name="maritalStatus"
          //onChange={setFormData}
        >
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="separated">Separated</option>
          <option value="divorced">Divorced</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Contact Number</FormLabel>
        <Input
          size="sm"
          type="text"
          name="contactNumber"
          defaultValue={contactNumber}
          //onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Place of residence</FormLabel>
        <Input
          size="sm"
          type="text"
          name="placeOfResidence"
          //onChange={setFormData}
          defaultValue={placeOfResidence}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Highest Educational Level</FormLabel>
        <Select
          size="sm"
          defaultValue={educationalLevel}
          name="educationalLevel"
          isrequired
          //onChange={setFormData}
        >
          <option value="O level">O Level</option>
          <option value="Junior high school">Junior High School</option>
          <option value="Senior high school">Senior High School</option>
          <option value="Technical">Technical/ Vocational</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor degree">Bachelor's Degree</option>
          <option value="Master degree">Master's Degree/ Postgraduate</option>
          <option value="Other">Other</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>SNNIT</FormLabel>
        <Input
          size="sm"
          type="text"
          name="snnit"
          isrequired
          defaultValue={snnit}
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>National ldentification Number (Ghana Card)</FormLabel>
        <Input
          size="sm"
          type="text"
          name=" nationaldNumber"
          //onChange={setFormData}
          defaultValue={nationalIDNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel>TIN</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={tin}
          name="tin"
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Number of Dependent(s)</FormLabel>
        <Input
          size="sm"
          type="number"
          name="numberOfDependents"
          //onChange={setFormData}
          defaultValue={numberOfDependents}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Name)</FormLabel>
        <Input
          size="sm"
          type="text"
          name="nextOfKinName"
          defaultValue={nextOfKinName}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Phone)</FormLabel>
        <Input
          size="sm"
          type="text"
          name="nextOfKinNumber"
          defaultValue={nextOfKinNumber}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Emergency Contact's Name</FormLabel>
        <Input
          size="sm"
          type="text"
          name="emergencyContactName"
          defaultValue={emergencyContactName}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Emergency Contact's Number</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={emergencyContactNumber}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Bank Name</FormLabel>
        <Input
          size="sm"
          type="text"
          name="employeeBankName"
          defaultValue={employeeBankName}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Holder</FormLabel>
        <Input
          size="sm"
          type="text"
          name="accountHolder"
          defaultValue={accountHolder}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Number</FormLabel>
        <Input
          size="sm"
          type="text"
          name="accountNumber"
          defaultValue={accountNumber}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Health Condtion</FormLabel>
        <Input
          size="sm"
          type="text"
          name="healthCondition"
          defaultValue={healthCondition}
          isrequired
          //onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Medication</FormLabel>
        <Select
          size="sm"
          defaultValue={onMedication}
          name="onMedication"
          //onChange={setFormData}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>
    </Stack>
  );
}
