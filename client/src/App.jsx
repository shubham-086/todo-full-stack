import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import TaskManager from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task-manager" element={<TaskManager />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
