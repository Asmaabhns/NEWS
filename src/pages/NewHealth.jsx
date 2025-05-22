import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import instanceAxios from "../components/Axios/Axios";
import HeaderTwo from "../components/HeaderTwo";

function NewHealth() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [
    , setImage] = useState("");

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await instanceAxios.get("/api/news", {
        params: { category: "الصحة" }

      });
       const image= response.posts.image
       setImage(image)
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        setError(response.data.message || "فشل في جلب الأخبار الصحية.");
      }
    } catch (error) {
      console.error("فشل في جلب الأخبار:", error.response?.data || error);
      setError(error.response?.data?.message || "حدث خطأ أثناء جلب الأخبار.");
    } finally {
      setIsLoading(false);
    }
  };

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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

  const handleImageError = (e) => {
    console.warn(`فشل تحميل الصورة: ${e.target.src}`);
    e.target.src = "https://via.placeholder.com/200x200?text=صورة+غير+متوفرة";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      {/* Header */}
      <motion.div variants={titleVariants}>
        <HeaderTwo
          links={[
            { label: "الصفحة الرئيسية", href: "/" },
            { label: "الصحة", href: "#" },
          ]}
        />
      </motion.div>

      {/* Hero banner */}
      <motion.div
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src=""
          alt="صورة الصحة"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(0.7)" }}
          onError={handleImageError}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">أخبار الصحة</h1>
            <p className="fs-5">آخر التحديثات الصحية والمعلومات الطبية المهمة</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          {/* Filter card */}
          <motion.div className="col-12 mb-4" variants={titleVariants}>
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">تصفية الأخبار الصحية</h5>
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          {isLoading ? (
            <div className="text-center col-12">
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              جاري التحميل...
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center col-12">{error}</div>
          ) : posts.length === 0 ? (
            <p className="text-center col-12">لا توجد أخبار صحية متاحة.</p>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post._id}
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
                    <small>صحة</small>
                  </div>

                  <motion.div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={post.image || "https://via.placeholder.com/200x200?text=صورة+غير+متوفرة"}
                      alt={post.title}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      onError={handleImageError}
                    />
                  </motion.div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                    <p className="card-text text-muted mb-3">
                      {post.content.substring(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/details/${post._id}`}
                        className="btn btn-sm"
                        style={{ backgroundColor: "#4c8565", color: "white" }}
                      >
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">
                        {new Date(post.createdAt).toLocaleDateString("ar-EG")}
                      </small>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Load more */}
        {posts.length > 0 && (
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
                borderRadius: "50px",
              }}
            >
              تحميل المزيد
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default NewHealth;