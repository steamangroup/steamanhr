import React, { useReducer } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  ButtonGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import { getUser, getUsers, updateUser } from "@/lib/helper";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

function UpdateEmployeeForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    ["employees", formId],
    () => getUser(formId)
  );

  //updating our employee data
  const updateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      //updating and retwuning new updated employee data
      //queryClient.setQueryData("users", (old) => [data]);
      queryClient.prefetchQuery("employees", getUsers);
      router.push("/employees");
    },
  });
  //console.log(formId);
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error</div>;
  const {
    title,
    jobTitle,
    fullName,
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

  const toast = useToast();

  const handleUpdateEmployeeData = async (e) => {
    e.preventDefault();
    //overiding the data value with our form data
    let updated_data = Object.assign({}, data, formData);
    console.log(updated_data);
    toast({
      title: "Success",
      description: "Employee record updated successfully",
      status: "success",
      duration: 1200,
      isClosable: true,
      position: "top-right",
    });
    router.push("/employees");

    await updateMutation.mutate(updated_data);
  };
  return (
    <Stack>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue={fullName}
          name="fullName"
          onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <RadioGroup
          isrequired
          defaultChecked={title}
          onChange={setFormData}
          name="title"
        >
          <HStack spacing="24px">
            <Radio value="mr.">Mr.</Radio>
            <Radio value="ms.">Ms.</Radio>
            <Radio value="mrs.">Mrs.</Radio>
            <Radio value="dr.">Dr.</Radio>
            <Radio value="other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload profile picture (Max.size:5MB)</FormLabel>
        <Input type="file" name="profilePicture" onChange={setFormData} />
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
        >
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
          <option value="Contract">Contract</option>
          <option value="Nss">NSS</option>
          <option value="Intern">Internship</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Business Unit</FormLabel>
        <Select
          size="sm"
          defaultValue={businessUnit}
          name="businessUnit"
          onChange={setFormData}
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
          onChange={setFormData}
        />
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
        <RadioGroup
          defaultChecked={employmentStatus}
          name="employmentStatus"
          isrequired
          onChange={setFormData}
        >
          <HStack spacing="24px">
            <Radio value="active">Active</Radio>
            <Radio value="joining">Joining</Radio>
            <Radio value="former" isDisabled>
              Former
            </Radio>
          </HStack>
        </RadioGroup>
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
        <RadioGroup
          defaultChecked={gender}
          name="gender"
          isrequired
          onChange={setFormData}
        >
          <HStack spacing="24px">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Marital Status</FormLabel>
        <RadioGroup
          defaultChecked={maritalStatus}
          onChange={setFormData}
          name="maritalStatus"
        >
          <HStack spacing="24px">
            <Radio value="single">Single</Radio>
            <Radio value="married">Married</Radio>
            <Radio value="divorced">Divorced</Radio>
            <Radio value="separated">Separated</Radio>
            {/*** <Radio value="widowed">Widowed</Radio>** */}
          </HStack>
        </RadioGroup>
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
        <RadioGroup
          //defaultValue="Medication"
          isrequired
          name="onMedication"
          onChange={setFormData}
          defaultChecked={onMedication}
        >
          <HStack spacing="24px">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <Stack direction="row" spacing={4} flex="end">
        <Button colorScheme="yellow" onClick={handleUpdateEmployeeData}>
          Update
        </Button>
        <Button colorScheme="red">Exit</Button>
      </Stack>
    </Stack>
  );
}

export default UpdateEmployeeForm;
