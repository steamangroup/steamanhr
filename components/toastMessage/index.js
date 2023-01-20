import { useToast } from "@chakra-ui/react";

function ToastMessage({ title, description, status, isClosable, children }) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      {children}
    </Button>
  );
}

export default ToastMessage;
