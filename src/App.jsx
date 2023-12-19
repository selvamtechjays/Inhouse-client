
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Profile from "./components/profile/profile";
import Sidebar from "./components/profile/Dashboard/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
