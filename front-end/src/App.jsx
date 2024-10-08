import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppRoutes />
    </Router>
  );
}

export default App;
