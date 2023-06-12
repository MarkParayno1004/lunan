import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from "../firebase/firebase-config";
import "../css/Login.css";
import lunanDark from "../img/LoginImg.png";
import loginInputImg from "../img/LoginInputImg.png";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const fetchUserData = async (uid) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'Users');
      const q = query(usersCollection, where('UID', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const userData = docSnapshot.data();
        const firstName = userData.firstName;
        console.log('User data:', userData);
        console.log('First name:', firstName);
        setFirstName(firstName);

        if (userData.Role === 'Patient') {
          navigate("/Patient Dashboard");
          console.log('User role:', userData.Role);
        }
        
        else if (userData.Role === 'Counselor') {
          navigate('/Counselor Dashboard');
          console.log('User role:', userData.Role);
        } 

        else if (userData.Role === 'Admin') {
          navigate('/Supervisor Dashboard');
          console.log('User role:', userData.Role);}

          else {
          console.log('Non-existing user role');
        }
      } else {
        console.error('User data not found for email:', uid);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      setEmail('');
      setPassword('');
      setLoggedIn(true);
      const userUid = user.uid;
      sessionStorage.setItem('userUid', userUid);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const userUid = sessionStorage.getItem('userUid');
      console.log('Retrieved user UID:', userUid);
      if (userUid) {
        setLoading(true);
        fetchUserData(userUid);
      } else {
        console.error('Invalid user UID:', userUid);
      }
    }
  }, [loggedIn, fetchUserData]);
  

  return (
    <div className="container-fluid text-center" id="loginBG">
      <div className="row align-items-center">
        <div className="col">
          <img src={lunanDark} style={{ width: "70%" }} alt="Logo" />
        </div>
        <div className="col d-flex align-items-center justify-content-center" id="loginInput">
          <div className="mb-5">
            <img src={loginInputImg} style={{ width: "80%" }} alt="Login Input" />
            <p style={{ color: "white", fontSize: "50px" }} className="fs-1">
              Login
            </p>
            <div className="input-group flex-nowrap">
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="addon-wrapping"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-group flex-nowrap">
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="addon-wrapping"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link to="" style={{ color: "white", textDecoration: "none" }}>
                Forgot Password
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                className="d-flex align-items-center justify-content-center"
                id="LoginButton"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
