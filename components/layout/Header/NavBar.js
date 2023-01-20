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
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
export default function NavBar({ heading }) {
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
        <BellIcon w={8} h={10} color="gray" />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Account
          </MenuButton>
          <MenuList>
            <MenuItem>Logout</MenuItem>
            <MenuItem>View profile</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
