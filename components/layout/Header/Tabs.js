import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  HStack,
  Heading,
  Flex,
  Button,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import NavLink from "../sidebar/NavLink";

export default function Tabs({ tablist }) {
  return (
    <Box
      sx={{
        pt: "2rem",
        pb: "1rem",
        borderBottomWidth: "1px",
        mb: "1.25rem",
      }}
    >
      {tablist && tablist.length > 0 ? (
        <HStack>
          {tablist.map((item) => (
            <NavLink href={item.path} key={item.title}>
              {item.title}
            </NavLink>
          ))}
        </HStack>
      ) : null}
    </Box>
  );
}
