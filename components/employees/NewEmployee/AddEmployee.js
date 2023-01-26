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
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "@/lib/helper";
import { useRouter } from "next/router";

/****
const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};
**/

function AddEmployeeForm({ formData, setFormData }) {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [formData, setFormData] = useReducer(formReducer, {});

  //posting data to the backend
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Employee added successfully",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
      router.push("/employees");
    },
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const formLength = Object.keys(formData).length;
    console.log(formLength);
    if (formLength == 0) return alert("No data");
    console.log(formData);

    //acessing values from form data and posting them in the db
    let {
      title,
      jobTitle,
      fullName,
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
      nationalIDNumber,
      numberOfDependents,
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
    } = formData;

    const model = {
      title: title ?? "Other",
      jobTitle: jobTitle,
      fullName: fullName,
      nationalIDNumber: nationalIDNumber,
      businessUnit: businessUnit,
      employmentType: employmentType,
      workEmail: workEmail,
      department: department,
      officeLocation: officeLocation,
      employmentStatus: employmentStatus ?? "active",
      employmentStartDate: employmentStartDate,
      dateOfBirth: dateOfBirth,
      gender: gender ?? "male",
      maritalStatus: maritalStatus ?? "single",
      contactNumber: contactNumber,
      placeOfResidence: placeOfResidence,
      educationalLevel: educationalLevel,
      snnit: snnit,
      numberOfDependents: numberOfDependents,
      nationaldNumber: nationalIDNumber,
      tin: tin,
      nextOfKinName: nextOfKinName,
      nextOfKinNumber: nextOfKinNumber,
      emergencyContactName: emergencyContactName,
      emergencyContactNumber: emergencyContactNumber,
      employeeBankName: employeeBankName,
      accountHolder: accountHolder,
      accountNumber: accountNumber,
      healthCondition: healthCondition,
      onMedication: onMedication ?? "no",
    };

    //adding new user ot db
    addMutation.mutate(model);
    if (addMutation.isLoading) return <div>Loading......</div>;
    if (addMutation.isError) return <div>Error........</div>;
    if (addMutation.isSuccess) return alert("Employee added successfully");
  };
  return (
    <Stack>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          size="sm"
          type="text"
          name="fullName"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <RadioGroup isrequired="true" onChange={setFormData} name="title">
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
        <Input
          type="file"
          name="profilePicture"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Work Email Address</FormLabel>
        <Input
          size="sm"
          type="text"
          name="workEmail"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Type</FormLabel>
        <Select
          size="sm"
          name=" employmentType"
          onChange={setFormData}
          isrequired="true"
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
          isrequired="true"
          name="businessUnit"
          onChange={setFormData}
        >
          <option value="E-clinicals">E-Clinical</option>
          <option value="E-commerce">E-commerce</option>
          <option value="The heights bar"> Bar and Lounge</option>
          <option value="The heights appartment">Heights Appartment</option>
          <option value="Heights trasacco">Heights-Trasacco</option>
          <option value="Steaman village">Steaman Village</option>
          <option value="Finance unit">Account Unit</option>
          <option value="IT Solutions">IT Solutions</option>
          <option value="IT Solutions">Steama Xpress</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Department</FormLabel>
        <Input
          size="sm"
          type="text"
          name="department"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Job Title</FormLabel>
        <Input
          size="sm"
          type="text"
          name="jobTitle"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Office Location</FormLabel>
        <Input
          size="sm"
          type="text"
          isrequired="true"
          name="officeLocation"
          onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Status</FormLabel>
        <RadioGroup
          //defaultValue="Employement status"
          name="employmentStatus"
          isrequired="true"
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
          isrequired="true"
          name="employmentStartDate"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          size="sm"
          type="date"
          //defaultValue="Date of Birth"
          name="dateOfBirth"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          //defaultValue="Gender"
          name="gender"
          isrequired="true"
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
          isrequired="true"
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
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Place of residence</FormLabel>
        <Input
          size="sm"
          type="text"
          name="placeOfResidence"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Highest Educational Level</FormLabel>
        <Select
          size="sm"
          //defaultValue=""
          name="educationalLevel"
          onChange={setFormData}
          isrequired="true"
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
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>National ldentification Number (Ghana Card)</FormLabel>
        <Input
          size="sm"
          type="text"
          name=" nationalIDNumber"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>TIN</FormLabel>
        <Input
          size="sm"
          type="text"
          name="tin"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Number of Dependent(s)</FormLabel>
        <Input
          size="sm"
          type="number"
          name="numberOfDependents"
          onChange={setFormData}
          isrequired="true"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Name)</FormLabel>
        <Input
          size="sm"
          type="text"
          name="nextOfKinNumber"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Phone)</FormLabel>
        <Input
          size="sm"
          type="text"
          name="emergencyContactName"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Emergency Contact's Name</FormLabel>
        <Input
          size="sm"
          type="text"
          name="emergencyContactNumber"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Emergency Contact's Number</FormLabel>
        <Input size="sm" type="text" isrequired="true" onChange={setFormData} />
      </FormControl>

      <FormControl>
        <FormLabel>Bank Name</FormLabel>
        <Input
          size="sm"
          type="text"
          name="employeeBankName"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Holder</FormLabel>
        <Input
          size="sm"
          type="text"
          name="accountHolder"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Number</FormLabel>
        <Input
          size="sm"
          type="text"
          name="accountNumber"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Health Condtion</FormLabel>
        <Input
          size="sm"
          type="text"
          name="healthCondition"
          isrequired="true"
          onChange={setFormData}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Medication</FormLabel>
        <RadioGroup
          isrequired="true"
          name="onMedication"
          onChange={setFormData}
        >
          <HStack spacing="24px">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <Stack direction="row" spacing={4} flex="end">
        <Button colorScheme="green" onClick={handleAddEmployee}>
          Save
        </Button>
        <Button colorScheme="red">Exit</Button>
      </Stack>
    </Stack>
  );
}

export default AddEmployeeForm;
