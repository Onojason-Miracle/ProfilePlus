// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// function UserData() {
//   const [formData, setFormData] = useState(null);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user) return;
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setFormData(docSnap.data());
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   if (!formData) return <p>No data found. Please fill out the form first.</p>;

//   return (
//     <div id="displayData">
//       <p className="pimg">
//         <img src={formData.dpUrl} alt="Display Pix" className="img" />
//       </p>
//       <h2 className="white">{formData.name}</h2>
//       <p className="white"><strong>ID:</strong> {user.uid}</p>

//       <div className="edit-share-div">
//         <p><button onClick={() => navigate("/form")} id="editBtn">Edit Profile</button></p>
//         <p><button id="shareBtn">Share Profile</button></p>
//       </div>

//       <p className="ptag"><a href={`mailto:${formData.email}`} className="data-a"><i className="fa-solid fa-envelope"></i> <strong>Email</strong></a></p>
//       <p className="ptag"><a href={`tel:${formData.number}`} className="data-a"><i className="fa-solid fa-phone"></i> <strong>Number</strong></a></p>
//       <div className="ptag mb-3"><p className="gender"><i className="fa-solid fa-user"></i> <strong>{formData.gender}</strong></p></div>

//       {/* Socials */}
//       {["linkedin", "instagram", "twitter", "facebook", "youtube", "website", "tiktok", "resume"].map((field) => (
//         <p className="ptag" key={field}>
//           <a href={formData[field]} target="_blank" rel="noreferrer" className="data-a">
//             <i className={`fa-brands fa-${field === "twitter" ? "square-x-twitter" : field}`}></i>
//             <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
//           </a>
//         </p>
//       ))}
//     </div>
//   );
// }

// export default UserData;

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function UserData() {
  const [formData, setFormData] = useState(null);
  const [dpUrl, setDpUrl] = useState(null); // To store the display picture URL
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }

      // Fetch display picture from localStorage
      const storedDp = localStorage.getItem("profileImage");
      if (storedDp) {
        setDpUrl(storedDp); // Set the DP URL from localStorage
      }
    };

    fetchUserData();
  }, [user]);

  if (!formData) return <p>No data found. Please fill out the form first.</p>;

  return (
    <section className="formDataWrapper">
      <div id="displayData">
        {/* Check if dpUrl exists before rendering the image */}
        <p className="pimg">
          {dpUrl ? (
            <img src={dpUrl} alt="Display Pix" className="img" />
          ) : (
            <p>No display picture available.</p>
          )}
        </p>
        <h2 className="white">{formData.name}</h2>
        <div className="bioDiv">
          <p className="biooo"> {formData.bio}</p>
        </div>

        <div className="edit-share-div">
          <p>
            <button onClick={() => navigate("/form")} id="editBtn">
              Edit Profile
            </button>
          </p>
          <p>
            <button id="shareBtn">Share Profile</button>
          </p>
        </div>

        <p className="ptag">
          <a href={`mailto:${formData.email}`} className="data-a">
            <i className="fa-solid fa-envelope"></i> <strong>Email</strong>
          </a>
        </p>
        <p className="ptag">
          <a href={`tel:${formData.number}`} className="data-a">
            <i className="fa-solid fa-phone"></i> <strong>Number</strong>
          </a>
        </p>
        <div className="ptag mb-3">
          <p className="gender">
            <i className="fa-solid fa-user"></i>{" "}
            <strong>{formData.gender}</strong>
          </p>
        </div>

        {/* Socials */}
        {[
          "linkedin",
          "instagram",
          "twitter",
          "facebook",
          "youtube",
          "website",
          "tiktok",
          "resume",
        ].map((field) => (
          <p className="ptag" key={field}>
            <a
              href={formData[field]}
              target="_blank"
              rel="noreferrer"
              className="data-a"
            >
              <i
                className={`fa-brands fa-${
                  field === "twitter" ? "square-x-twitter" : field
                }`}
              ></i>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
            </a>
          </p>
        ))}
      </div>
    </section>
  );
}

export default UserData;
