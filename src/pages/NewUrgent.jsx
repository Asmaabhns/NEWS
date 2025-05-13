import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import myImage from "./images/تنزيل.jpg";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";

function NewUrgent() {
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
            { label: "الأخبار العاجلة", href: "#" },
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
        <img
          src={myImage}
          alt="خلفية أخبار عاجلة"
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
            <h1 className="display-4 fw-bold mb-3">الأخبار العاجلة</h1>
            <p className="fs-5">تحديثات فورية لأهم الأحداث الجارية الآن</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          <motion.div className="col-12 mb-4" variants={titleVariants}>
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">تصفية الأخبار</h5>
                
              </div>
            </div>
          </motion.div>

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
                  boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  className="position-absolute top-0 end-0 px-3 py-1 text-white"
                  style={{
                    backgroundColor: "#dc3545",
                    borderBottomLeftRadius: "8px",
                  }}
                >
                  <small>عاجل</small>
                </div>

                <motion.div
                  className="card-img-top overflow-hidden"
                  style={{ height: "200px" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={myImage}
                    alt="صورة عاجلة"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </motion.div>

                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">
                    خبر عاجل: انفجار ضخم في وسط العاصمة
                  </h5>
                  <p className="card-text text-muted mb-3">
                    السلطات تحقق في أسباب الانفجار، ولا تقارير عن إصابات حتى اللحظة.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      to="/details"
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                      }}
                    >
                      اقرأ المزيد
                    </Link>
                    <small className="text-muted">قبل قليل</small>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

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
              backgroundColor: "#dc3545",
              color: "white",
              borderRadius: "50px",
            }}
          >
            تحميل المزيد
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewUrgent;
