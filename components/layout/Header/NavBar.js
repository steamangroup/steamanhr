import {
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUser } from "@/lib/helper/user";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function NavBar({ heading }) {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = useSelector((state) => state.app.client.userId);
  console.log(`This is the id ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  if (isLoading)
    return (
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Fetching Data.......</AlertTitle>
        <AlertDescription>Just a few sconds</AlertDescription>
      </Alert>
    );
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error processing your request
        </AlertDescription>
      </Alert>
    );
  console.log(data);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        px: 10,
        py: 4,
        mt: "-1.5rem",
        minW: "70vw",
        borderRadius: 10,
      }}
    >
      {!!heading ? (
        <Box mb="1rem">
          <Heading size="lg">{heading}</Heading>
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          gap: 10,
        }}
      >
        <Box>
          <BellIcon
            w={7}
            h={9}
            color="black"
            onClick={onOpen}
            cursor="pointer"
          />
          <Badge
            m="-20px 0px 0px -15px"
            bg="red.600"
            color="white"
            borderRadius={8}
            fontSize={9}
          >
            0
          </Badge>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notifications</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>No notifications</h1>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Menu>
          <MenuButton
            as={Button}
            outline="black"
            variant="outline"
            rightIcon={<ChevronDownIcon />}
          >
            Hi{" "}
            <span
              style={{
                marginLeft: "5px",
              }}
            ></span>
            {data.firstname}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                toast({
                  title: "Success",
                  description: "Logged out successfully",
                  status: "success",
                  duration: 1200,
                  isClosable: true,
                  position: "top-right",
                });
                Cookies.remove("userId");
                router.push("/auth/login");
              }}
            >
              Logout
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/employees/profile");
              }}
            >
              View profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/employees/add");
              }}
            >
              Add Employee information
            </MenuItem>

            <MenuItem
              onClick={() => {
                router.push(`/leaves/${data._id}`);
              }}
            >
              My Leaves
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
