import React from "react";
import { useScroll, motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

import myImage from "./images/تنزيل.jpg";
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

const NewsPage = () => {
  const { scrollYProgress } = useScroll();

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
            {["Urgent", "sport", "weather", "disasters", "health"].map(
              (section) => (
                <NewsSectionWrapper
                  key={section}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                >
                  <div className="section-header">
                    <Link to={`${section}`}>
                      {
                        {
                          Urgent: "📰 الأخبار العاجلة",
                          sport: "⚽ الرياضة",
                          weather: "⛅ الطقس",
                          disasters: "⚠ الكوارث",
                          health: "🏥 الصحة",
                        }[section]
                      }
                    </Link>
                  </div>

                  <div className="row g-4 p-3">
                    {[1, 2].map((item) => (
                      <NewsCard
                        key={item}
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
                              src={myImage}
                              alt="خبر عاجل"
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          
                          <div className="card-body">
                            <p className="mb-2">
                              نرسل لحماية 1500 مباراة فريق سلف
                            </p>
                            <Link to="/details" className="read-more">
                              اقرأ المزيد →
                            </Link>
                          </div>
                        </motion.div>
                      </NewsCard>
                    ))}
                  </div>
                </NewsSectionWrapper>
              )
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

                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    className="sidebar-card card mb-3 bg-light"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="row g-0">
                      <div className="col-4">
                        <img
                          src={myImage}
                          className="w-100 h-100"
                          alt="خبر جانبي"
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body py-2">
                          <p className="card-text">
                            ركام كعمانت كبيرة في غزة بسبب الحرب عليها المزيد...
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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

export default NewsPage;
