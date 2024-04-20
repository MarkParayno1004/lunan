import * as React from "react";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Box, Modal, Typography } from "@mui/material";
import Swal from "sweetalert2";

export default function SupervisorViewWellnessGuide(props) {
    const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(null);
    const [guideData, setGuideData] = React.useState([]);
    const [openAddGuide, setOpenAddGuide] = React.useState(false);

    const fetchGuideData = async () => {
        const db = getFirestore();
        const q = query(collection(db, "Guide"));
    
        try {
          const querySnapshot = await getDocs(q);
          const guides = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            guides.push(data);
          });
          setGuideData(guides);
        } catch (error) {
          console.error("Error fetching guide data: ", error);
        }
      };
    
      React.useEffect(() => {
        if (props.selectedPatientUID) {
          fetchGuideData();
        }
      }, [props.selectedPatientUID]);
    
      const handleVideoClick = (index) => {
        setSelectedVideoIndex(index === selectedVideoIndex ? null : index);
    };

    return (
        <div className="grid justify-items-stretch">
          <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
            <thead className="bg-primaryGreen">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-ss-lg">
                  Title:
                </th>
                <th scope="col" className="px-6 py-3 rounded-se-lg">
                  View Video
                </th>
              </tr>
            </thead>
            <tbody>
              {guideData
                .filter((guide) => guide.PatientUID === props.selectedPatientUID)
                .map((guide, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-slate-600">{guide.Title}</td>
                    <td className="p-2 border border-slate-600">
                      <button
                        className="p-2 bg-orange-200 rounded-lg font-semibold"
                        onClick={() => handleVideoClick(index)}
                      >
                        View Video
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedVideoIndex !== null && (
            <VideoPlayer
              show={true}
              handleClose={() => setSelectedVideoIndex(null)}
              guide={guideData[selectedVideoIndex]}
            />
          )}
        </div>
    );
}

const VideoPlayer = (props) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <div>
        <Modal
          open={props.show}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.guide.Title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <iframe
                src={props.guide.Link}
                title={props.guide.Title}
                className="w-full h-60"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "none" }}
              ></iframe>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
};