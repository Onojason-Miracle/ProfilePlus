// import React from "react";

// function Form() {
//   return (
//     <>
//       <section id="form-wrapper">
//         <div className="bg">
//           <h1>User Data</h1>
//         </div>

//         <div className="form-div">
//           <form className="form" id="userForm">
//             <p className="form-group">
//               <label className="form-label">Name :</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="e.g Mercy Williams"
//                 className="form-control"
//                 id="f-name"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Email :</label>
//               <input
//                 type="email"
//                 placeholder="e.g chi@gmail.com"
//                 className="form-control"
//                 id="email"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Phone Number :</label>
//               <input
//                 type="number"
//                 placeholder="e.g 09123456789"
//                 className="form-control"
//                 id="number"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Display Picture :</label>
//               <input type="file" required className="form-control" id="dp" />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Gender:</label>
//               <div>
//                 <input
//                   type="radio"
//                   id="male"
//                   name="gender"
//                   value="Male"
//                   required
//                 />
//                 <label for="male">Male</label>
//               </div>
//               <div>
//                 <input type="radio" id="female" name="gender" value="Female" />
//                 <label for="female">Female</label>
//               </div>
//             </p>

//             <p className="form-group">
//               <label className="form-label">LinkedIn Profile :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://linkedin.com/in/username"
//                 class="form-control"
//                 id="linkedin"
//               />
//             </p>

//             <p class="form-group">
//               <label class="form-label">Instagram Handle :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://instagram.com/username"
//                 className="form-control"
//                 id="instagram"
//               />
//             </p>

//             <p className="form-group">
//               <label clasName="form-label">Twitter/X Handle :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://x.com/username"
//                 className="form-control"
//                 id="twitter"
//               />
//             </p>

//             <p className="form-group">
//               <label class="form-label">Facebook Profile :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://facebook.com/username"
//                 className="form-control"
//                 id="facebook"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">YouTube Channel :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://youtube.com/c/username"
//                 className="form-control"
//                 id="youtube"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Portfolio/Personal Website :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://portfolio.com"
//                 className="form-control"
//                 id="website"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Tiktok Handle :</label>
//               <input
//                 type="url"
//                 placeholder="e.g https://tiktok.com/username"
//                 className="form-control"
//                 id="tiktok"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Resume :</label>
//               <input
//                 type="url"
//                 placeholder="link to your resume"
//                 className="form-control"
//                 id="resume"
//               />
//               Name
//             </p>

//             <p>
//               <button className="btnForm">Submit</button>
//             </p>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Form;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

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
    dp: null,
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
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
      setFormData({ ...formData, dp: files[0] });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/userdata", { state: formData });
  };

  return (
    <section id="form-wrapper">
      <div className="bg">
        <h1>User Data</h1>
      </div>

      <div className="form-div">
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

