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
import { useQueryClient, useMutation, useQuery } from "react-query";
import { addEmployee } from "@/lib/helper/employee";
import { useRouter } from "next/router";
import { userMenu } from "@/components/config/navigation";
import Layout from "@/components/layout";
import { useSelector } from "react-redux";
import { getUser } from "@/lib/helper/user";
import { roles } from "@/utils/constants";
import Axios from "axios";

function AddEmployeeForm({ formData, setFormData }) {
  const toast = useToast();
  const router = useRouter();

  /***
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ml_default");
    //console.log(files[0]);
    Axios.post(
      "http://api/cloudinary.com/v1_1/dryckzo2l/image/upload",
      formData
    ).then((Response)=>{

    })
  };
  * */
  //const queryClient = useQueryClient();
  // const [formData, setFormData] = useReducer(formReducer, {});
  const addMutation = useMutation(addEmployee, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Employee record updated successfully",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const userId = useSelector((state) => state.app.client.userId);
  console.log(`userId  ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  if (isLoading) return <div>Loading...........</div>;
  if (isError) return <div>Erorr............</div>;
  const { role } = data;
  console.log(role);

  //posting data to the backend

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const formLength = Object.keys(formData).length;
    console.log(formLength);
    if (formLength == 0) return alert("No data");

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
    console.log("Employee Data here");
    console.log(formData);
    console.log(employmentType);
    console.log(businessUnit);
    console.log(educationalLevel);

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
    if (addMutation.isSuccess)
      return toast({
        title: "Success",
        description: "Employee added successfully",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });

    if (role == "STAFF") {
      router.push("/user/[username]");
    } else {
      router.push("/employees");
    }
  };
  const menu = userMenu.employees.tabs;
  return (
    <Layout navHeading="Employee Information Form">
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
          <Select
            size="sm"
            name=" title"
            onChange={setFormData}
            isrequired="true"
            defaultValue="mr."
          >
            <option value="mr.">Mr.</option>
            <option value="mrs.">Mrs.</option>
            <option value="dr.">Dr.</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        {/******        <FormControl>
          <FormLabel>Upload profile picture (Max.size:5MB)</FormLabel>
          <Input
            type="file"
            name="profilePicture"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
            isrequired="true"
          />
        </FormControl>
*** */}

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
            name="employmentType"
            isrequired="true"
            placeholder="select employement type"
            onChange={setFormData}
            //defaultValue="Full time"
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
            isrequired="true"
            name="businessUnit"
            onChange={setFormData}
            //defaultValue="E-commerce"
            placeholder="select business unit"
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
          <Select
            size="sm"
            name="employmentStatus"
            onChange={setFormData}
            isrequired="true"
            defaultValue="active"
            //placeholder="select employement status"
          >
            <option value="active">Active</option>
            <option value="joining">Joining</option>
          </Select>
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
          <Select
            size="sm"
            name="gender"
            onChange={setFormData}
            isrequired="true"
            //defaultValue="male"
            placeholder="select gender"
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Marital Status</FormLabel>
          <Select
            size="sm"
            name="maritalStatus"
            onChange={setFormData}
            isrequired="true"
            defaultValue="single"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </Select>
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
            name="nationalIDNumber"
            onChange={setFormData}
            isrequired="true"
            placeholder="GHA-0001-0202"
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
          <Input
            size="sm"
            type="text"
            isrequired="true"
            onChange={setFormData}
          />
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
          <Select
            size="sm"
            type="text"
            //defaultValue={onMedication}
            name="onMedication"
            isrequire="true"
            onChange={setFormData}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={4} flex="end">
          <Button
            bg="green.600"
            _hover={{
              bg: "green.600",
            }}
            color="white"
            onClick={handleAddEmployee}
          >
            Save
          </Button>
          <Button
            bg="red.600"
            _hover={{
              bg: "red.600",
            }}
            color="white"
            onClick={() => {
              router.push("/user/[username]");
            }}
          >
            Exit
          </Button>
        </Stack>
      </Stack>
    </Layout>
  );
}

export default AddEmployeeForm;
