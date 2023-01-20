import { hrMenu, userMenu } from "@/components/config/navigation";
import { VStack, Box, Button } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";

export default function SideBar() {
  return (
    <VStack spacing={10}>
      <Box pb="1.875rem">
        <Logo />
      </Box>
      <VStack spacing={0} flex={1} alignItems="stretch">
        <VStack spacing={10} alignItems="start">
          {Object.values(userMenu).map((item, idx) => (
            <NavLink
              // @ts-ignore
              w="100%"
              href={item.path}
              key={`${item.title}-${idx}`}
            >
              {item.title}
            </NavLink>
          ))}
        </VStack>
        {/******
        <VStack spacing={0} alignItems="start">
          {Object.values(hrMenu).map((item, idx) => (
            <NavLink
              // @ts-ignore
              w="100%"
              href={item.path}
              key={`${item.title}-${idx}`}
            >
              {item.title}
            </NavLink>
          ))}
        </VStack>
        *** */}
      </VStack>
      <VStack spacing={0} alignItems="start">
        {/* <NavLink
                    w='100%'
                    href='/setup'
                    cursor='not-allowed'
                >
                    Setup
                </NavLink> 
        <AccountMenu />
        <ReportIssue />
        */}
      </VStack>
    </VStack>
  );
}
