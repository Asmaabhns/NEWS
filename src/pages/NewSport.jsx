import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "./RegionContext";
import CopyLinkButton from "./CopyLinkButton";

function NewSport() {
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
        const filtered = response.data.posts.filter(
          (news) => news.region === region && news.category === "الرياضة"
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
  }, [region, userId]);

  // دالة التعامل مع اللايك
  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const isLiked = prev[postId];
      return {
        ...prev,
        [postId]: !isLiked,
      };
    });

    setSportsNews((prevSportsNews) =>
      prevSportsNews.map((news) => {
        if (news._id === postId) {
          const likesSet = new Set(news.likes || []);
          if (likedPosts[postId]) {
            likesSet.delete(userId);
          } else {
            likesSet.add(userId);
          }
          return {
            ...news,
            likes: Array.from(likesSet),
          };
        }
        return news;
      })
    );

    // لو عندك API لتحديث اللايك في السيرفر، هنا تبعت الطلب مثلاً:
    // instacAxios.post(`/api/news/${postId}/like`, { userId });
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
                      <small className="text-muted">قلم:{news.writer}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className="btn btn-outline-success btn-sm"
                      >
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <button className="text-muted" disabled>
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

export default NewSport;
