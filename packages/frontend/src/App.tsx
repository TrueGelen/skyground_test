import UserProvider from "./Providers/UserProvider";
import RootScene from "./scenes";

function App() {
  return (
    <UserProvider>
      <RootScene />
    </UserProvider>
  );
}

export default App;
