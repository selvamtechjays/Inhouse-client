// Importing the necessary styles and components
import "./App.css";
import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Profile from "./components/profile/profile";

// The main App component
function App() {
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      {/* Defining the routes using React Router's `Routes` component */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the profile page */}
        <Route path="/profile" element
        ={<Profile openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />} />
      </Routes>
    </>
  );
}

// Exporting the App component as the default export
export default App;

