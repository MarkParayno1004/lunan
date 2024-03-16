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
  // await setDoc(
  //   patientRef,
  //   {
  //     counselorUID: counselorDoc.data().UID,
  //     counselorID: counselorDoc.id,
  //   },
  //   { merge: true }
  // );

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
  // Add the appointment
  const appointmentsRef = collection(firestore, "Appointments");

  // Find available time for the counselor with less than 5 Appointments
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
      availableTime.setHours(availableTime.getHours() + 1); // Move to the next hour
      appointmentCount++;
    }
  });

  // Ensure that the start time is at least the day after
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const tomorrow = new Date(availableTime.getTime() + oneDayInMillis);
  availableTime = new Date(
    Math.max(availableTime.getTime(), tomorrow.getTime())
  );

  // Set the start time to the next available day at 10 am
  availableTime.setHours(10, 0, 0, 0);

  // Ensure the end time is no later than 9 pm
  const maxEndTime = new Date(availableTime);
  maxEndTime.setHours(21, 0, 0, 0);

  const startTimestamp = availableTime.getTime();
  const endTimestamp = Math.min(startTimestamp + 3600000, maxEndTime.getTime()); // 1 hour later or 9 pm, whichever is earlier

  const newAppointment = {
    counselorUID: counselorDoc.data().UID,
    patient: patientUID,
    status: "Plotted",
    title: "First Session",
    start: new Date(startTimestamp),
    end: new Date(endTimestamp),
  };

  console.log("New Appointment:", newAppointment);
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
