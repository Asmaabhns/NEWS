import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp, 
  faShareAlt, 
  faBell, 
  faTimes,
  faClock,
  faCircleUser,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import myImage from "./images/تنزيل.jpg";

function NewDetails() {
  const [showSubscription, setShowSubscription] = useState(false);
  const [likes, setLikes] = useState(245);
  const [shares, setShares] = useState(87);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    setShowSubscription(true);
  };

  const handleShare = () => {
    setShares(shares + 1);
    setShowSubscription(true);
  };

  const handleCloseSubscription = () => {
    setShowSubscription(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const relatedNews = [
    { id: 1, title: "ركام كعمانت كبيرة في غزة بسبب الحرب عليها", image: myImage },
    { id: 2, title: "زلزال يضرب المنطقة الشمالية", image: myImage },
    { id: 3, title: "فيضانات تجتاح المناطق الساحلية", image: myImage },
    { id: 4, title: "تحذيرات من عاصفة رملية قوية", image: myImage },
  ];

  const breakingNews = [
    { id: 1, title: "إنقاذ عائلة من تحت الأنقاض", image: myImage },
    { id: 2, title: "إعلان حالة الطوارئ في عدة محافظات", image: myImage },
    { id: 3, title: "توصيات الدفاع المدني للمواطنين", image: myImage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mt-4"
    >
      <div className="row">
        {/* المحتوى الرئيسي */}
        <motion.div 
          className="col-lg-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="card border-0 mb-4"
            whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
          >
            <div className="card-header bg-white border-0">
              <motion.h2 
                className="text-right mb-3 fw-bold"
                style={{ color: "#4c8565" }}
              >
                عنوان الخبر الرئيسي هنا
              </motion.h2>
              
              <motion.div 
                className="d-flex justify-content-between align-items-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="d-flex">
                  <div className="d-flex align-items-center " style={{marginLeft:"30px"}}>
                    <FontAwesomeIcon icon={faClock} className="me-2 text-muted" style={{marginLeft:"5px"}} />
                    <small className="text-muted">2023-10-01</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircleUser} className="me-2 text-muted" style={{marginLeft:"5px"}}/>
                    <small className="text-muted">أحمد العلي</small>
                  </div>
                </div>
                <button 
                  onClick={handleSave}
                  className={`btn btn-sm ${isSaved ? 'text-warning' : 'text-muted'}`}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
              </motion.div>
            </div>
            <div style={{width:'100%', height:'5px',backgroundColor: '#167D80',marginBottom:'10px'}}></div>
                
            <motion.img 
              src={myImage} 
              className="card-img-top rounded-0"
              alt="صورة الخبر"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            <div className="card-body">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h5 className="card-title mb-4 fw-semibold">تفاصيل الخبر الرئيسية</h5>
                <p className="card-text mb-4">
                  هنا تفاصيل الخبر كاملة، ويمكن للمستخدم معرفة المزيد من المعلومات حول الخبر، 
                  بما في ذلك تاريخ النشر، اسم الصحفي، وعدد الإعجابات والمشاركات. 
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
                </p>
                <p className="card-text">
                  يمكنك كتابة المزيد من التفاصيل هنا حول الخبر، وشرح الأحداث بالتفصيل، 
                  مع إضافة أي معلومات إضافية قد تهم القارئ.
                </p>
              </motion.div>

              <motion.div 
                className="d-flex gap-3 mt-4 pt-3 border-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={handleLike}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>{likes}</span>
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                  <span>{shares}</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* أخبار ذات صلة */}
          <motion.div 
            className="mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
              <h4 className="mx-3 mb-0 fw-bold" style={{ color: '#4c8565' }}>أخبار ذات صلة</h4>
              <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
            </div>

            <div className="row g-4">
              {relatedNews.map((news, index) => (
                <motion.div 
                  key={news.id}
                  className="col-md-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.div 
                    className="card h-100 border-0 shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <img src={news.image} className="card-img-top" alt={news.title} style={{ height: '180px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h6 className="card-title fw-semibold">{news.title}</h6>
                      <a href="#" className="text-decoration-none" style={{ color: '#4c8565' }}>المزيد...</a>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* الشريط الجانبي */}
        <motion.div 
          className="col-lg-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="card border-0 shadow-sm mb-4"
            whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
          >
            <div className="card-header bg-white border-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
                <h4 className="mx-3 mb-0 fw-bold" style={{ color: '#4c8565' }}>الأخبار العاجلة</h4>
                <div className="flex-grow-1 border-bottom" style={{ height: '2px', backgroundColor: '#dee2e6' }}></div>
              </div>
            </div>

            <div className="card-body">
              {breakingNews.map((news, index) => (
                <motion.div 
                  key={news.id}
                  className="mb-3 pb-3 border-bottom"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="d-flex gap-3">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                    <div>
                      <h6 className="fw-semibold mb-1">{news.title}</h6>
                      <small className="text-muted">منذ ساعة</small>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* إشعار الاشتراك */}
      <AnimatePresence>
        {showSubscription && (
          <motion.div
            className="fixed-bottom mb-4 mx-auto"
            style={{ maxWidth: '500px', left: 0, right: 0, zIndex: 1000 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="bg-white p-4 rounded shadow-lg position-relative border border-2" style={{ borderColor: '#4c8565' }}>
              <motion.button 
                onClick={handleCloseSubscription}
                className="position-absolute top-0 end-0 btn btn-sm"
                style={{ color: '#666' }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </motion.button>
              
              <div className="d-flex align-items-center mb-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FontAwesomeIcon 
                    icon={faBell} 
                    className="me-3" 
                    size="lg"
                    style={{ color: '#4c8565' }} 
                  />
                </motion.div>
                <h5 className="mb-0 fw-semibold" style={{ color: '#4c8565' }}>يجب تسجيل الدخول أولاً!</h5>
              </div>
              
              <p className="mb-4">سجل الدخول لتتمكن من الإعجاب ومشاركة الأخبار</p>
              
              <div className="d-flex justify-content-between"> 
                <motion.button 
                  onClick={handleCloseSubscription}
                  className="btn btn-outline-secondary px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  إلغاء
                </motion.button>
                <motion.a 
                  href="/user-login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    className="btn px-4"
                    style={{ backgroundColor: '#4c8565', color: 'white' }}
                  >
                    تسجيل الدخول
                  </button>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default NewDetails;