import { Heading, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Heading>
      <Image src="/logo.png" alt="SreamanHR" w={150} maxH={100} />
    </Heading>
  );
};

export default Logo;
