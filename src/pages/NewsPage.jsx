import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "../components/contaextApi/RegionContext";
import CopyLinkButton from "./CopyLinkButton";
import { SearchContext } from "../components/contaextApi/searchContext";

function NewsPage() {
  const [sportsNews, setSportsNews] = useState([]);
  const { region } = useRegion();
  const { searchTerm } = useContext(SearchContext);
  const [likedPosts, setLikedPosts] = useState({});
  // الحصول على userId من localStorage
  const userId = window.localStorage.getItem("id");

  // عند تحميل الأخبار، نهيء حالة الإعجاب بناءً على وجود userId في likes
  useEffect(() => {
    if (!region) return;

    const fetchNews = async () => {
      try {
        const response = await instacAxios.get("/api/news");
        let filtered = response.data.posts.filter(
          (news) => news.region === region
        );

        if (searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (news) =>
              news.title.toLowerCase().includes(searchLower) ||
              news.content.toLowerCase().includes(searchLower)
          );
        }

        setSportsNews(filtered);

        // تحديث حالة الإعجاب فقط إذا userId موجود
        if (userId) {
          const likesMap = {};
          filtered.forEach((item) => {
            likesMap[item._id] = item.likes?.includes(userId);
          });
          setLikedPosts(likesMap);
        } else {
          // إذا لا يوجد userId، لا يمكن الإعجاب
          setLikedPosts({});
        }
      } catch (error) {
        console.error("خطأ في جلب الأخبار:", error);
      }
    };

    fetchNews();
  }, [region, searchTerm, userId]);

  // دالة التعامل مع الإعجاب مع تحقق من وجود userId
  const handleLike = async (postId) => {
    if (!userId) {
      alert("يجب تسجيل الدخول لكي تتمكن من الإعجاب.");
      return;
    }

    try {
      const response = await instacAxios.post(`/api/news/${postId}/like`, { userId });
      // تحديث الأخبار والإعجابات بناءً على الرد من السيرفر
      const updated = sportsNews.map((news) =>
        news._id === postId ? { ...news, likes: response.data.likes } : news
      );
      setSportsNews(updated);

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (err) {
      console.error("خطأ في الإعجاب:", err);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      <motion.div>
        <HeaderTwo links={[{ label: "الصفحة الرئيسية", href: "/" }]} />
      </motion.div>

      {/* باقي الكود كما هو، مع زر الإعجاب */}
      <div className="container py-5">
        <motion.div className="row g-4">
          {sportsNews.length === 0 ? (
            <div className="col-12 text-center">
              <div className="alert alert-info">
                لا توجد أخبار مطابقة لبحثك في منطقة <strong>{region}</strong>.
              </div>
            </div>
          ) : (
            sportsNews.map((news) => (
              <div key={news._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  {/* بطاقة الأخبار */}
                  <img src={news.image} alt={news.title} className="img-fluid" />
                  <div className="card-body">
                    <h5>{news.title}</h5>
                    <p>{news.content.slice(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/details/${news._id}`} className="btn btn-sm btn-success">
                        اقرأ المزيد
                      </Link>
                      <small>قلم: {news.writer}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className={`btn btn-sm ${likedPosts[news._id] ? "btn-danger" : "btn-outline-danger"}`}
                      >
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <span>{news.likes?.length || 0} إعجاب</span>
                    </div>
                    <CopyLinkButton postId={news._id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewsPage;
