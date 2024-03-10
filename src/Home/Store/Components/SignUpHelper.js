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
  } catch (error) {
    console.error("Error uploading formData:", error);
  }
}
