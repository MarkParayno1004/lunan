import * as React from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase-config";
import CounselorViewVerifiedFormModal from "./counselor_view_verified_form_modal_component";

export default function CounselorVerifiedWeeklyForms(props) {
  const [wForms, setwForms] = React.useState(props.weeklyForms || []);
  const [showWeeklyVerified, setShowWeeklYVerified] = React.useState(false);
  React.useEffect(() => {
    // Create a query to get tasks for the selected patient
    const wFormsQuery = query(
      collection(firestore, "WeeklyForm"),
      where("UID", "==", props.selectedPatientUID) // Replace "PatientUID" with the actual field name in your Firestore data
    );

    const unsubscribe = onSnapshot(wFormsQuery, (snapshot) => {
      const updatedwForms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setwForms(updatedwForms);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [props.selectedPatientUID]);
  return (
    <div>
      <h1>Verified</h1>
      <table className="w-full text-sm text-center h-full">
        <thead className="bg-primaryGreen">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-ss-lg">
              Date Submitted
            </th>

            <th scope="col" className="px-6 py-3 rounded-se-lg">
              View Form
            </th>
          </tr>
        </thead>
        <tbody className="">
          {wForms
            .filter((wForm) => wForm.Status === "Verified")
            .map((wForm, index) => (
              <tr key={index}>
                <td className="p-2 border border-slate-600">
                  {new Date(wForm.DateSubmitted).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border border-slate-600">
                  <button
                    className="bg-orange-200 p-2 rounded-lg"
                    onClick={() => {
                      props.handleSelectwForm(wForm.id);
                      setShowWeeklYVerified(!showWeeklyVerified);
                    }} // Pass the form's ID
                  >
                    View Form
                  </button>
                  <CounselorViewVerifiedFormModal
                    show={showWeeklyVerified}
                    handleClose={() =>
                      setShowWeeklYVerified(!showWeeklyVerified)
                    }
                    selectedwForm={props.selectedwForm}
                    weeklyForm={props.selectedwForm}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
