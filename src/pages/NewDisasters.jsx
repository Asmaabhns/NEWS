
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import myImage from "./images/تنزيل.jpg";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";

function NewDisasters() {
  // بيانات وهمية للكوارث (يمكن استبدالها ببيانات حقيقية من API)
  const disasters = [
    {
      id: 1,
      title: "إعصار قوي يضرب الساحل الشرقي",
      description: "تحذيرات من ارتفاع منسوب المياه في المناطق الساحلية",
      date: "منذ ساعتين",
      category: "أخبار عاجلة"
    },
    {
      id: 2,
      title: "زلزال بقوة 5.3 درجات يهز المنطقة الشمالية",
      description: "لم ترد أنباء عن إصابات حتى الآن، استمرار عمليات التقييم",
      date: "منذ 5 ساعات",
      category: "أخبار عاجلة"
    },
    // يمكن إضافة المزيد من العناصر هنا...
  ];

  // تأثيرات الحركة للبطاقات
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
      scale: 0.95
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  // تأثيرات للعنوان
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // تأثيرات للخلفية
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"

    >
      {/* Header مع تأثير حركي */}
      <motion.div variants={titleVariants}>
        <HeaderTwo 
          links={[
            { label: 'الصفحة الرئيسية', href: '/' },
            { label: 'الكوارث', href: '#' }
          ]} 

        />
      </motion.div>

      {/* صورة بانر رئيسية */}
      <motion.div 
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={myImage} 
          alt="خلفية أخبار الكوارث" 
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(0.7)" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">أخبار الكوارث</h1>
            <p className="fs-5">آخر التحديثات والتحذيرات حول الكوارث الطبيعية</p>
          </motion.div>
        </div>
      </motion.div>

      {/* محتوى الصفحة الرئيسي */}
      <div className="container py-5">
        <motion.div 
          className="row g-4"
          variants={backgroundVariants}
        >
          {/* بطاقة تصفية الأخبار */}
          <motion.div 
            className="col-12 mb-4"
            variants={titleVariants}
          >
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">تصفية الأخبار</h5>
              
              </div>
            </div>
          </motion.div>

          {/* بطاقات الأخبار */}
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
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
                  boxShadow: "0 15px 30px rgba(0,0,0,0.12)"
                }}
              >
                {/* شريط التصنيف */}
                <div 
                  className="position-absolute top-0 end-0 px-3 py-1 text-white"
                  style={{ 
                    backgroundColor: "#4c8565",
                    borderBottomLeftRadius: "8px"
                  }}
                >
                  <small>أخبار عاجلة</small>
                </div>
                
                {/* صورة الخبر */}
                <motion.div 
                  className="card-img-top overflow-hidden"
                  style={{ height: "200px" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={myImage} 
                    alt="صورة الخبر" 
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </motion.div>
                
                {/* محتوى البطاقة */}
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">
                    شرطة إدارة قوات الدفاع المدني تطلق حملة توعوية
                  </h5>
                  <p className="card-text text-muted mb-3">
                    تفاصيل الحملة التوعوية للحد من مخاطر الكوارث الطبيعية في المناطق السكنية
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link 
                      to="/details" 
                      className="btn btn-sm"
                      style={{ 
                        backgroundColor: "#4c8565",
                        color: "white"
                      }}
                    >
                      اقرأ المزيد
                    </Link>
                    <small className="text-muted">منذ 3 أيام</small>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* زر تحميل المزيد */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="btn btn-lg px-5"
            style={{ 
              backgroundColor: "#4c8565",
              color: "white",
              borderRadius: "50px"
            }}
          >
            تحميل المزيد
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewDisasters;