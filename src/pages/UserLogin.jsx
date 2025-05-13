// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { motion } from "framer-motion";
// import '../style.css';
// // import journalistImage from './images/bowl.jpeg';
// import journalistImage from './images/world.jpg';
// import HeaderTwo from "../components/HeaderTwo";


// const UserLogin = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
//         navigate('/');
//       } else {
//         setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
//       }
//     } catch (err) {
//       setError('حدث خطأ أثناء محاولة تسجيل الدخول');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <div className='container mt-4 mb-4'>
//       <HeaderTwo links={[
//         { label: 'الصفحة الرئيسية', href: '/' },
//         { label: 'تسجيل دخول', href: '#' }
//       ]} />
      
//       <motion.div 
//         className="login-container"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         <div className="login-content">
         
//           {/* Login Card */} 
//            <motion.div 
//             className="login-card"
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//           >
//             <div className="login-header">
//               <motion.h2 
//                 className="login-title" style={{color:'#0d9488'}}
//                 whileHover={{ x: 5 }}
//               >
//                 تسجيل دخول للمستخدمين
//               </motion.h2>
//               <p className="login-subtitle" style={{color:'#fff'}}>الرجاء إدخال البيانات الخاصة بك</p>
//             </div>

//             {error && (
//               <motion.div 
//                 className="error-message"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.9 }}
//               >
//                 {error}
//               </motion.div>
//             )}

//             <form onSubmit={handleSubmit} className="login-form">
//               <motion.div 
//                 className="form-group"
//                 variants={itemVariants}
//               >
//                 <label htmlFor="email">البريد الإلكتروني:</label>
//                 <motion.input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={credentials.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="أدخل بريدك الإلكتروني"
//                   whileFocus={{ 
//                     borderColor: '#0d9488',
//                     boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.2)'
//                   }}
//                 />
//               </motion.div>

//               <motion.div 
//                 className="form-group"
//                 variants={itemVariants}
//               >
//                 <label htmlFor="password">كلمة المرور:</label>
//                 <motion.input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="أدخل كلمة المرور"
//                   whileFocus={{ 
//                     borderColor: '#0d9488',
//                     boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.2)'
//                   }}
//                 />
//               </motion.div>

//               <motion.div 
//                 className="form-options"
//                 variants={itemVariants}
//               >
//                 <div className="remember-me">
//                   <input type="checkbox" id="remember" />
//                   <label htmlFor="remember">تذكرني</label>
//                 </div>
//                 <a href="/forgot-password" className="forgot-password">
//                   نسيت كلمة المرور؟
//                 </a>
//               </motion.div>

//               <motion.button 
//                 type="submit" 
//                 className="login-button"
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 variants={itemVariants}
//               >
//                 {isLoading ? (
//                   <span className="spinner"></span>
//                 ) : 'تسجيل الدخول'}
//               </motion.button>
//             </form>

//             <motion.div 
//               className="login-footer"
//               variants={itemVariants}
//             >
//               <p>
//                 ليس لديك حساب؟ <a href="/user-signup" className="signup-link">سجل الآن</a>
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Background Image */}
//         <div className="login-background">
//             {/* Logo/Brand
//             <motion.div 
//             className="brand-logo"
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//           >
//             <h2>
//               لمحة<span style={{color:'#0d9488'}}> NEWS</span>
//             </h2>
//           </motion.div> */}
//         </div>
//       </motion.div> 
      

//       <style jsx>{`
//         .container {
//           max-width: 1200px;
//           // padding: 0 15px;
//           //  background-color: rgba(0, 0, 0, 0.5);
//             // backgroundColor:#eaeaea;
//         }
        
//         .login-container {
//           display: flex;
//           min-height: 70vh;
//           border-radius: 15px;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//           position: relative;
//           // background-color:#eaeaea;
//          background: url(${journalistImage}) no-repeat center;
//          background-size: cover; /* لجعل الصورة تغطي العنصر بالكامل */

//         //  background: linear-gradient(to right, #0b8377, #5ec4af);
//           border-radius:30px;
//           // position:relative;
//         }
// //         .login-container::before {
// //         content: "";
// //         width: 50%;
// //   height: 200px;

// //   background: #000;
// //   border-top-right-radius: 50px;
// //   border-bottom-right-radius: 50px;
// //   position: absolute;
// //   left: -40px;
// //   top: 45%;
// //   transform:rotate(50deg);
// // }
//         .login-content {
//           flex: 1;
//           // padding: 40px;
//           // background: white;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           z-index: 2;
//           margin: 0 auto;
//           // background-color:#eaeaea;
//         //            border-top-left-radius: 1rem;   /* الزاوية العلوية اليسرى */
//         //  border-top-right-radius: 1rem;  /* الزاوية العلوية اليمنى */
//         //  border-bottom-right-radius: 1rem; /* الزاوية السفلية اليمنى */
//         //  border-bottom-left-radius: 20rem;
//         }

//         .brand-logo {
//           text-align: center;
//           margin-bottom: 30px;
//           font-size: 2rem;
//           font-weight: bold;
//           color: #333;
//         }
        
//         .login-card {
//           max-width: 450px;
//           padding:10px;
//           margin: 15px auto;
//           width: 100%;
//           margin-top:40px;
//         //   // border: 4px solid  #0b8377;
//         //  border-top-left-radius: 1rem;   /* الزاوية العلوية اليسرى */
//         //  border-top-right-radius: 1rem;  /* الزاوية العلوية اليمنى */
//         //  border-bottom-right-radius: 1rem; /* الزاوية السفلية اليمنى */
//         //  border-bottom-left-radius: 20rem;
//         background-color: rgba(0, 0, 0, 0.2);
//         color:#fff;
//         }
        
//         .login-header {
//           text-align: right;
//           margin-bottom: 30px;
//           margin-right:10px;
//           // color:rgb(3, 16, 16);
//         }
        
//         .login-title {
//           color: rgb(251, 248, 248)
//           font-size: 1.8rem;
//           margin-bottom: 10px;
//           font-weight: 700;
//         }
        
//         .login-subtitle {
//           color:#fff;
//           font-size: 1rem;
//         }
        
//         .login-form {
//           display: flex;
//           flex-direction: column;
//         }
        
//         .form-group {
//           margin-bottom: 25px;
          
//         }
        
//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           color:rgb(247, 247, 248);
//           font-weight: 500;
//           font-size: 0.95rem;
//           text-align: right;
//         }
        
//         .form-group input {
//           width: 100%;
//           padding: 14px 16px;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           font-size: 1rem;
//           transition: all 0.3s;
//           background: #f8fafc;
//           text-align: right;
//         }
        
//         .form-group input:focus {
//           outline: none;
//           background: white;
//         }
        
//         .form-options {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 25px;
//         }
        
//         .remember-me {
//           display: flex;
//           align-items: center;
//         }
        
//         .remember-me input {
//           margin-left: 8px;
//         }
        
//         .remember-me label {
//           color:rgb(249, 249, 250);
//           font-size: 0.9rem;
//         }
        
//         .forgot-password {
//           color:rgb(247, 248, 248);
//           text-decoration: none;
//           font-size: 0.9rem;
//           font-weight: 500;
//           transition: color 0.3s;
//         }
        
//         .forgot-password:hover {
//           color: #0b8377;
//           text-decoration: underline;
//         }
        
//         .login-button {
//           background-color: #0d9488;
//           color: white;
//           padding: 15px;
//           border: none;
//           border-radius: 8px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .login-button:hover {
//           background-color: #0b8377;
//         }
        
//         .login-button:disabled {
//           background-color: #a0aec0;
//           cursor: not-allowed;
//         }
        
//         .spinner {
//           display: inline-block;
//           width: 20px;
//           height: 20px;
//           border: 3px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 1s ease-in-out infinite;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         .login-footer {
//           text-align: center;
//           margin-top: 20px;
//         }
        
//         .login-footer p {
//           color: #718096;
//           font-size: 0.95rem;
//         }
        
//         .signup-link {
//           color: #0d9488;
//           text-decoration: none;
//           font-weight: 600;
//           transition: color 0.3s;
//         }
        
//         .signup-link:hover {
//           color: #0b8377;
//           text-decoration: underline;
//         }
        
//         .error-message {
//           color: #e53e3e;
//           background-color: #fff5f5;
//           padding: 12px 16px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           text-align: center;
//           border: 1px solid #fed7d7;
//           font-size: 0.9rem;
//         }

 
//         @media (max-width: 768px) {
//           .login-container {
//             flex-direction: column;
//           }
          
//           .login-content {
//             padding: 30px 20px;
//           }
          
//           .login-background {
//             height: 200px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserLogin;
import React, { useState } from "react";
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!credentials.email.trim()) return setError("البريد الإلكتروني مطلوب"), false;
    if (!credentials.password.trim()) return setError("كلمة المرور مطلوبة"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return setError("البريد الإلكتروني غير صالح"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (credentials.email && credentials.password) {
        navigate("/");
      }
       else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
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

  return (
    <div className="mt-4">
      <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />

      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
          style={{ maxWidth: "1200px", backgroundColor: "white" }}
        >

          {/* واجهة ترحيبية محسنة */}
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

            {/* دوائر مزخرفة */}
            <div className="circle one"></div>
            <div className="circle two"></div>
            <div className="circle three"></div>
          </div>

          {/* فورم الدخول */}
          <div className="col-lg-6 p-4 p-md-5 bg-white">
            <div className="h-100 d-flex flex-column justify-content-center">
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
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS داخلي للزينة */}
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
