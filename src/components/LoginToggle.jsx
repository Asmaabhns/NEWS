// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginToggle() {
//   const [isOn, setIsOn] = useState(false); // حالة الزر
//   const navigate = useNavigate(); // لإعادة التوجيه

//   // تحقق من حالة تسجيل الدخول المحفوظة عند التحميل
//   useEffect(() => {
//     const savedState = localStorage.getItem("isLoggedIn");
//     setIsOn(savedState === "true");
//   }, []);

//   const handleLogin = () => {
//     setIsOn(true);
//     localStorage.setItem("isLoggedIn", "true"); // حفظ حالة تسجيل الدخول
//     navigate("/user-login");
//   };

//   const handleLogout = () => {
//     setIsOn(false);
//     localStorage.setItem("isLoggedIn", "false"); // حفظ حالة تسجيل الخروج
//     window.location.href = "/";
//   };

//   const toggleSwitch = () => {

//     isOn ? handleLogout() : handleLogin();
//   };



  


//   return (
// <>
// {
// isLoggedIn ?<div></div>:
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-around",
//         width: 250,
//         height: 50,
//         backgroundColor: "#f0f0f0",
//         borderRadius: 30,
//         position: "relative",
//         padding: 2,
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         marginLeft:'8px',
//       }}
//     >
//       {/* زر تسجيل الدخول */}
//       <button
//         className="btn"
//         onClick={toggleSwitch}
//         style={{
//           zIndex: 1,
//           fontWeight: "bold",
//           color: isOn ? "#fff" : "#000", // النص يصبح أبيض إذا كانت الكرة على تسجيل خروج
//           transition: "color 0.3s ease",
//           outline: "none",
//         }}
//       >
//         تسجيل دخول
//       </button>

//       {/* زر تسجيل الخروج */}
//       <button
//         className="btn"
//         onClick={toggleSwitch}
//         style={{
//           zIndex: 1,
//           fontWeight: "bold",
//           color: !isOn ? "#fff" : "#000", // النص يصبح أبيض إذا كانت الكرة على تسجيل دخول
//           transition: "color 0.3s ease",
//           outline: "none",
//         }}
//       >
//         تسجيل خروج
//       </button>

//       {/* الكرة المتحركة */}
//       <motion.div
//         style={{
//           position: "absolute",
//           top: 2,
//           width: 120,
//           height: 45,
//           backgroundColor: "#0d9488",
//           borderRadius: 25,
//           zIndex: 0,
//         }}
//         layout
//         transition={{
//           type: "spring",
//           stiffness: 500,
//           damping: 30,
//         }}
//         animate={{
//           left: isOn ? 125 : 5, // غيّر الموقع حسب الحالة
//         }}
//       />
//     </div>
// }
// </>
//   );
// }
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // تحميل حالة تسجيل الدخول من localStorage عند التحميل
  useEffect(() => {
    const loginToggle = localStorage.getItem("login");
    if (loginToggle === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/user-login");
  };

  const handleLogout = () => {

     localStorage.clear();
 
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        height: 50,
        backgroundColor: "#f0f0f0",
        borderRadius: 30,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginLeft: "8px",
        padding: 2,
      }}
    >
      {!isLoggedIn ? (
        <motion.button
          className="btn"
          onClick={handleLogin}
          style={{
            fontWeight: "bold",
            color: "#000",
            outline: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          تسجيل دخول
        </motion.button>
      ) : (
        <motion.button
          className="btn"
          onClick={handleLogout}
          style={{
            fontWeight: "bold",
            color: "#000",
            outline: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          تسجيل خروج
        </motion.button>
      )}
    </div>
  );
}
