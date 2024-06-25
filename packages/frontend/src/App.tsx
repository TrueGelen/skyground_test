import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RootScene from "./scenes";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <RootScene />
    </UserProvider>
  );
}

export default App;
