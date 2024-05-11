import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "../../../firebase/firebase-config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const fetchUserData = async (uid, navigate) => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("UID", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const userData = docSnapshot.data();
      if (userData.Role === "Patient") {
        navigate("/Patient Dashboard");
      } else if (userData.Role === "Counselor") {
        navigate("/Counselor Dashboard");
      } else if (userData.Role === "Admin") {
        navigate("/Supervisor Dashboard");
      } else {
        return "User Profile does not exist";
      }
    } else {
      return "User data not found for email";
    }
  } catch (error) {
    return error;
  }
};

export const loginWithEmailAndPassword = async (
  email,
  password,
  setEmail,
  setPassword,
  setLoggedIn,
  navigate
) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setEmail("");
    setPassword("");
    setLoggedIn(true);
    const userUid = user.uid;
    sessionStorage.setItem("userUid", userUid);
  } catch (error) {
    return error;
  }
};

export const sendResetPasswordEmail = async (email, setResetStatus) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setResetStatus({
      message: "Password reset instructions sent to your email.",
      success: true,
    });
  } catch (error) {
    setResetStatus({
      message: "Email is not existing in the system.",
      success: false,
    });
  }
};
