import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

//require("dotenv").config();

export default function App({ Component, pageProps }) {
  const theme = extendTheme({});
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
