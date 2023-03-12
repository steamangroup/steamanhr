import React, { useReducer } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/lib/helper/employee";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

function UpdateEmployeeForm({ formId, formData, setFormData }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    ["employees", formId],
    () => getEmployee(formId)
  );

  //updating our employee data
  const updateMutation = useMutation(
    (newData) => updateEmployee(formId, newData),
    {
      onSuccess: async (data) => {
        //updating and retuning new updated employee data
        //queryClient.setQueryData("users", (old) => [data]);
        queryClient.prefetchQuery("employees", getEmployees);
        router.push("/employees");
      },
    }
  );
  //console.log(formId);
  if (isLoading) return <Spinner color="green.500" />;
  if (isError) return <Spinner color="red.500" />;
  const {
    title,
    jobTitle,
    firstName,
    lastName,
    nationalIDNumber,
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

  console.log("Give us attentio herre wai ");
  const handleUpdateEmployeeData = async (e) => {
    e.preventDefault();
    //overiding the data value with our form data
    let updated_data = Object.assign({}, data, formData);
    console.log("This is the update employee form");
    console.log(updated_data);

    toast({
      title: "Success",
      description: "Employee record updated successfully",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top-right",
    });

    await updateMutation.mutate(updated_data);
    router.push("/employees");
  };

  return (
    <Layout navHeading="Employee Update Form">
      <Stack>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={firstName}
            name="firstName"
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={lastName}
            name="lastName"
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Select
            size="sm"
            defaultValue={title}
            name=" title"
            onChange={setFormData}
            placeholder={title}
          >
            <option value="mr.">Mr.</option>
            <option value="mrs.">Mrs.</option>
            <option value="ms.">Ms.</option>
            <option value="dr.">Dr.</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Work Email Address</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={workEmail}
            name="workEmail"
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Employment Type</FormLabel>
          <Select
            size="sm"
            defaultValue={employmentType}
            name=" employmentType"
            onChange={setFormData}
            placeholder={employmentType}
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Contract">Contract</option>
            <option value="NSS">NSS</option>
            <option value="Intern">Internship</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Department</FormLabel>
          <Select
            size="sm"
            isrequired="true"
            name="department"
            onChange={setFormData}
            h={10}
            borderRadius={10}
            placeholder={department}
            defaultValue={department}
          >
            <option value="E-clinicals">E-Clinical</option>
            <option value="E-commerce">E-commerce</option>
            <option value="The heights bar"> Bar and Lounge</option>
            <option value="The heights appartment">Heights Appartment</option>
            <option value="Heights trasacco">Heights-Trasacco</option>
            <option value="Steaman village">Steaman Village</option>
            <option value="Finance unit">Account Unit</option>
            <option value="IT Solutions">IT Solutions</option>
            <option value="Steaman Xpress">Steaman Xpress</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Job Title</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={jobTitle}
            name="jobTitle"
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Office Location</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={officeLocation}
            name="officeLocation"
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Employment Status</FormLabel>
          <Select
            size="sm"
            defaultValue={employmentStatus}
            name="employmentStatus"
            isrequired
            onChange={setFormData}
            placeholder={employmentStatus}
          >
            <option value="active">Active</option>
            <option value="joining">Joining</option>
            <option disabled={true} value="former">
              Former
            </option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Employment Start date</FormLabel>
          <Input
            size="sm"
            type="date"
            defaultValue={employmentStartDate}
            name="employmentStartDate"
            onChange={setFormData}
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
            onChange={setFormData}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            size="sm"
            defaultValue={gender}
            name="gender"
            isrequired
            onChange={setFormData}
            placeholder={gender}
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
            name="educationalLevel"
            isrequired
            onChange={setFormData}
            placeholder={maritalStatus}
          >
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="separated">Separated</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Contact Number</FormLabel>
          <Input
            size="sm"
            type="text"
            name="contactNumber"
            defaultValue={contactNumber}
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Place of residence</FormLabel>
          <Input
            size="sm"
            type="text"
            name="placeOfResidence"
            onChange={setFormData}
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
            onChange={setFormData}
            placeholder={educationalLevel}
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
            onChange={setFormData}
          />
        </FormControl>

        <FormControl>
          <FormLabel>National ldentification Number (Ghana Card)</FormLabel>
          <Input
            size="sm"
            type="text"
            name=" nationaldNumber"
            onChange={setFormData}
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
            onChange={setFormData}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Number of Dependent(s)</FormLabel>
          <Input
            size="sm"
            type="number"
            name="numberOfDependents"
            onChange={setFormData}
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
            onChange={setFormData}
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
            onChange={setFormData}
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
            onChange={setFormData}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Emergency Contact's Number</FormLabel>
          <Input
            size="sm"
            type="text"
            defaultValue={emergencyContactNumber}
            isrequired
            onChange={setFormData}
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
            onChange={setFormData}
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
            onChange={setFormData}
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
            onChange={setFormData}
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
            onChange={setFormData}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Medication</FormLabel>
          <Select
            size="sm"
            defaultValue={onMedication}
            name="onMedication"
            isrequired
            onChange={setFormData}
            placeholder={onMedication}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={4} flex="end">
          <Button
            colorScheme="yellow"
            color="white"
            onClick={handleUpdateEmployeeData}
          >
            Update
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              router.back();
            }}
          >
            Exit
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
}

export default UpdateEmployeeForm;
