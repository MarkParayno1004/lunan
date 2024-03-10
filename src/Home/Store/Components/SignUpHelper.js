import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/firebase-config";

const userAccRef = collection(firestore, "Users");
const intakeRef = collection(firestore, "IntakeForms");
// Function to generate a random password
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

export async function upload(data, formData) {
  try {
    // Generate a random password with length 8
    const password = generateRandomPassword(8);
    // Create a user account with the provided email and generated password
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.Email,
      password
    );
    console.log("Generated Password:", password);

    // Add user formData to the "Users" collection
    const newUser = {
      firstName: data.Fname,
      dateCreated: new Date().toISOString().split("T")[0],
      Gender: data.Gender,
      Age: data.Age,
      Email: data.Email,
      CellPhone: data.CellPhone,
      UID: user.uid, // Now you can use user.uid safely
      Role: "Patient",
      counselorID: null,
      password: password,
      ProfPic: null,
      Birthday: data.BirthDate,
    };
    console.log("New User formData:", newUser);
    // Add the document to Firestore
    await addDoc(userAccRef, newUser);

    const newIntake = {
      UID: user.uid,
      StreetNum: data.StreetNum || "N/A",
      Barangay: data.Barangay || "N/A",
      City: data.City || "N/A",
      Region: data.Region || "N/A",
      Zip: data.Zip || "N/A",
      CPFname: data.CPFname || "N/A",
      Rel: data.Rel || "N/A",
      CPNum: data.CPNum || "N/A",
      DocFname: data.DocFname || "N/A",
      DocNum: data.DocNum || "N/A",
      CommLearn: data.CommLearn || "N/A",
      CommAssess: data.CommAssess || "N/A",
    };
    console.log("New Intake Form:", newIntake);
    await addDoc(intakeRef, newIntake);
  } catch (error) {
    console.error("Error uploading formData:", error);
  }
}
