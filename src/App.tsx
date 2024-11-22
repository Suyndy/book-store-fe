import "./App.css";
import { MyContextProvider } from "./context/MyContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <MyContextProvider>
      <AppRoutes />
    </MyContextProvider>
  );
}

export default App;
