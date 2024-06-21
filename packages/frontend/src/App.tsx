import UserProvider from "./Providers/UserProvider";
import RootScene from "./scenes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <RootScene />
    </UserProvider>
  );
}

export default App;
