import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import HeaderTwo from "../components/HeaderTwo";
import instanceAxios from "../components/Axios/Axios.jsx";

function NewHealth() {
  const [healthPosts, setHealthPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const { data } = await instanceAxios.get("/api/news");

        if (data.success && Array.isArray(data.posts)) {
          // ✅ تصفية الأخبار الصحية حسب category
          const filtered = data.posts.filter(
            (post) => post.category === "الصحة"
          );
          setHealthPosts(filtered);
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب أخبار الصحة:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNews();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      {/* Header */}
      <motion.div>
        <HeaderTwo
          links={[
            { label: "الصفحة الرئيسية", href: "/" },
            { label: "الصحة", href: "#" },
          ]}
        />
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://i.pinimg.com/736x/a9/9e/11/a99e11103a2907ab0117de478cea1692.jpg"
          alt="صورة الصحة"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">أخبار الصحة</h1>
            <p className="fs-5">تابع أحدث المعلومات الطبية والنصائح الصحية</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container py-5">
        <motion.div className="row g-4">
          <motion.div className="col-12 mb-4">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">تصفية الأخبار الصحية</h5>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <p>جاري التحميل...</p>
          ) : healthPosts.length === 0 ? (
            <p>لا توجد أخبار صحية حالياً.</p>
          ) : (
            healthPosts.map((post) => (
              <motion.div key={post._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <img
                    src={post.image || "https://via.placeholder.com/400x250"}
                    className="card-img-top"
                    alt={post.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="text-muted mb-1">بقلم: {post.writer}</p>
                    <p className="card-text">{post.content?.slice(0, 100)}...</p>
                    <a href={`/news/${post._id}`} className="btn btn-primary mt-auto">
                      اقرأ المزيد
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewHealth;
