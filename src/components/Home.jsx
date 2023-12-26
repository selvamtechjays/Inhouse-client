import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./GoogleAuth/GoogleAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';

// Firebase authentication provider
provider;

// Home component definition
export const Home = () => {
  // Navigate function from react-router-dom
  const navigate = useNavigate();

  // State to store the user's email
  const [value, setValue] = useState('');

  // Click handler for the Google sign-in button using Firebase authentication
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const allowedDomain = "techjays.com"; // Change this to your desired domain

        // Check if the user's email includes the required domain
        if (data.user.email.includes(`@${allowedDomain}`)) {
          // Set user's email in state and localStorage
          setValue(data.user.email);
          localStorage.setItem("email", data.user.email);
         
          // Redirect to the profile page
          navigate("/profile");
          toast.success("You are logged in successfully.");
        } else {
          // User is not allowed to access the application
          console.log("User is not allowed to access this application");
          // Sign out the user
          signOut(auth);
          // Show Toastify error and redirect to the home page
          toast.error("You are not allowed to access this application.");
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing in:", error.message);
        // Show Toastify error
        toast.error("Error signing in. Please try again.");
      });
  };
  // useEffect to set the initial value based on the email stored in localStorage
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []); // Empty dependency array ensures it runs only once on mount

  // JSX rendering
  return (
    <section style={{ height: "100vh" }} className="position-relative pb-5">
         <ToastContainer />
      <div className="container-fluid">
        <div className="row pt-5">
          {/* Image Column */}
          <div className="col-12 col-lg-6 pic" >
            {/* Image */}
            <img
              className="img-fluid w-90"
              style={{
                marginBottom: "100px",
                height: "490px",
                marginLeft: "0",
                borderRadius: '15px'
              }}
              src='https://i.postimg.cc/CxQsKqSn/in-house.png'
              alt=""
            />
          </div>

          {/* Text Column */}
          <div className="col-12 col-lg-6 d-flex align-items-center" style={{ width: '450px' }}>
            <div className="container">
              {/* Heading */}
              <h4
                className="display-4 fw-bold mb-5"
                style={{ fontSize: "40px" }}
              >
                Welcome to techjays project tracker!
              </h4>
              {/* Subheading */}
              <h4 className="lead fw-bold mb-5">Continue With</h4>
              
              {/* Buttons for Google and Facebook */}
              <div
                className="d-flex flex-row mb-5 button"
                style={{
                  justifyContent: "center",
                  gap: "50px",
                }}
              >
                {/* Check if the user is already signed in */}
                {value ? navigate('/profile') :
                  <button
                    className="btn btn1 color mb-2 custom-button"
                    onClick={handleClick}
                  >
                    <span className="button-text1">Google</span>
                    <FaGoogle className="button-icon1" />
                  </button>
                }

                {/* Facebook Button */}
                <button
                  className="btn btn2 color mb-2 custom-button"
                  onClick={() => console.log("Connect with Google")}
                >
                  <span className="button-text2">Facebook</span>
                  <FaFacebookF className="button-icon2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
