import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./routes/Dashboard";
import Signin from "./routes/Signin";
import SendMoney from "./routes/SendMoney";
import Signup from "./routes/Signup";
import { useRecoilValue } from "recoil";
import { userAtom } from "./store/atoms";

const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/signin"
            element={
              user?.firstName?.length > 1 ? (
                <Navigate to="/dashboard" />
              ) : (
                <Signin />
              )
            }
          />

          <Route
            path="/signup"
            element={
              user?.firstName?.length > 1 ? (
                <Navigate to="/dashboard" />
              ) : (
                <Signup />
              )
            }
          />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
