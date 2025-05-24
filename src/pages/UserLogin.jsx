// import instacAxios from '.././components/Axios/Axios';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { motion } from "framer-motion";
// import HeaderTwo from "../components/HeaderTwo";

// const UserLogin = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [userEmail, setUserEmail] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("email");
//     if (savedEmail) {
//       setUserEmail(savedEmail);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!credentials.email.trim()) return setError("البريد الإلكتروني مطلوب"), false;
//     if (!credentials.password.trim()) return setError("كلمة المرور مطلوبة"), false;
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return setError("البريد الإلكتروني غير صالح"), false;
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await instacAxios.post("/api/auth/login", credentials);
//       const { token, success } = response.data;

//       if (success && token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("email", credentials.email);
//         console.log("تم تسجيل الدخول بنجاح", response.data);
//         console.log("تم تسجيل الدخول بنجاح",);
//         setUserEmail(credentials.email);
//         // Only navigate if you want to redirect after success
//         // navigate("/newpassword");
//       } 
//     } catch (err) {
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("حدث خطأ أثناء محاولة تسجيل الدخول");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignupClick = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       navigate("/user-signup");
//     }, 800);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     setUserEmail(null);
//     navigate("/login");
//   };

//   return (
//     <div className="mt-4">
//       <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />

//       <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
//           style={{ maxWidth: "1200px", backgroundColor: "white" }}
//         >
//           {/* واجهة ترحيبية */}
//           <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-center text-white z-3"
//             >
//               <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
//               <p className="fs-4 mb-4">ليس لديك حساب بعد؟</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSignupClick}
//                 className="btn btn-outline-light btn-lg px-5 rounded-pill"
//               >
//                 {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
//               </motion.button>
//             </motion.div>
//             <div className="circle one"></div>
//             <div className="circle two"></div>
//             <div className="circle three"></div>
//           </div>

//           {/* حالة تسجيل الدخول */}
//           <div className="col-lg-6 p-4 p-md-5 bg-white">
//             <div className="h-100 d-flex flex-column justify-content-center">
//               {userEmail ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-center"
//                 >
//                   <h2 className="fw-bold text-dark mb-2">مرحباً بك</h2>
//                   <p className="text-muted mb-4">تم تسجيل الدخول بنجاح</p>
//                   <div className="alert alert-success">البريد الإلكتروني: {userEmail}</div>
//                   <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
//                     تسجيل الخروج
//                   </button>
//                 </motion.div>
//               ) : (
//                 <>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-center mb-4"
//                   >
//                     <h2 className="fw-bold text-dark mb-2">تسجيل الدخول</h2>
//                     <p className="text-muted">أدخل بياناتك للمتابعة</p>
//                   </motion.div>

//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="alert alert-danger text-center"
//                     >
//                       {error}
//                     </motion.div>
//                   )}

//                   <motion.form
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     onSubmit={handleSubmit}
//                   >
//                     <div className="mb-4">
//                       <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني:</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={credentials.email}
//                         onChange={handleChange}
//                         required
//                         placeholder="example@email.com"
//                         className="form-control form-control-lg py-3"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label htmlFor="password" className="form-label fw-semibold">كلمة المرور:</label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={credentials.password}
//                         onChange={handleChange}
//                         required
//                         placeholder="********"
//                         className="form-control form-control-lg py-3"
//                       />
//                     </div>

//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                       <div className="form-check d-flex align-items-center gap-2" dir="rtl">
//                         <input type="checkbox" id="remember" className="form-check-input" />
//                         <label htmlFor="remember" className="form-check-label">تذكرني</label>
//                       </div>
//                       <a href="/email" className="text-decoration-none" style={{ color: "#4c8565" }}>
//                         نسيت كلمة المرور؟
//                       </a>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       className="btn btn-lg w-100 py-3"
//                       disabled={isLoading}
//                       style={{ backgroundColor: "#4c8565", color: "white" }}
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" role="status" />
//                           جاري تسجيل الدخول...
//                         </>
//                       ) : "تسجيل الدخول"}
//                     </motion.button>
//                   </motion.form>

//                   {/* للموبايل */}
//                   <div className="text-center mt-4 d-block d-lg-none">
//                     <p className="mb-2">ليس لديك حساب؟</p>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={handleSignupClick}
//                       className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
//                     >
//                       {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
//                     </motion.button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* CSS داخلي */}
//       <style>{`
//         .login-deco {
//           background: linear-gradient(135deg, #0d9488, #065f53);
//           overflow: hidden;
//         }

//         .circle {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.2;
//           z-index: 1;
//         }

//         .circle.one {
//           width: 150px;
//           height: 150px;
//           top: 20px;
//           left: 20px;
//           background: #ffffff;
//           animation: float 6s ease-in-out infinite;
//         }

//         .circle.two {
//           width: 200px;
//           height: 200px;
//           bottom: 30px;
//           right: 40px;
//           background: #cbd5e1;
//           animation: float 7s ease-in-out infinite reverse;
//         }

//         .circle.three {
//           width: 100px;
//           height: 100px;
//           bottom: 100px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: #ffffff;
//           animation: float 5s ease-in-out infinite alternate;
//         }

//         @keyframes float {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//           100% { transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserLogin;
// import instacAxios from '.././components/Axios/Axios';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { motion } from "framer-motion";
// import HeaderTwo from "../components/HeaderTwo";

// const UserLogin = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userName, setUserName] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedEmail = localStorage.getItem("email");
//     const savedName = localStorage.getItem("name");
//     if (token) {
//       // If user is logged in, redirect to home page
//       navigate("/");
//     } else if (savedEmail) {
//       setUserEmail(savedEmail);
//       setUserName(savedName);
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!credentials.email.trim()) return setError("البريد الإلكتروني مطلوب"), false;
//     if (!credentials.password.trim()) return setError("كلمة المرور مطلوبة"), false;
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return setError("البريد الإلكتروني غير صالح"), false;
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await instacAxios.post("/auth/login", credentials);
//       const { token, success, name } = response.data;

//       if (success && token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("email", credentials.email);
//         if (name) {
//           localStorage.setItem("name", name);
//           setUserName(name);
//         }
//         setUserEmail(credentials.email);
//         // Redirect to home page after login
//         navigate("/");
//       }
//     } catch (err) {
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("حدث خطأ أثناء محاولة تسجيل الدخول");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignupClick = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       navigate("/user-signup");
//     }, 800);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     localStorage.removeItem("name");
//     setUserEmail(null);
//     setUserName(null);
//     navigate("/login");
//   };

//   // If user is logged in, show welcome message and logout button only
//   if (localStorage.getItem("token")) {
//     const email = localStorage.getItem("email");
//     const name = localStorage.getItem("name");
//     return (
//       <div className="mt-4">
//         <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />
//         <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
//             style={{ maxWidth: "600px", backgroundColor: "white" }}
//           >
//             <div className="col-12 p-4 p-md-5 bg-white">
//               <div className="h-100 d-flex flex-column justify-content-center align-items-center">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-center"
//                 >
//                   <h2 className="fw-bold text-dark mb-2">
//                     مرحباً {name ? `السيد ${name}` : "بك"}
//                   </h2>
//                   <div className="alert alert-success mt-3 mb-4">
//                     البريد الإلكتروني: {email}
//                   </div>
//                   <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
//                     تسجيل الخروج
//                   </button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   // Show login form if user is not logged in
//   return (
//     <div className="mt-4">
//       <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />

//       <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
//           style={{ maxWidth: "1200px", backgroundColor: "white" }}
//         >
//           {/* واجهة ترحيبية */}
//           <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-center text-white z-3"
//             >
//               <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
//               <p className="fs-4 mb-4">ليس لديك حساب بعد؟</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSignupClick}
//                 className="btn btn-outline-light btn-lg px-5 rounded-pill"
//               >
//                 {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
//               </motion.button>
//             </motion.div>
//             <div className="circle one"></div>
//             <div className="circle two"></div>
//             <div className="circle three"></div>
//           </div>

//           {/* حالة تسجيل الدخول */}
//           <div className="col-lg-6 p-4 p-md-5 bg-white">
//             <div className="h-100 d-flex flex-column justify-content-center">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-center mb-4"
//               >
//                 <h2 className="fw-bold text-dark mb-2">تسجيل الدخول</h2>
//                 <p className="text-muted">أدخل بياناتك للمتابعة</p>
//               </motion.div>

//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="alert alert-danger text-center"
//                 >
//                   {error}
//                 </motion.div>
//               )}

//               <motion.form
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 onSubmit={handleSubmit}
//               >
//                 <div className="mb-4">
//                   <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني:</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={credentials.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="example@email.com"
//                     className="form-control form-control-lg py-3"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="password" className="form-label fw-semibold">كلمة المرور:</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="********"
//                     className="form-control form-control-lg py-3"
//                   />
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div className="form-check d-flex align-items-center gap-2" dir="rtl">
//                     <input type="checkbox" id="remember" className="form-check-input" />
//                     <label htmlFor="remember" className="form-check-label">تذكرني</label>
//                   </div>
//                   <a href="/email" className="text-decoration-none" style={{ color: "#4c8565" }}>
//                     نسيت كلمة المرور؟
//                   </a>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   className="btn btn-lg w-100 py-3"
//                   disabled={isLoading}
//                   style={{ backgroundColor: "#4c8565", color: "white" }}
//                 >
//                   {isLoading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" />
//                       جاري تسجيل الدخول...
//                     </>
//                   ) : "تسجيل الدخول"}
//                 </motion.button>
//               </motion.form>

//               {/* للموبايل */}
//               <div className="text-center mt-4 d-block d-lg-none">
//                 <p className="mb-2">ليس لديك حساب؟</p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSignupClick}
//                   className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
//                 >
//                   {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* CSS داخلي */}
//       <style>{`
//         .login-deco {
//           background: linear-gradient(135deg, #0d9488, #065f53);
//           overflow: hidden;
//         }

//         .circle {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.2;
//           z-index: 1;
//         }

//         .circle.one {
//           width: 150px;
//           height: 150px;
//           top: 20px;
//           left: 20px;
//           background: #ffffff;
//           animation: float 6s ease-in-out infinite;
//         }

//         .circle.two {
//           width: 200px;
//           height: 200px;
//           bottom: 30px;
//           right: 40px;
//           background: #cbd5e1;
//           animation: float 7s ease-in-out infinite reverse;
//         }

//         .circle.three {
//           width: 100px;
//           height: 100px;
//           bottom: 100px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: #ffffff;
//           animation: float 5s ease-in-out infinite alternate;
//         }

//         @keyframes float {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//           100% { transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserLogin;
import instacAxios from '.././components/Axios/Axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from "framer-motion";
import HeaderTwo from "../components/HeaderTwo";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store user's name
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name"); // Retrieve name from local storage

    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };


  //   if (!credentials.email.trim()) return setError("البريد الإلكتروني مطلوب"), false;
  //   if (!credentials.password.trim()) return setError("كلمة المرور مطلوبة"), false;
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return setError("البريد الإلكتروني غير صالح"), false;
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");


    try {
      const response = await instacAxios.post("/api/auth/login", credentials);
      const { accessToken, success } = response.data; // Assuming the backend returns the user's name
      console.log(response.data);
   
      if (success && accessToken) {
  window.localStorage.setItem("token", accessToken);
  window.localStorage.setItem("email", credentials.email);
  setUserEmail(credentials.email);
  setSuccess(true);
  console.log("تم تسجيل الدخول بنجاح", setSuccess);
  // navigate("/"); // or you can delay navigation if you want to show success UI
}

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ أثناء محاولة تسجيل الدخول");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/user-signup");
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name"); // Remove the name from local storage
    setUserEmail(null);
    setUserName(null); // Clear the name from the state
    navigate("/login");
  };

  return (
    <div>
      <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />

      {success?<div>
        <p>`welcome ${userEmail}`</p>
        <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
          تسجيل الخروج
        </button>
      </div>:      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
          style={{ maxWidth: "1200px", backgroundColor: "white" }}
        >
          {/* واجهة ترحيبية */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white z-3"
            >
              <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
              <p className="fs-4 mb-4">ليس لديك حساب بعد؟</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignupClick}
                className="btn btn-outline-light btn-lg px-5 rounded-pill"
              >
                {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
              </motion.button>
            </motion.div>
            <div className="circle one"></div>
            <div className="circle two"></div>
            <div className="circle three"></div>
          </div>

          {/* حالة تسجيل الدخول */}
          <div className="col-lg-6 p-4 p-md-5 bg-white">
            <div className="h-100 d-flex flex-column justify-content-center">
              {userEmail ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h2 className="fw-bold text-dark mb-2">مرحباً بك, {userName ? `Mr. ${userName}` : 'مستخدم'}</h2>
                  <p className="text-muted mb-4">تم تسجيل الدخول بنجاح</p>
                  <div className="alert alert-success">البريد الإلكتروني: {userEmail}</div>
                  <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
                    تسجيل الخروج
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-4"
                  >
                    <h2 className="fw-bold text-dark mb-2">تسجيل الدخول</h2>
                    <p className="text-muted">أدخل بياناتك للمتابعة</p>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="alert alert-danger text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="form-control form-control-lg py-3"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold">كلمة المرور:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="********"
                        className="form-control form-control-lg py-3"
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check d-flex align-items-center gap-2" dir="rtl">
                        <input type="checkbox" id="remember" className="form-check-input" />
                        <label htmlFor="remember" className="form-check-label">تذكرني</label>
                      </div>
                      <a href="/email" className="text-decoration-none" style={{ color: "#4c8565" }}>
                        نسيت كلمة المرور؟
                      </a>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn btn-lg w-100 py-3"
                      disabled={isLoading}
                      style={{ backgroundColor: "#4c8565", color: "white" }}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          جاري تسجيل الدخول...
                        </>
                      ) : "تسجيل الدخول"}
                    </motion.button>
                  </motion.form>

                  {/* للموبايل */}
                  <div className="text-center mt-4 d-block d-lg-none">
                    <p className="mb-2">ليس لديك حساب؟</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSignupClick}
                      className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
                    >
                      {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
}
      <style>{`
        .login-deco {
          background: linear-gradient(135deg, #0d9488, #065f53);
          overflow: hidden;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          z-index: 1;
        }

        .circle.one {
          width: 150px;
          height: 150px;
          top: 20px;
          left: 20px;
          background: #ffffff;
          animation: float 6s ease-in-out infinite;
        }

        .circle.two {
          width: 200px;
          height: 200px;
          bottom: 30px;
          right: 40px;
          background: #cbd5e1;
          animation: float 7s ease-in-out infinite reverse;
        }

        .circle.three {
          width: 100px;
          height: 100px;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          animation: float 5s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;