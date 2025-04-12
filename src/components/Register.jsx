// // Register.jsx
// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import Google from "./Google";
// import { useNavigate, Link } from "react-router-dom";

// // PasswordInput Component
// const PasswordInput = ({ value, onChange }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="pswd-input-div">
//       <input
//         type={showPassword ? "text" : "password"}
//         value={value}
//         onChange={onChange}
//         className="form-control"
//         required
//         minLength={8}
//         maxLength={12}
//       />
//       <button onClick={handleTogglePassword} type="button" className="pswdBtn">
//         {showPassword ? (
//           <i className="fa-solid fa-eye"></i>
//         ) : (
//           <i className="fa-sharp fa-solid fa-eye-slash"></i>
//         )}
//       </button>
//     </div>
//   );
// };

// function Register() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         navigate("/login");

//       } catch (error) {
//         alert(error.message);
//       }
//     } else {
//       alert("Passwords do not match!");
//     }
//   };

//   return (
//     <>
//       <section className="reg-form">
//         <div className="bg">
//           <div className="reg-img-div">
//             <div className="reg-phone-frame">
//               <img
//                 src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744458188/profilePlus/ChatGPT_Image_Apr_12_2025_12_36_16_PM_ikol7d.png"
//                 alt="hero page"
//                 className="reg-phone-image"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="reg-form-div">
//           <h3 className="form-div-heading">One profile, Endless possibilities<br/>Sign up now</h3>

//           <form className="form" onSubmit={handleRegister}>
//             <p className="form-group">
//               <label className="form-label">Name:</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="e.g Mercy Williams"
//                 className="form-control"
//                 id="reg-name"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Email:</label>
//               <input
//                 type="email"
//                 placeholder="e.g chi@gmail.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//                 id="reg-email"
//               />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Password:</label>
//               <PasswordInput value={password} onChange={handlePasswordChange} />
//             </p>

//             <p className="form-group">
//               <label className="form-label">Confirm Password:</label>
//               <PasswordInput
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//               />
//             </p>

//             <p className="reg-submit-btn">
//               <button className="btnForm">Submit</button>
//             </p>
//           </form>

//           {/* Google Sign-In Button */}
//           <Google mode="register" />

//           <p className="logsign">
//             Already have an account?
//             <Link to="/login" className="text-deco">
//               Login
//             </Link>
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";

// PasswordInput Component
const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pswd-input-div">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="form-control"
        required
        minLength={8}
        maxLength={12}
      />
      <button onClick={handleTogglePassword} type="button" className="pswdBtn">
        {showPassword ? (
          <i className="fa-solid fa-eye"></i>
        ) : (
          <i className="fa-sharp fa-solid fa-eye-slash"></i>
        )}
      </button>
    </div>
  );
};

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update the user's profile with the name
        await updateProfile(user, {
          displayName: name,
        });

        // After successful registration, navigate to login page
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <>
      <section className="reg-form">
        <div className="bg">
          <div className="reg-img-div">
            <div className="reg-phone-frame">
              <img
                src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744458188/profilePlus/ChatGPT_Image_Apr_12_2025_12_36_16_PM_ikol7d.png"
                alt="hero page"
                className="reg-phone-image"
              />
            </div>
          </div>
        </div>

        <div className="reg-form-div">
          <h3 className="form-div-heading">
            One profile, Endless possibilities
            <br />
            Sign up now
          </h3>

          <form className="form" onSubmit={handleRegister}>
            <p className="form-group">
              <label className="form-label">Name:</label>
              <input
                type="text"
                required
                placeholder="e.g Mercy Williams"
                className="form-control"
                id="reg-name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Set the name value here
              />
            </p>

            <p className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                placeholder="e.g chi@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="reg-email"
              />
            </p>

            <p className="form-group">
              <label className="form-label">Password:</label>
              <PasswordInput value={password} onChange={handlePasswordChange} />
            </p>

            <p className="form-group">
              <label className="form-label">Confirm Password:</label>
              <PasswordInput
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </p>

            <p className="reg-submit-btn">
              <button className="btnForm">Submit</button>
            </p>
          </form>

          {/* Google Sign-In Button */}
          <Google mode="register" />

          <p className="logsign">
            Already have an account?
            <Link to="/login" className="text-deco">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
