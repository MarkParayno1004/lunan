import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
  } from "firebase/firestore";
  import { auth, firestore, storage } from "../../firebase/firebase-config";
  import Swal from "sweetalert2";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import {
    uploadBytes,
    ref,
    getDownloadURL,
    getMetadata,
  } from "firebase/storage";
  import fetch from 'node-fetch';
  

  async function sendTemporaryCredentialsToEmail(newUser) {
    const emailData = {
      to: newUser.Email,
      subject: 'Your Temporary Credentials',
      body: `Username: ${newUser.Email}\nPassword: ${newUser.TemporaryPass}`,
    };
  
    console.log('Sending email data:', emailData);
  
    try {
      const response = await fetch('http://localhost:3005/send-email', { // Adjust the URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      console.log('Email sending response:', response);
  
      if (response.ok) {
        console.log('Temporary credentials email sent successfully.');
      } else {
        console.error('Failed to send temporary credentials email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  // Fetch the number of patients for a counselor
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
        const counselorData = counselorDoc.data();

        for (const patientDoc of patientDocs) {
          const patientData = patientDoc.data();
          if (patientData.counselorID === counselorID) {
            patientsCount++;
          }
        }
      }

      return patientsCount;
    } catch (error) {
      console.error("Error fetching counselor patients count:", error);
      return 0;
    }
  };

    // Fetch counselor data and patients count
    export const fetchCounselorData = async (
    setCounselorData,
    setFilteredCounselorData
    ) => {
        try {
          const querySnapshot = await getDocs(
            query(collection(firestore, "Users"), where("Role", "==", "Counselor"))
          );
    
          const counselorDataWithPatientsCount = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const patientsCount = await fetchCounselorPatientsCount(doc.id);
              return {
                ...doc.data(),
                UID: doc.id,
                patientsCount: patientsCount,
              };
            })
          );
    
          setCounselorData(counselorDataWithPatientsCount);
          setFilteredCounselorData(counselorDataWithPatientsCount);
        } catch (error) {
          console.error("Error fetching counselor data:", error);
        }
      };

      export const addCounselorToData = (
        newCounselor,
        setCounselorData,
        setFilteredCounselorData) => {
        setCounselorData((prevData) => [...prevData, newCounselor]);
        setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
      };

      export const handleAddSuccess = (
        newCounselor,
        setCounselorData,
        setFilteredCounselorData) => {
        // Update the counselorData state to include the new counselor
        setCounselorData((prevData) => [...prevData, newCounselor]);
    
        // Update the filteredCounselorData state to include the new counselor
        setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
      };

      export const handleRemove = async (
        UID, setCounselorData, setFilteredCounselorData) => {
        try {
          const userAccRef = collection(firestore, "Users");
          const counselorDocRef = doc(userAccRef, UID);
    
          const confirmationResult = await Swal.fire({
            position: "top",
            title: "Are you sure?",
            background: "#7db9b6",
            color: "#FFFFFF",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
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
    
            console.log("Counselor removed successfully.", UID);
          }
        } catch (error) {
          console.error("Error removing counselor:", error);
    
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
          console.error("Error uploading profile picture:", error);
          throw error;
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
          console.error("Error uploading image:", error);
          throw error;
        }
      };

      export const handleSubmitAdd = async (
        event,
        setLoading,
        localFormData,
        onAddSuccess,
        onHide,
        setCounselorData,
        setFilteredCounselorData
      ) => {
        event.preventDefault();
        setLoading(true);
      
        try {
          const password = generateRandomPassword(8);
      
          console.log("Generated Password:", password);
      
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
            TemporaryPass: password,
            Role: "Counselor",
            UID: user.uid,
          };
      
          const userAccRef = collection(firestore, "Users");
          await addDoc(userAccRef, newUser);
          await sendTemporaryCredentialsToEmail(newUser);
          console.log("Temporary credentials sent to the counselor's email.");
          setLoading(false);
      
          // Close the modal after successful addition
          onHide();
      
          // Update the counselorData state to include the new counselor
          setCounselorData((prevData) => [...prevData, newUser]);
      
          // Update the filteredCounselorData state to include the new counselor
          setFilteredCounselorData((prevData) => [...prevData, newUser]);
      
          // Automatically render the new counselor in the table
          onAddSuccess(newUser);
      
          setLoading(false);
      
          onHide();
        } catch (error) {
          setLoading(false);
          console.error("Error adding new counselor:", error);
        }
      };
      
      