import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer />
      <MainLayout />
    </div>
  );
}

export default App;
