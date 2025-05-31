// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faThumbsUp, 
//   faShareAlt, 
//   faBell, 
//   faTimes,
//   faClock,
//   faCircleUser,
//   faBookmark
// } from '@fortawesome/free-solid-svg-icons';
// import myImage from "./images/تنزيل.jpg";

// function NewDetails() {
//   const [showSubscription, setShowSubscription] = useState(false);
//   const [likes, setLikes] = useState(245);
//   const [shares, setShares] = useState(87);
//   const [isSaved, setIsSaved] = useState(false);

//   const handleLike = () => {
//     setLikes(likes + 1);
//     setShowSubscription(true);
//   };

//   const handleShare = () => {
//     setShares(shares + 1);
//     setShowSubscription(true);
//   };

//   const handleCloseSubscription = () => {
//     setShowSubscription(false);
//   };

//   const handleSave = () => {
//     setIsSaved(!isSaved);
//   };

//   const relatedNews = [
//     { id: 1, title: "ركام كعمانت كبيرة في غزة بسبب الحرب عليها", image: myImage },
//     { id: 2, title: "زلزال يضرب المنطقة الشمالية", image: myImage },
//     { id: 3, title: "فيضانات تجتاح المناطق الساحلية", image: myImage },
//     { id: 4, title: "تحذيرات من عاصفة رملية قوية", image: myImage },
//   ];

//   const breakingNews = [
//     { id: 1, title: "إنقاذ عائلة من تحت الأنقاض", image: myImage },
//     { id: 2, title: "إعلان حالة الطوارئ في عدة محافظات", image: myImage },
//     { id: 3, title: "توصيات الدفاع المدني للمواطنين", image: myImage },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="container mt-4"
//     >
//       <div className="row">
//         {/* المحتوى الرئيسي */}
//         <motion.div 
//           className="col-lg-8"
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div 
//             className="card border-0 mb-4"
//             whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
//           >
//             <div className="card-header bg-white border-0">
//               <motion.h2 
//                 className="text-right mb-3 fw-bold"
//                 style={{ color: "#4c8565" }}
//               >
//                 عنوان الخبر الرئيسي هنا
//               </motion.h2>
              
//               <motion.div 
//                 className="d-flex justify-content-between align-items-center mb-3"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="d-flex">
//                   <div className="d-flex align-items-center " style={{marginLeft:"30px"}}>
//                     <FontAwesomeIcon icon={faClock} className="me-2 text-muted" style={{marginLeft:"5px"}} />
//                     <small className="text-muted">2023-10-01</small>
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <FontAwesomeIcon icon={faCircleUser} className="me-2 text-muted" style={{marginLeft:"5px"}}/>
//                     <small className="text-muted">أحمد العلي</small>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={handleSave}
//                   className={`btn btn-sm ${isSaved ? 'text-warning' : 'text-muted'}`}
//                 >
//                   <FontAwesomeIcon icon={faBookmark} />
//                 </button>
//               </motion.div>
//             </div>
//             <div style={{width:'100%', height:'5px',backgroundColor: '#167D80',marginBottom:'10px'}}></div>
                
//             <motion.img 
//               src={myImage} 
//               className="card-img-top rounded-0"
//               alt="صورة الخبر"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             />

//             <div className="card-body">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h5 className="card-title mb-4 fw-semibold">تفاصيل الخبر الرئيسية</h5>
//                 <p className="card-text mb-4">
//                   هنا تفاصيل الخبر كاملة، ويمكن للمستخدم معرفة المزيد من المعلومات حول الخبر، 
//                   بما في ذلك تاريخ النشر، اسم الصحفي، وعدد الإعجابات والمشاركات. 
//                   هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
//                 </p>
//                 <p className="card-text">
//                   يمكنك كتابة المزيد من التفاصيل هنا حول الخبر، وشرح الأحداث بالتفصيل، 
//                   مع إضافة أي معلومات إضافية قد تهم القارئ.
//                 </p>
//               </motion.div>

//               <motion.div 
//                 className="d-flex gap-3 mt-4 pt-3 border-top"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.button 
//                   className="btn btn-outline-primary d-flex align-items-center gap-2"
//                   onClick={handleLike}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FontAwesomeIcon icon={faThumbsUp} />
//                   <span>{likes}</span>
//                 </motion.button>
                
//                 <motion.button 
//                   className="btn btn-outline-secondary d-flex align-items-center gap-2"
//                   onClick={handleShare}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FontAwesomeIcon icon={faShareAlt} />
//                   <span>{shares}</span>
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* أخبار ذات صلة */}
//           <motion.div 
//             className="mb-5"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <div className="d-flex align-items-center mb-4">
//               <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
//               <h4 className="mx-3 mb-0 fw-bold" style={{ color: '#4c8565' }}>أخبار ذات صلة</h4>
//               <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
//             </div>

//             <div className="row g-4">
//               {relatedNews.map((news, index) => (
//                 <motion.div 
//                   key={news.id}
//                   className="col-md-6"
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.7 + index * 0.1 }}
//                 >
//                   <motion.div 
//                     className="card h-100 border-0 shadow-sm"
//                     whileHover={{ y: -5 }}
//                   >
//                     <img src={news.image} className="card-img-top" alt={news.title} style={{ height: '180px', objectFit: 'cover' }} />
//                     <div className="card-body">
//                       <h6 className="card-title fw-semibold">{news.title}</h6>
//                       <a href="#" className="text-decoration-none" style={{ color: '#4c8565' }}>المزيد...</a>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* الشريط الجانبي */}
//         <motion.div 
//           className="col-lg-4"
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <motion.div 
//             className="card border-0 shadow-sm mb-4"
//             whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
//           >
//             <div className="card-header bg-white border-0">
//               <div className="d-flex align-items-center">
//                 <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
//                 <h4 className="mx-3 mb-0 fw-bold" style={{ color: '#4c8565' }}>الأخبار العاجلة</h4>
//                 <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
//               </div>
//             </div>

//             <div className="card-body">
//               {breakingNews.map((news, index) => (
//                 <motion.div 
//                   key={news.id}
//                   className="mb-3 pb-3 border-bottom"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8 + index * 0.1 }}
//                 >
//                   <div className="d-flex gap-3">
//                     <img 
//                       src={news.image} 
//                       alt={news.title} 
//                       style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
//                     />
//                     <div>
//                       <h6 className="fw-semibold mb-1">{news.title}</h6>
//                       <small className="text-muted">منذ ساعة</small>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* إشعار الاشتراك */}
//       <AnimatePresence>
//         {showSubscription && (
//           <motion.div
//             className="fixed-bottom mb-4 mx-auto"
//             style={{ maxWidth: '500px', left: 0, right: 0, zIndex: 1000 }}
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 100, opacity: 0 }}
//             transition={{ type: 'spring', damping: 25 }}
//           >
//             <div className="bg-white p-4 rounded shadow-lg position-relative border border-2" style={{ borderColor: '#4c8565' }}>
//               <motion.button 
//                 onClick={handleCloseSubscription}
//                 className="position-absolute top-0 end-0 btn btn-sm"
//                 style={{ color: '#666' }}
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <FontAwesomeIcon icon={faTimes} />
//               </motion.button>
              
//               <div className="d-flex align-items-center mb-3">
//                 <motion.div
//                   animate={{ rotate: [0, 10, -10, 0] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                 >
//                   <FontAwesomeIcon 
//                     icon={faBell} 
//                     className="me-3" 
//                     size="lg"
//                     style={{ color: '#4c8565' }} 
//                   />
//                 </motion.div>
//                 <h5 className="mb-0 fw-semibold" style={{ color: '#4c8565' }}>يجب تسجيل الدخول أولاً!</h5>
//               </div>
              
//               <p className="mb-4">سجل الدخول لتتمكن من الإعجاب ومشاركة الأخبار</p>
              
//               <div className="d-flex justify-content-between"> 
//                 <motion.button 
//                   onClick={handleCloseSubscription}
//                   className="btn btn-outline-secondary px-4"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   إلغاء
//                 </motion.button>
//                 <motion.a 
//                   href="/user-login"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <button 
//                     className="btn px-4"
//                     style={{ backgroundColor: '#4c8565', color: 'white' }}
//                   >
//                     تسجيل الدخول
//                   </button>
//                 </motion.a>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default NewDetails;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "./RegionContext";

function NewsDetails() {
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
          (news) => news.region === region && news.category === "الكوارث"
        );
        setSportsNews(filtered);
                const likesMap = {};
        filtered.forEach((item) => {
          likesMap[item._id] = item.likes?.includes(userId);
        });
        setLikedPosts(likesMap);
      } catch (error) {
        console.error("خطأ في جلب أخبار الخبر:", error);
        setSportsNews([]);
      }
    };

    fetchNews();
  }, [region]);
const handleLike = async (newsId) => {
  try {
    await instacAxios.put(`/api/news/${newsId}/like`, { userId });

    setSportsNews((prevNews) =>
      prevNews.map((item) =>
        item._id === newsId
          ? {
              ...item,
              likes: item.likes?.includes(userId)
                ? item.likes.filter((id) => id !== userId)
                : [...(item.likes || []), userId],
            }
          : item
      )
    );

    setLikedPosts((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  } catch (err) {
    console.error("فشل في تسجيل الإعجاب", err);
  }
};

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
            <h1 className="display-4 fw-bold mb-3">أخبار الرياضة</h1>
            <p className="fs-5">أهم المباريات والتغطيات حسب المنطقة: {region}</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          {sportsNews.length === 0 ? (
            <motion.div className="col-12 text-center" variants={titleVariants}>
              <div className="alert alert-info">
                لا توجد أخبار  للمنطقة <strong>{region}</strong> حالياً.
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
                    <p>jkbjkjkjkjk</p>
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
                      <small className="text-muted">{news.writer}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className="btn btn-outline-success btn-sm"
                      >
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <small className="text-muted">
                        {news.likes?.length || 0} إعجاب
                      </small>
                    </div>
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

export default NewsDetails;
