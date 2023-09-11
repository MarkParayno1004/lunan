import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { auth } from "../../firebase/firebase-config";
  import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
  
  export const fetchUserData = async (uid, navigate, setLoading, setFirstName) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection, where("UID", "==", uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const userData = docSnapshot.data();
        const firstName = userData.firstName;
        console.log("User data:", userData);
        console.log("First name:", firstName);
        setFirstName(firstName);
  
        if (userData.Role === "Patient") {
          navigate("/Patient Dashboard");
          console.log("User role:", userData.Role);
        } else if (userData.Role === "Counselor") {
          navigate("/Counselor Dashboard");
          console.log("User role:", userData.Role);
        } else if (userData.Role === "Admin") {
          navigate("/Supervisor Dashboard");
          console.log("User role:", userData.Role);
        } else {
          console.log("Non-existing user role");
        }
      } else {
        console.error("User data not found for email:", uid);
      }
    } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
    }
  };
  
  export const loginWithEmailAndPassword = async (email, password, setEmail, setPassword, setLoggedIn, navigate) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      setEmail("");
      setPassword("");
      setLoggedIn(true);
      const userUid = user.uid;
      sessionStorage.setItem("userUid", userUid);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  
  export const sendResetPasswordEmail = async (email, setResetStatus) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus({
        message: 'Password reset instructions sent to your email.',
        success: true,
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setResetStatus({
        message: 'Email is not existing in the system.',
        success: false,
      });
    }
  };

  