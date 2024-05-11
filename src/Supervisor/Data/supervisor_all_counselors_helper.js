import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export const fetchCounselorPatientsCount = async (counselorID) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "Users"), where("Role", "==", "Patient"))
    );
    const patientDocs = querySnapshot.docs;
    let patientsCount = 0;
    const counselorDoc = await getDoc(
      doc(collection(firestore, "Users"), counselorID)
    );
    if (counselorDoc.exists()) {
      for (const patientDoc of patientDocs) {
        const patientData = patientDoc.data();
        if (patientData.counselorID === counselorID) {
          patientsCount++;
        }
      }
    }
    return patientsCount;
  } catch (error) {
    return 0;
  }
};
export const fetchCounselorData = async (setFilteredCounselorData) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "Users"), where("Role", "==", "Counselor"))
    );

    const counselorDataWithPatientsCount = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const patientsCount = await fetchCounselorPatientsCount(doc.id);
        return {
          ...doc.data(),
          id: doc.id,
          patientsCount: patientsCount,
        };
      })
    );
    setFilteredCounselorData(counselorDataWithPatientsCount);
  } catch (error) {
    return error;
  }
};

export const addCounselorToData = (
  newCounselor,
  setCounselorData,
  setFilteredCounselorData
) => {
  setCounselorData((prevData) => [...prevData, newCounselor]);
  setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
};

export const handleAddSuccess = (
  newCounselor,
  setCounselorData,
  setFilteredCounselorData
) => {
  setCounselorData((prevData) => [...prevData, newCounselor]);
  setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
};

export const handleRemove = async (
  UID,
  setCounselorData,
  setFilteredCounselorData
) => {
  try {
    const userAccRef = collection(firestore, "Users");
    const counselorDocRef = doc(userAccRef, UID);

    const confirmationResult = await Swal.fire({
      position: "center",
      title: "Are you sure?",
      color: "#000000",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#037d50",
      cancelButtonColor: "#F1A34F",
      confirmButtonText: "Yes, delete it!",
      iconColor: "#FF7F7F",
    });

    if (confirmationResult.isConfirmed) {
      await deleteDoc(counselorDocRef);
      await Swal.fire({
        title: "Deleted!",
        text: "The counselor has been removed.",
        background: "#7db9b6",
        color: "#FFFFFF",
      });

      setCounselorData((prevData) =>
        prevData.filter((counselor) => counselor.UID !== UID)
      );

      setFilteredCounselorData((prevData) =>
        prevData.filter((counselor) => counselor.UID !== UID)
      );
    }
  } catch (error) {
    await Swal.fire({
      title: "Error",
      text: "An error occurred while removing the counselor.",
      background: "#7db9b6",
      color: "#FFFFFF",
      icon: "error",
    });
  }
};

const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

export const uploadProfilePicture = async (userId, file) => {
  try {
    const storageRef = ref(storage, `user_profile_pictures/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `user_photos/${file.name}`);

    const metadata = {
      contentType: file.type,
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const handleSubmitAdd = async (
  event,
  setLoading,
  localFormData,
  onAddSuccess,
  onHide
) => {
  event.preventDefault();
  setLoading(true);

  try {
    const password = generateRandomPassword(8);

    const { user } = await createUserWithEmailAndPassword(
      auth,
      localFormData.Email,
      password
    );

    let photoURL = "";
    if (localFormData.ProfPic) {
      photoURL = await uploadImage(localFormData.ProfPic);
    }

    const newUser = {
      dateCreated: new Date().toISOString().split("T")[0],
      Email: localFormData.Email,
      firstName: localFormData.firstName,
      ConNum: localFormData.ConNum,
      ProfPic: photoURL,
      Role: "Counselor",
      UID: user.uid,
      password: password,
    };

    const userAccRef = collection(firestore, "Users");
    await addDoc(userAccRef, newUser);
    setLoading(false);
    onHide();
    await sendTemporaryCredentialsToEmail(newUser);
    onAddSuccess(newUser);

    setLoading(false);
    onHide();
  } catch (error) {
    setLoading(false);
    throw error;
  }
};

async function sendTemporaryCredentialsToEmail(newUser) {
  const emailData = {
    to: newUser.Email,
    subject: "Your Temporary Credentials",
    body: `Username: ${newUser.Email}\nPassword: ${newUser.password}`,
  };
  try {
    const response = await fetch("http://localhost:3005/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
    if (response.ok) {
      return "Temporary credentials email sent successfully.";
    } else {
      return "Failed to send temporary credentials email.";
    }
  } catch (error) {
    return error;
  }
}
