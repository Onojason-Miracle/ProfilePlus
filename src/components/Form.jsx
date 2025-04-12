// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, storage, db } from "../firebase";  // Import your firebase config
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";

// function Form() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     gender: "",
//     linkedin: "",
//     instagram: "",
//     twitter: "",
//     facebook: "",
//     youtube: "",
//     website: "",
//     tiktok: "",
//     resume: "",
//     dp: null,
//     bio: "", // Added Bio field
//   });

//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUser(currentUser);
//       setFormData((prev) => ({
//         ...prev,
//         name: currentUser.displayName || "",
//         email: currentUser.email,
//       }));
//     } else {
//       // Not logged in? Redirect to login
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { id, value, type, files, name } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, dp: files[0] });
//     } else if (type === "radio") {
//       setFormData({ ...formData, [name]: value });
//     } else {
//       setFormData({ ...formData, [id]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form from submitting automatically

//     // Check if display picture is provided
//     if (!formData.dp) {
//       alert("Please upload a display picture.");
//       return;
//     }

//     try {
//       // 1. Upload the display picture to Firebase Storage
//       const dpRef = ref(storage, `profile_pictures/${formData.dp.name}`);
//       const uploadTask = uploadBytesResumable(dpRef, formData.dp);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Optional: handle upload progress here
//         },
//         (error) => {
//           console.error("Error uploading file", error);
//           alert("Failed to upload display picture.");
//         },
//         async () => {
//           // 2. Get the download URL of the uploaded image
//           const dpUrl = await getDownloadURL(uploadTask.snapshot.ref);

//           // 3. Prepare the data to be saved in Firestore
//           const userDocRef = doc(db, "users", user.uid);  // Use user's UID for document ID
//           const userData = {
//             name: formData.name,
//             email: formData.email,
//             number: formData.number,
//             gender: formData.gender,
//             linkedin: formData.linkedin,
//             instagram: formData.instagram,
//             twitter: formData.twitter,
//             facebook: formData.facebook,
//             youtube: formData.youtube,
//             website: formData.website,
//             tiktok: formData.tiktok,
//             resume: formData.resume,
//             dpUrl: dpUrl,  // Store the display picture URL
//             bio: formData.bio, // Bio data
//           };

//           // 4. Save the data to Firestore
//           await setDoc(userDocRef, userData);

//           // 5. After saving, navigate to the userdata page
//           navigate("/userdata", { state: formData });
//         }
//       );
//     } catch (error) {
//       console.error("Error saving form data:", error);
//       alert("An error occurred while saving your data.");
//     }
//   };

//   return (
//     <section id="form-wrapper">
//       <div className="bg">
//         <div className="reg-img-div">
//           <div className="reg-phone-frame">
//             <img
//               src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744458192/profilePlus/ChatGPT_Image_Apr_12_2025_12_41_36_PM_uprgfd.png"
//               alt="Login visual"
//               className="reg-phone-image"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="form-div">
//         <div className="form-div-heading">
//           <h1>Create Your Digital Identity</h1>
//           <p>Bring all your online links together in one profile</p>
//         </div>

//         <form className="form" onSubmit={handleSubmit}>
//           <p className="form-group">
//             <label className="form-label">Name :</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               value={formData.name}
//               readOnly
//             />
//           </p>

//           <p className="form-group">
//             <label className="form-label">Email :</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={formData.email}
//               readOnly
//             />
//           </p>

//           <p className="form-group">
//             <label className="form-label">Phone Number :</label>
//             <input
//               type="number"
//               className="form-control"
//               id="number"
//               onChange={handleChange}
//             />
//           </p>

//           <p className="form-group">
//             <label className="form-label">Display Picture :</label>
//             <input
//               type="file"
//               required
//               className="form-control"
//               id="dp"
//               onChange={handleChange}
//             />
//           </p>

//           <p className="form-group">
//             <label className="form-label">Gender:</label>
//             <div>
//               <input
//                 type="radio"
//                 id="male"
//                 name="gender"
//                 value="Male"
//                 required
//                 onChange={handleChange}
//               />
//               <label htmlFor="male">Male</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="female"
//                 name="gender"
//                 value="Female"
//                 onChange={handleChange}
//               />
//               <label htmlFor="female">Female</label>
//             </div>
//           </p>

//           <p className="form-group">
//             <label className="form-label">Bio</label>
//             <textarea
//               className="form-control"
//               required
//               minLength={15}
//               maxLength={250}
//               id="bio"
//               value={formData.bio}
//               onChange={handleChange}
//             />
//           </p>

//           {[
//             "linkedin", "instagram", "twitter", "facebook", "youtube", "website", "tiktok", "resume"
//           ].map((field) => (
//             <p className="form-group" key={field}>
//               <label className="form-label">
//                 {field.charAt(0).toUpperCase() + field.slice(1)}:
//               </label>
//               <input
//                 type="url"
//                 placeholder={`e.g https://${field}.com/username`}
//                 className="form-control"
//                 id={field}
//                 onChange={handleChange}
//               />
//             </p>
//           ))}

//           <p>
//             <button type="submit" className="btnForm">
//               Submit
//             </button>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default Form;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import your firebase config
import { doc, setDoc } from "firebase/firestore";

function Form() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    gender: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
    website: "",
    tiktok: "",
    resume: "",
    dp: null, // This will still be stored locally
    bio: "", // Added Bio field
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData((prev) => ({
        ...prev,
        name: currentUser.displayName || "",
        email: currentUser.email,
      }));
    } else {
      // Not logged in? Redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value, type, files, name } = e.target;
    if (type === "file") {
      // When an image is selected, convert it to base64 and store in localStorage
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result); // Save image to localStorage
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, dp: file });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting automatically

    // Check if display picture is uploaded
    if (!formData.dp) {
      alert("Please upload a display picture.");
      return;
    }

    try {
      // Prepare the data to be saved in Firestore
      const userDocRef = doc(db, "users", user.uid); // Use user's UID for document ID
      const userData = {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        gender: formData.gender,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        twitter: formData.twitter,
        facebook: formData.facebook,
        youtube: formData.youtube,
        website: formData.website,
        tiktok: formData.tiktok,
        resume: formData.resume,
        bio: formData.bio, // Bio data
      };

      // Save the data to Firestore
      await setDoc(userDocRef, userData);

      // After saving, navigate to the userdata page
      navigate("/userdata", {
        state: { ...formData, dpUrl: localStorage.getItem("profileImage") },
      });
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("An error occurred while saving your data.");
    }
  };

  return (
    <section id="form-wrapper">
      <div className="bg">
        <div className="reg-img-div">
          <div className="reg-phone-frame">
            <img
              src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744458192/profilePlus/ChatGPT_Image_Apr_12_2025_12_41_36_PM_uprgfd.png"
              alt="Login visual"
              className="reg-phone-image"
            />
          </div>
        </div>
      </div>

      <div className="form-div">
        <div className="form-div-heading">
          <h1>Create Your Digital Identity</h1>
          <p>Bring all your online links together in one profile</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <p className="form-group">
            <label className="form-label">Name :</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              readOnly
            />
          </p>

          <p className="form-group">
            <label className="form-label">Email :</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              readOnly
            />
          </p>

          <p className="form-group">
            <label className="form-label">Phone Number :</label>
            <input
              type="number"
              className="form-control"
              id="number"
              onChange={handleChange}
            />
          </p>

          <p className="form-group">
            <label className="form-label">Display Picture :</label>
            <input
              type="file"
              required
              className="form-control"
              id="dp"
              onChange={handleChange}
            />
          </p>

          <p className="form-group">
            <label className="form-label">Gender:</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                required
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </p>

          <p className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              required
              minLength={15}
              maxLength={150}
              id="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </p>

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
            <p className="form-group" key={field}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="url"
                placeholder={`e.g https://${field}.com/username`}
                className="form-control"
                id={field}
                onChange={handleChange}
              />
            </p>
          ))}

          <p>
            <button type="submit" className="btnForm">
              Submit
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Form;
