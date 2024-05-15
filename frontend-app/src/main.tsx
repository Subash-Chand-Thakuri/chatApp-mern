
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import ChatProvider from "./Context/ContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
