import React, { useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import instacAxios from "../components/Axios/Axios"; // تأكد من المسار
import BreakingNewsTicker from "./BreakingNewsTicker";
import ArticlesGrid from "./ArticlesGrid";
import ProfitSystem from "./ProfitSystem";

// Animation Configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(76, 133, 101, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

// Styled Components
const ScrollProgress = styled(motion.div)`
  height: 4px;
  background: #4c8565;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  transform-origin: 0%;
`;

const NewsSectionWrapper = styled(motion.div)`
  background: #f8fafb;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2.5rem;
  overflow: hidden;

  .section-header {
    padding: 1.2rem 2rem;
    background: linear-gradient(95deg, #4c856515 0%, transparent 100%);
    border-bottom: 3px solid #4c8565;

    a {
      color: #2d5841 !important;
      font-size: 1.8rem;
      font-weight: 700;
      text-decoration: none !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateX(8px);
        text-shadow: 0 3px 8px rgba(76, 133, 101, 0.15);
      }
    }
  }
`;

const NewsCard = styled(motion.div)`
  .card {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;

    .card-img-container {
      overflow: hidden;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    .card-body {
      padding: 1.25rem;
      background: white;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 1.05rem;
        line-height: 1.5;
        color: #333;
        margin-bottom: 1rem;
      }

      .read-more {
        color: #4c8565;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;

        &:hover {
          color: #6bcb94;
          transform: translateX(5px);
        }
      }
    }

    &:hover {
      .card-img-container img {
        transform: scale(1.1);
      }
    }
  }
`;

const SidebarWrapper = styled(motion.div)`
  height: calc(100vh - 120px);
  position: sticky;
  top: 100px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4c8565;
    border-radius: 4px;
  }

  .sidebar-card {
    border-right: 4px solid #4c8565 !important;
    border-radius: 8px !important;
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(12px);
      box-shadow: 0 6px 20px rgba(76, 133, 101, 0.15) !important;

      img {
        transform: scale(1.1);
      }
    }

    img {
      height: 100px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .card-text {
      font-size: 0.95rem;
      line-height: 1.5;
      color: #2d5841;
    }
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #4c8565;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #ff4444;
`;

const NewsPage = () => {
  const { scrollYProgress } = useScroll();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await instacAxios.get("/api/news/");
        setNews(response.data); // افتراض أن الداتا بترجع كـ array من الأخبار
        setLoading(false);
      } catch (err) {
        setError("فشل تحميل الأخبار. حاول مرة أخرى لاحقًا.");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // فلترة الأخبار حسب الفئات
  const categories = ["الصحة", "الرياضة", "الطقس", "الكوارث"];
  const categoryIcons = {
    الصحة: "🏥",
    الرياضة: "⚽",
    الطقس: "⛅",
    الكوارث: "⚠",
  };

  return (
    <motion.div
      className="App"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ScrollProgress style={{ scaleX: scrollYProgress }} />
      <BreakingNewsTicker />

      <div className="container-fluid px-lg-5">
        <div className="row mt-4">
          {/* Main Content */}
          <div className="col-lg-8">
            {loading ? (
              <LoadingSpinner>جاري تحميل الأخبار...</LoadingSpinner>
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
              categories.map((category) => {
                const filteredNews = news.filter(
                  (item) => item.category === category
                );
                return (
                  filteredNews.length > 0 && (
                    <NewsSectionWrapper
                      key={category}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                    >
                      <div className="section-header">
                        <Link to={`/category/${category}`}>
                          {categoryIcons[category]} {category}
                        </Link>
                      </div>

                      <div className="row g-4 p-3">
                        {filteredNews.slice(0, 2).map((item) => (
                          <NewsCard
                            key={item._id}
                            className="col-md-6"
                            variants={hoverVariants}
                            whileHover="hover"
                          >
                            <motion.div
                              className="card"
                              whileHover={{
                                scale: 1.03,
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                              }}
                            >
                              <div className="card-img-container">
                                <motion.img
                                  src={item.image}
                                  alt={item.title}
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <div className="card-body">
                                <p className="mb-2">{item.title}</p>
                                <Link to={`/news/${item._id}`} className="read-more">
                                  اقرأ المزيد →
                                </Link>
                              </div>
                            </motion.div>
                          </NewsCard>
                        ))}
                      </div>
                    </NewsSectionWrapper>
                  )
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 mt-lg-0 mt-4">
            <SidebarWrapper>
              <motion.div
                className="bg-white p-3 rounded-3 shadow-sm"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3
                  className="h4 fw-bold text-center mb-4"
                  style={{ color: "#4c8565" }}
                >
                  📌 آخر الأخبار
                </h3>

                {loading ? (
                  <LoadingSpinner>جاري تحميل الأخبار...</LoadingSpinner>
                ) : error ? (
                  <ErrorMessage>{error}</ErrorMessage>
                ) : (
                  news.slice(0, 4).map((item) => (
                    <motion.div
                      key={item._id}
                      className="sidebar-card card mb-3 bg-light"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            src={item.image}
                            className="w-100 h-100"
                            alt={item.title}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body py-2">
                            <p className="card-text">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </SidebarWrapper>
          </div>
        </div>
      </div>

      <ProfitSystem />
      <ArticlesGrid />
    </motion.div>
  );
};

export default NewsPage;