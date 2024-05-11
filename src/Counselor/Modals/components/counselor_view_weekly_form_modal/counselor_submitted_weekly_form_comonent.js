import * as React from "react";
import { firestore } from "../../../../firebase/firebase-config";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import CounselorViewFormWeeklyModal from "./counselor_view_form_weekly_modal_component";

export default function CounselorSubmittedWeeklyForm(props) {
  const [wForms, setwForms] = React.useState(props.weeklyForms || []);
  const [showViewWeekly, setShowViewWeekly] = React.useState(false);

  React.useEffect(() => {
    const wFormsQuery = query(
      collection(firestore, "WeeklyForm"),
      where("UID", "==", props.selectedPatientUID)
    );

    const unsubscribe = onSnapshot(wFormsQuery, (snapshot) => {
      const updatedwForms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setwForms(updatedwForms);
    });
    return () => unsubscribe();
  }, [props.selectedPatientUID]);

  return (
    <div>
      <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
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
            .filter((wForm) => wForm.Status === null)
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
                    className="p-2 bg-orange-200 rounded-lg font-semibold"
                    onClick={() => {
                      props.handleSelectwForm(wForm.id);
                      setShowViewWeekly(!showViewWeekly);
                    }}
                  >
                    View Form
                  </button>
                  <CounselorViewFormWeeklyModal
                    show={showViewWeekly}
                    handleClose={() => setShowViewWeekly(!showViewWeekly)}
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
