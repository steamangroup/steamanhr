import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavLink = (props) => {
  const { children, href, ...rest } = props;

  const router = useRouter();

  let activeBgStyle = "";
  if (router.pathname === href) {
    activeBgStyle = "lightgray";
  }

  const linkStyles = {
    px: "0.5rem",
    py: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    borderRadius: "0.25rem",
    textDecoration: "none",
    cursor: "default",
    bg: activeBgStyle,
  };

  const linkHoverStyles = {
    bg: "lightgray",
  };

  return (
    <Link
      as={NextLink}
      href={href}
      {...linkStyles}
      _hover={linkHoverStyles}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;
