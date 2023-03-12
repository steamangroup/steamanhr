import {
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  CircularProgress,
  Box,
  Flex,
  Text,
  HStack,
  Avatar,
  Textarea,
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

  useEffect(() => {
    if (data) {
      console.log(data);
      const { email } = data;
      getEmployeeData(email)
        .then((infor) => {
          console.log("Data");
          setEmpInfor(infor);
          console.log(infor);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;
  if (isError) return <CircularProgress isIndeterminate color="green.300" />;
  console.log(data);

  let username = `${data.firstname} ${data.lastname}`;

  const email = data.email;

  const {
    firstname,
    lastname,

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

  return (
    <Flex>
      <Box mr={70}>
        <Avatar name={username} size="2xl" bg="lightgray" color="black" />
      </Box>

      <Stack w={800} m="auto" spacing={5}>
        <Box w={200}>
          <Text
            fontSize={16}
            fontWeight="400"
            mb={12}
            boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            borderRadius={20}
            textAlign="center"
            bg="#0b665c"
            color="white"
            p={1}
          >
            Personal Information
          </Text>
        </Box>
        <HStack spacing={10}>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              First Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="firstName"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={firstname}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Last Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="lastName"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={lastname}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Other Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="otherName"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Gender
            </FormLabel>
            <Select
              size="sm"
              name="gender"
              //onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={gender}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Marital Status
            </FormLabel>
            <Select
              size="sm"
              name="maritalStatus"
              //onChange={setFormData}
              isrequired="true"
              //defaultValue="single"
              h={10}
              borderRadius={10}
              // placeholder="select status"
              color="teal.700"
              defaultValue={maritalStatus}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </Select>
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Contact Number
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="contactNumber"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={contactNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Place of residence
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="placeOfResidence"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={placeOfResidence}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Title
            </FormLabel>
            <Select
              size="sm"
              name=" title"
              // onChange={setFormData}
              isrequired="true"
              // defaultValue="mr."
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={title}
            >
              <option value="mr.">Mr.</option>
              <option value="mrs.">Mrs.</option>
              <option value="dr.">Dr.</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Date of Birth
            </FormLabel>
            <Input
              size="sm"
              type="date"
              //defaultValue="Date of Birth"
              name="dateOfBirth"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={dateOfBirth}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Highest Educational Level
            </FormLabel>
            <Select
              size="sm"
              //defaultValue=""
              name="educationalLevel"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={educationalLevel}
            >
              <option value="O level">O Level</option>
              <option value="Junior high school">Junior High School</option>
              <option value="Senior high school">Senior High School</option>
              <option value="Technical">Technical/ Vocational</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor degree">Bachelors Degree</option>
              <option value="Master degree">
                Masters Degree/ Postgraduate
              </option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              TIN
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="tin"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={tin}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              SNNIT
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="snnit"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={snnit}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              National ldentification Number
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="nationalIDNumber"
              // onChange={setFormData}
              isrequired="true"
              placeholder="GHA-0001-0202"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={nationalIDNumber}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Number of Dependent(s)
            </FormLabel>
            <Input
              size="sm"
              type="number"
              name="numberOfDependents"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={numberOfDependents}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Next of Kin (Name)
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="nextOfKinNumber"
              isrequired="true"
              //  onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={nextOfKinName}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Next of Kin (Phone)
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="emergencyContactName"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={nextOfKinNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Emergency Contact's Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="emergencyContactNumber"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={emergencyContactName}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Emergency Contact's Number
            </FormLabel>
            <Input
              size="sm"
              type="text"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={emergencyContactNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Bank Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="employeeBankName"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={employeeBankName}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          {" "}
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Account Holder
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="accountHolder"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={accountHolder}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Account Number
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="accountNumber"
              isrequired="true"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={accountNumber}
            />
          </FormControl>
        </HStack>
        <Box w={200}>
          <Text
            fontSize={16}
            fontWeight="400"
            mb={10}
            boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            borderRadius={20}
            textAlign="center"
            mt={20}
            bg="#0b665c"
            color="white"
            p={1}
          >
            Work Information
          </Text>
        </Box>
        <HStack spacing={10}>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Work Email Address
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="workEmail"
              //onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={workEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Employment Start date
            </FormLabel>
            <Input
              size="sm"
              type="date"
              isrequired="true"
              name="employmentStartDate"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={employmentStartDate}
            />
          </FormControl>
        </HStack>
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
        <HStack spacing={10}>
          {" "}
          <FormControl color="tela.700" fontWeight="400">
            <FormLabel color="teal.700" fontWeight="400">
              Department
            </FormLabel>
            <Select
              size="sm"
              isrequired="true"
              name="department"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              // placeholder="select a department"
              color="teal.700"
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
            <FormLabel color="teal.700" fontWeight="400">
              Job Title
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="jobTitle"
              // onChange={setFormData}
              isrequired="true"
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={jobTitle}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10}>
          <FormControl>
            <FormLabel color="teal.700" fontWeight="400">
              Office Location
            </FormLabel>
            <Input
              size="sm"
              type="text"
              isrequired="true"
              name="officeLocation"
              // onChange={setFormData}
              h={10}
              borderRadius={10}
              color="teal.700"
              defaultValue={officeLocation}
            />
          </FormControl>
          <FormControl color="teal.700" fontWeight="400">
            <FormLabel>Employment Status</FormLabel>
            <Select
              size="sm"
              name="employmentStatus"
              // onChange={setFormData}
              isrequired="true"
              defaultValue={employmentStatus}
              //placeholder="select employement status"
              h={10}
              borderRadius={10}
              color="teal.700"
            >
              <option value="active">Active</option>
              <option value="joining">Joining</option>
            </Select>
          </FormControl>
        </HStack>{" "}
        <FormControl>
          <FormLabel color="teal.700" fontWeight="400">
            Employment Type
          </FormLabel>
          <Select
            size="sm"
            name="employmentType"
            isrequired="true"
            // placeholder="select employement type"
            //  onChange={setFormData}
            h={10}
            borderRadius={10}
            //defaultValue="Full time"
            color="teal.700"
            defaultValue={employmentType}
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Contract">Contract</option>
            <option value="NSS">NSS</option>
            <option value="Intern">Internship</option>
          </Select>
        </FormControl>
        <Box w={200}>
          <Text
            fontSize={16}
            fontWeight="400"
            mb={10}
            boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            borderRadius={20}
            textAlign="center"
            mt={20}
            bg="#0b665c"
            color="white"
            p={1}
          >
            Medical Information
          </Text>
        </Box>
        <FormControl>
          <FormLabel color="teal.700" fontWeight="400">
            Health Condtion ( Kindly specify if any )
          </FormLabel>
          <Textarea
            size="sm"
            type="text"
            name="healthCondition"
            isrequired="true"
            //onChange={setFormData}
            h={10}
            borderRadius={10}
            cols={4}
            defaultValue={healthCondition}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.700" fontWeight="400">
            Medication
          </FormLabel>
          <Select
            size="sm"
            type="text"
            //defaultValue={onMedication}
            name="onMedication"
            isrequire="true"
            // onChange={setFormData}
            h={10}
            borderRadius={10}
            // placeholder="select option"
            color="teal.700"
            defaultValue={onMedication}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        {/*******
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
        * */}
      </Stack>
    </Flex>
  );
}
