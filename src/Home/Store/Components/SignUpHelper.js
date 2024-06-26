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

async function findCounselorWithMinPatients(formData) {
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
    const counselorGender = counselorData.gender;
    const PreferredGender = formData && formData.PreferredGender;
    if (
      (PreferredGender === counselorGender || PreferredGender) &&
      counselorPatientCount < minPatientCount
    ) {
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

  const newUser = {
    ...data,
    UID: patientUID,
    Role: "Patient",
    counselorID: counselorDoc.id,
    counselorUID: counselorDoc.data().UID,
    password: password,
    ProfPic:
      "https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FotIaGJ8kcQeU7SxX6xM0?alt=media&token=123db672-a9e7-4ec5-9192-1fd52950a6b5",
    dateCreated: new Date().toISOString().split("T")[0],
    Preference: formData.PreferredGender,
  };
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
  await addDoc(intakeRef, newIntake);
  const appointmentsRef = collection(firestore, "Appointments");
  const counselorAppointmentsQuery = query(
    appointmentsRef,
    where("counselorUID", "==", counselorDoc.data().UID),
    where("start", ">=", new Date())
  );

  const counselorAppointmentsSnapshot = await getDocs(
    counselorAppointmentsQuery
  );
  let availableTime = new Date();
  let appointmentCount = counselorAppointmentsSnapshot.size;

  counselorAppointmentsSnapshot.forEach(() => {
    if (appointmentCount < 5) {
      availableTime.setHours(availableTime.getHours() + 1);
      appointmentCount++;
    }
  });
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const tomorrow = new Date(availableTime.getTime() + oneDayInMillis);
  availableTime = new Date(
    Math.max(availableTime.getTime(), tomorrow.getTime())
  );
  availableTime.setHours(10, 0, 0, 0);
  const maxEndTime = new Date(availableTime);
  maxEndTime.setHours(21, 0, 0, 0);
  const startTimestamp = availableTime.getTime();
  const endTimestamp = Math.min(startTimestamp + 3600000, maxEndTime.getTime());
  const newAppointment = {
    counselorUID: counselorDoc.data().UID,
    patient: patientUID,
    status: "Plotted",
    title: "First Session",
    start: new Date(startTimestamp),
    end: new Date(endTimestamp),
  };
  await addDoc(appointmentsRef, newAppointment);
}

export async function upload(data, formData) {
  try {
    const password = generateRandomPassword(8);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.Email,
      password
    );
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
      return "No Counselors Available";
    }
  } catch (error) {
    return error;
  }
}
