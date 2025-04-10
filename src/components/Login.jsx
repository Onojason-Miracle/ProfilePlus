// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { Link, useNavigate } from "react-router-dom";
// import Google from "./Google";
// import { sendPasswordResetEmail } from "firebase/auth";

// // PasswordInput Component
// const PasswordInput = ({ value, onChange }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const toggleShowPassword = () => {
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
//       <button type="button" onClick={toggleShowPassword} className="pswdBtn">
//         {showPassword ? (
//           <i className="fa-solid fa-eye"></i>
//         ) : (
//           <i className="fa-sharp fa-solid fa-eye-slash"></i>
//         )}
//       </button>
//     </div>
//   );
// };

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Login successful!");
//       // navigate to dashboard or home
//       navigate("/form");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     const emailPrompt = prompt("Enter your email to reset password:");
//     if (!emailPrompt) return;

//     try {
//       await sendPasswordResetEmail(auth, emailPrompt);
//       alert("Password reset link sent! Check your inbox.");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <section className="reg-form">
//       <div className="bg">
//         <div className="reg-img-div">
//           <div className="reg-phone-frame">
//             <img
//               src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744022078/profilePlus/ChatGPT_Image_Apr_7_2025_11_15_49_AM_d4po7a.png"
//               alt="login visual"
//               className="reg-phone-image"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="reg-form-div">
//         <form className="form" onSubmit={handleLogin}>
//           <p className="form-group">
//             <label className="form-label">Email:</label>
//             <input
//               type="email"
//               placeholder="e.g chi@gmail.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="login-email"
//             />
//           </p>

//           <p className="form-group">
//             <label className="form-label">Password:</label>
//             <PasswordInput
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </p>

//           <p className="reg-submit-btn">
//             <button className="btnForm">Login</button>
//           </p>
//         </form>

//         {/* Google Sign-In Button */}
//         <Google mode="login" />

//         <p className="forgot-password">
//           <button
//             type="button"
//             onClick={handleForgotPassword}
//             className="link-btn"
//           >
//             Forgot Password?
//           </button>
//         </p>

//         <p>
//           Don't have an account?{" "}
//           <Link to="/register" className="text-deco">
//             Register
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";


const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="pswd-input-div">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="form-control"
        required
      />
      <button type="button" className="pswdBtn" onClick={togglePassword}>
        {showPassword ? (
          <i className="fa-solid fa-eye"></i>
        ) : (
          <i className="fa-sharp fa-solid fa-eye-slash"></i>
        )}
      </button>
    </div>
  );
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/form");
    } catch (error) {
      if ( error.code === "auth/invalid-credential") {
        setErrorMsg("Incorrect password or email. Please try again! ");
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("There is no existing user record. Please register first.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("Too Many Request Sent!");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

    const handleForgotPassword = async () => {
    const emailPrompt = prompt("Enter your email to reset password:");
    if (!emailPrompt) return;

    try {
      await sendPasswordResetEmail(auth, emailPrompt);
      alert("Password reset link sent! Check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="reg-form">
      <div className="bg">
        <div className="reg-img-div">
          <div className="reg-phone-frame">
            <img
              src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744022078/profilePlus/ChatGPT_Image_Apr_7_2025_11_15_49_AM_d4po7a.png"
              alt="Login visual"
              className="reg-phone-image"
            />
          </div>
        </div>
      </div>

      <div className="reg-form-div">
        <form className="form" onSubmit={handleLogin}>
          <p className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              required
              placeholder="e.g chi@gmail.com"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>

          <p className="form-group">
            <label className="form-label">Password:</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </p>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <p className="reg-submit-btn">
            <button className="btnForm">Login</button>
          </p>
        </form>

        {/* Google Login */}
                  <Google mode="login" />
         <p className="forgot-password">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="link-btn"
          >
            Forgot Password?
          </button>
        </p>

        <p>
          Don't have an account?
          <Link to="/register" className="text-deco">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

