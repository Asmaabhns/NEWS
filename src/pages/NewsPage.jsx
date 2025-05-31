// import { useState, useEffect } from "react";
// import { useScroll, motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import instacAxios from "../components/Axios/Axios"; // تأكد من المسار
// import BreakingNewsTicker from "./BreakingNewsTicker";
// import ArticlesGrid from "./ArticlesGrid";
// import ProfitSystem from "./ProfitSystem";

// // Animation Configurations
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       when: "beforeChildren",
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 30, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 120,
//     },
//   },
// };

// const hoverVariants = {
//   hover: {
//     scale: 1.02,
//     boxShadow: "0 8px 25px rgba(76, 133, 101, 0.2)",
//     transition: {
//       type: "spring",
//       stiffness: 300,
//     },
//   },
// };

// // Styled Components
// const ScrollProgress = styled(motion.div)`
//   height: 4px;
//   background: #4c8565;
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 9999;
//   transform-origin: 0%;
// `;

// const NewsSectionWrapper = styled(motion.div)`
//   background: #f8fafb;
//   border-radius: 15px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//   margin-bottom: 2.5rem;
//   overflow: hidden;

//   .section-header {
//     padding: 1.2rem 2rem;
//     background: linear-gradient(95deg, #4c856515 0%, transparent 100%);
//     border-bottom: 3px solid #4c8565;

//     a {
//       color: #2d5841 !important;
//       font-size: 1.8rem;
//       font-weight: 700;
//       text-decoration: none !important;
//       transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

//       &:hover {
//         transform: translateX(8px);
//         text-shadow: 0 3px 8px rgba(76, 133, 101, 0.15);
//       }
//     }
//   }
// `;

// const NewsCard = styled(motion.div)`
//   .card {
//     border: none !important;
//     border-radius: 16px !important;
//     overflow: hidden;
//     background-color: #ffffff;
//     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
//     transition: transform 0.3s ease, box-shadow 0.3s ease;
//     display: flex;
//     flex-direction: column;
//     height: 100%;

//     .card-img-container {
//       overflow: hidden;
//       height: 220px;
//       position: relative;

//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.4s ease;
//         border-top-left-radius: 16px;
//         border-top-right-radius: 16px;
//       }

//       &::after {
//         content: "";
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         height: 50%;
//         background: linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent);
//         z-index: 1;
//       }
//     }

//     .card-body {
//       padding: 1.25rem;
//       flex-grow: 1;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;

//       p {
//         font-size: 1.1rem;
//         line-height: 1.6;
//         color: #333;
//         margin-bottom: 1rem;
//         font-weight: 500;
//       }

//       small {
//         font-size: 0.875rem;
//         color: #999;
//         margin-bottom: 0.5rem;
//       }

//       .read-more {
//         align-self: flex-start;
//         color: #4c8565;
//         font-weight: 600;
//         text-decoration: none;
//         font-size: 0.95rem;
//         transition: all 0.3s ease;

//         &:hover {
//           color: #6bcb94;
//           transform: translateX(4px);
//         }
//       }
//     }

//     &:hover {
//       box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

//       .card-img-container img {
//         transform: scale(1.08);
//       }
//     }
//   }
// `;


// const SidebarWrapper = styled(motion.div)`
//   height: calc(100vh - 120px);
//   position: sticky;
//   top: 100px;
//   overflow-y: auto;
//   padding-right: 0.5rem;

//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #4c8565;
//     border-radius: 4px;
//   }

//   .sidebar-card {
//     border-right: 4px solid #4c8565 !important;
//     border-radius: 8px !important;
//     transition: all 0.3s ease;

//     &:hover {
//       transform: translateX(12px);
//       box-shadow: 0 6px 20px rgba(76, 133, 101, 0.15) !important;

//       img {
//         transform: scale(1.1);
//       }
//     }

//     img {
//       height: 100px;
//       object-fit: cover;
//       transition: transform 0.3s ease;
//     }

//     .card-text {
//       font-size: 0.95rem;
//       line-height: 1.5;
//       color: #2d5841;
//     }
//   }
// `;

// const LoadingSpinner = styled.div`
//   text-align: center;
//   padding: 2rem;
//   font-size: 1.2rem;
//   color: #4c8565;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   padding: 2rem;
//   font-size: 1.2rem;
//   color: #ff4444;
// `;

// const NewsPage = () => {
//   const { scrollYProgress } = useScroll();
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // جلب البيانات من API
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         const response = await instacAxios.get("/api/news/");
//         setNews(response.data.posts); // افتراض أن الداتا بترجع كـ array من الأخبار
//         setLoading(false);
       
//       } catch (err) {
//         setError("فشل تحميل الأخبار. حاول مرة أخرى لاحقًا.");
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // فلترة الأخبار حسب الفئات
//   const categories = ["الصحة", "الرياضة", "الطقس", "الكوارث"];
//   const categoryIcons = {
//     الصحة: "🏥",
//     الرياضة: "⚽",
//     الطقس: "⛅",
//     الكوارث: "⚠",
//   };

//   return (
//     <motion.div
//       className="App"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <ScrollProgress style={{ scaleX: scrollYProgress }} />
//       <BreakingNewsTicker />

//       <div className="container-fluid px-lg-5">
//         <div className="row mt-4">
//           {/* Main Content */}
//           <div className="col-lg-8">
//             {loading ? (
//               <LoadingSpinner>جاري تحميل الأخبار...</LoadingSpinner>
//             ) : error ? (
//               <ErrorMessage>{error}</ErrorMessage>
//             ) : (
//  categories.map((category) => {
//   const filteredNews = news.filter((item) => item.category === category);
//   return (
//     filteredNews.length > 0 && (
//       <NewsSectionWrapper
//         key={category}
//         variants={itemVariants}
//         initial="hidden"
//         animate="visible"
//         viewport={{ once: true, margin: "0px 0px -150px 0px" }}
//       >
//         <div className="section-header">
//           <Link to={`/category/${category}`}>
//             {categoryIcons[category]} {category}
//           </Link>
//         </div>

//         <div className="row g-4 p-3">
//           {filteredNews.slice(0, 2).map((item) => (
//             <NewsCard
//               key={item._id}
//               className="col-md-6"
//               variants={hoverVariants}
//               whileHover="hover"
//             >
//               <motion.div
//                 className="card"
//                 whileHover={{
//                   scale: 1.03,
//                   boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 10,
//                 }}
//               >
//                 <div className="card-img-container">
//                   <motion.img
//                     src={item.image}
//                     alt={item.title}
//                     initial={{ scale: 1 }}jkkj
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </div>

//                 <div className="card-body">
//                   <small dir="rtl" className="text-muted text-right d-block mb-1"> الكاتب :  {item.writer}</small>
//                   <p  dir="rtl" className="mb-3 text-right fw-semibold">{item.title}</p>
//                   <p  dir="rtl" className="mb-3 text-right fw-semibold">{item.createaAt}</p>
//                   <Link dir="rtl" to={`/details/${item._id}`} className="read-more ">
//                     اقرأ المزيد →
//                   </Link>
//                 </div>
//               </motion.div>
//             </NewsCard>
//           ))}
//         </div>
//       </NewsSectionWrapper>
//     )
//   );
// })

//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="col-lg-4 mt-lg-0 mt-4">
//             <SidebarWrapper>
//               <motion.div
//                 className="bg-white p-3 rounded-3 shadow-sm"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h3
//                   className="h4 fw-bold text-center mb-4"
//                   style={{ color: "#4c8565" }}
//                 >
//                   📌 آخر الأخبار
//                 </h3>

//                 {loading ? (
//                   <LoadingSpinner>جاري تحميل الأخبار...</LoadingSpinner>
//                 ) : error ? (
//                   <ErrorMessage>{error}</ErrorMessage>
//                 ) : (
//                   news.slice(0, 4).map((item) => (
//                     <motion.div
//                       key={item._id}
//                       className="sidebar-card card mb-3 bg-light"
//                       whileHover={{ scale: 1.02 }}
//                     >
//                       <div className="row g-0">
//                         <div className="col-4">
//                           <img
//                             src={item.image}
//                             className="w-100 h-100"
//                             alt={item.title}
//                           />
//                         </div>
//                         <div className="col-8">
//                           <div className="card-body py-2">
//                             <p className="card-text">{item.title}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))
//                 )}
//               </motion.div>
//             </SidebarWrapper>
//           </div>
//         </div>
//       </div>

//       <ProfitSystem />
//       <ArticlesGrid />
//     </motion.div>
//   );
// };

// export default NewsPage;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "./RegionContext";
import CopyLinkButton from "./CopyLinkButton";

function NewsPage() {
  const [sportsNews, setSportsNews] = useState([]);
  const { region } = useRegion();
  const [likedPosts, setLikedPosts] = useState({});
   const userId = window.localStorage.getItem("id") || "defaultUserId"; 
  const cardVariants = {
    offscreen: { y: 100, opacity: 0, scale: 0.95 },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  useEffect(() => {
    if (!region) return;

    const fetchNews = async () => {
      try {
        const response = await instacAxios.get("/api/news");
        // فلترة حسب المنطقة والفئة
        const filtered = response.data.posts.filter(
          (news) => news.region === region 
        );
        setSportsNews(filtered);
                const likesMap = {};
        filtered.forEach((item) => {
          likesMap[item._id] = item.likes?.includes(userId);
        });
        setLikedPosts(likesMap);
      } catch (error) {
        console.error("خطأ في جلب أخبار الرياضة:", error);
        setSportsNews([]);
      }
    };

    fetchNews();
  }, [region]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      <motion.div variants={titleVariants}>
        <HeaderTwo
          links={[
            { label: "الصفحة الرئيسية", href: "/" },
            { label: "الرياضة", href: "#" },
          ]}
        />
      </motion.div>

      <motion.div
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {sportsNews[0] && (
          <img
            src={sportsNews[0].image}
            alt="خلفية رياضية"
            className="w-100 h-100 object-fit-cover"
            style={{ filter: "brightness(0.7)" }}
          />
        )}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">أخبار </h1>
            <p className="fs-5">أهم التغطيات حسب المنطقة: {region}</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          {sportsNews.length === 0 ? (
            <motion.div className="col-12 text-center" variants={titleVariants}>
              <div className="alert alert-info">
                لا توجد أخبار رياضية للمنطقة <strong>{region}</strong> حالياً.
              </div>
            </motion.div>
          ) : (
         


            sportsNews.map((news) => (
              <motion.div
                key={news._id}
                className="col-md-6 col-lg-4"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    className="position-absolute top-0 end-0 px-3 py-1 text-white"
                    style={{
                      backgroundColor: "#4c8565",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <small>{news.category}</small>
                  </div>

                  <motion.div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                  </motion.div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{news.title}</h5>
                    <p className="card-text text-muted mb-3">
                      {news.content.slice(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/details/${news._id}`}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#4c8565",
                          color: "white",
                        }}
                      >
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">قلم: {news.writer}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className="btn btn-outline-success btn-sm"
                      >
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <button className="text-muted">
                        {news.likes?.length || 0} إعجاب
                      </button>
                    </div>
                      <CopyLinkButton postId={news._id} />
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewsPage;
