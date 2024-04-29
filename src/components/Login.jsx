// import React, { useState } from "react";
// import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth, db, storage } from "../firebase";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import { doc, setDoc } from "firebase/firestore";
//import { useNavigate,Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import {app} from"../components/firebase"

const Registration = () => {
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0];

    

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
       console.log(userCredential)
        // ...
      })
      .catch((error) => {
      console.log(error)
        // ..
      });
    }
    
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lets Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="display name" /> */}
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {/* <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label> */}
          <button type="submit">Sign up</button>
        
        </form>
        <p>You have an account? </p>
      </div>
    </div>
  );
};


export default Registration;