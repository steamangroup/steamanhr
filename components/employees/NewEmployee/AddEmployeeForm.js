import React from "react";
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
} from "@chakra-ui/react";

function AddEmployeeForm({ newEmployee, setNewEmployee }) {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                fullName: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.fullName}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <RadioGroup
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                title: e,
              },
            }))
          }
          value={newEmployee.workProfile.title}
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
        <FormLabel>Work Email Address</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                workEmail: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.workEmail}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Type</FormLabel>
        <Select
          size="sm"
          //defaultValue="Employment type"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                employmentType: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.employmentType}
        >
          <option value="fulltime">Full time</option>
          <option value="parttime">Part time</option>
          <option value="contract">Contract</option>
          <option value="nss">NSS</option>
          <option value="intern">Internship</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Business Unit</FormLabel>
        <Select
          size="sm"
          //defaultValue="Business unit"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                businessUnit: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.businessUnit}
        >
          <option value="e-clinicals">E-Clinicals</option>
          <option value="e-commerce">E-commerce</option>
          <option value="the heights bar">The Heights Bar</option>
          <option value="the heights appartment">The Heights Appartment</option>
          <option value="heights trasacco">Steaman Heights-Trasacco</option>
          <option value="steaman village">Steaman Village</option>
          <option value="business unit">Finance Unit</option>
          <option value="it solutions">Steaman IT Solutions</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Department</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                department: e.target.value,
              },
            }))
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>Job Title</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                jobTitle: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.jobTitle}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Office Location</FormLabel>
        <Input
          size="sm"
          type="text"
          defaultValue="Office Location "
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                officeLocation: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.officeLocation}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Employment Status</FormLabel>
        <RadioGroup
          //defaultValue="Employement status"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                employmentStatus: e,
              },
            }))
          }
          value={newEmployee.workProfile.employmentStatus}
        >
          <HStack spacing="24px">
            <Radio value="active">Active</Radio>
            <Radio value="joining">Joining</Radio>
            <Radio value="former">Former</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Employment Start date</FormLabel>
        <Input
          size="sm"
          type="date"
          defaultValue="Employment start date"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                employmentStartDate: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.employmentStartDate}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          size="sm"
          type="date"
          //defaultValue="Date of Birth"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                dateOfBirth: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.dateOfBirth}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          //defaultValue="Gender"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                gender: e,
              },
            }))
          }
          value={newEmployee.workProfile.gender}
        >
          <HStack spacing="24px">
            <Radio value="active">Male</Radio>
            <Radio value="joining">Female</Radio>
            <Radio value="former">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Marital Status</FormLabel>
        <RadioGroup
          //defaultValue="Marital status"
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                maritalStatus: e,
              },
            }))
          }
          value={newEmployee.workProfile.maritalStatus}
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
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                contactNumber: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.contactNumber}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Place of residence</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                placeOfResidence: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.placeOfResidence}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Highest Educational Level</FormLabel>
        <Select
          size="sm"
          //defaultValue=""
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                educationalLevel: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.educationalLevel}
        >
          <option value="o level">O Level</option>
          <option value="junior high school">Junior High School</option>
          <option value="senior high school">Senior High School</option>
          <option value="technical">Technical/ Vocational</option>
          <option value="diploma">Diploma</option>
          <option value="bachelor degree">Bachelor's Degree</option>
          <option value="master degree">Master's Degree/ Postgraduate</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>SNNIT</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                snnit: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.snnit}
        />
      </FormControl>

      <FormControl>
        <FormLabel>National ldentification Number (Ghana Card)</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                nationaldNumber: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.nationaldNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel>TIN</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                tin: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.tin}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Number of Dependent(s)</FormLabel>
        <Input
          size="sm"
          type="number"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                numberOfDependents: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.numberOfDependents}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Name)</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                nextOfKinName: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.nextOfKinName}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Next of Kin (Phone)</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                nextOfKinNumber: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.nextOfKinNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Emergency Contact's Name</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                emergencyContactName: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.emergencyContactName}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Emergency Contact's Number</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                emergencyContactNumber: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.emergencyContactNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Bank Name</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                employeeBankName: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.employeeBankName}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Holder</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                accountHolder: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.accountHolder}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Account Number</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                accountNumber: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.accountNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Health Condtion</FormLabel>
        <Input
          size="sm"
          type="text"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                healthCondition: e.target.value,
              },
            }))
          }
          value={newEmployee.workProfile.healthCondition}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Medication</FormLabel>
        <RadioGroup
          //defaultValue="Medication"
          isRequired
          onChange={(e) =>
            setNewEmployee((prevState) => ({
              workProfile: {
                ...prevState.workProfile,
                onMedication: e,
              },
            }))
          }
          value={newEmployee.workProfile.onMedication}
        >
          <HStack spacing="24px">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="other">Other</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

export default AddEmployeeForm;
