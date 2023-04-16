import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import Routes from "./routes";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer
        autoClose={5000}
        draggable={false}
        limit={1}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App;
