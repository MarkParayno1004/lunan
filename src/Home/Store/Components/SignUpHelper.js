import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../../firebase/firebase-config";

const userAccRef = collection(firestore, "Users");
const intakeRef = collection(firestore, "IntakeForms");

export function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

async function findCounselorWithMinPatients() {
  const counselorsQuery = query(
    collection(firestore, "Users"),
    where("Role", "==", "Counselor")
  );

  const counselorsSnapshot = await getDocs(counselorsQuery);

  let selectedCounselor;
  let minPatientCount = Infinity;

  counselorsSnapshot.forEach((counselorDoc) => {
    const counselorData = counselorDoc.data();
    const counselorPatientCount = counselorData.patientCount || 0;

    if (counselorPatientCount < minPatientCount) {
      minPatientCount = counselorPatientCount;
      selectedCounselor = counselorDoc;
    }
  });

  return selectedCounselor;
}

async function updateCounselorAndAssignPatient(
  counselorDoc,
  patientUID,
  password,
  data,
  formData
) {
  const counselorRef = doc(firestore, "Users", counselorDoc.id);
  await updateDoc(counselorRef, {
    patientCount: increment(1),
  });

  const patientRef = doc(firestore, "Users", patientUID);
  await setDoc(
    patientRef,
    {
      counselorUID: counselorDoc.data().UID,
      counselorID: counselorDoc.id,
    },
    { merge: true }
  );

  const newUser = {
    ...data,
    UID: patientUID,
    Role: "Patient",
    counselorID: counselorDoc.id,
    counselorUID: counselorDoc.data().UID,
    password: password,
    ProfPic: null,
    dateCreated: new Date().toISOString().split("T")[0],
  };

  console.log("New User formData:", newUser);
  await addDoc(userAccRef, newUser);

  const newIntake = {
    UID: patientUID,
    StreetNum: formData.StreetNum || "N/A",
    Barangay: formData.Barangay || "N/A",
    City: formData.City || "N/A",
    Region: formData.Region || "N/A",
    Zip: formData.Zip || "N/A",
    CPFname: formData.CPFname || "N/A",
    Rel: formData.Rel || "N/A",
    CPNum: formData.CPNum || "N/A",
    DocFname: formData.DocFname || "N/A",
    DocNum: formData.DocNum || "N/A",
    CommLearn: formData.CommLearn || "N/A",
    CommAssess: formData.CommAssess || "N/A",
  };

  console.log("New Intake Form:", newIntake);
  await addDoc(intakeRef, newIntake);
}

export async function upload(data, formData) {
  try {
    const password = generateRandomPassword(8);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.Email,
      password
    );
    console.log("Generated Password:", password);

    const counselorDoc = await findCounselorWithMinPatients();

    if (counselorDoc) {
      await updateCounselorAndAssignPatient(
        counselorDoc,
        user.uid,
        password,
        data,
        formData
      );
    } else {
      console.log("No counselors available");
    }
  } catch (error) {
    console.error("Error uploading formData:", error);
  }
}
