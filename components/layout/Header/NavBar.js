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
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUser } from "@/lib/helper/user";
import { useRouter } from "next/router";
export default function NavBar({ heading }) {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = useSelector((state) => state.app.client.userId);
  console.log(`This is the id ${userId}`);

  const { isLoading, isError, data, error } = useQuery(["users", userId], () =>
    getUser(userId)
  );
  if (isLoading) return <div>Loading...........</div>;
  if (isError) return <div>Erorr............</div>;
  console.log(data);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
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
        <BellIcon w={8} h={10} color="gray" onClick={onOpen} />
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
                router.push("/leaves");
              }}
            >
              My Leave
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
