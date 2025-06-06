import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instacAxios from "../components/Axios/Axios";
import HeaderTwo from "../components/HeaderTwo";

function NewsDetails() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const userId = window.localStorage.getItem("id") || "defaultUserId";

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const response = await instacAxios.get(`/api/news`);
        const post = response.data.posts.find(p => p._id === id);
        if (post) {
          setNewsItem(post);
          setLikesCount(post.likes?.length || 0);
          setLiked(post.likes?.includes(userId));
        } else {
          console.error("خبر غير موجود");
        }
      } catch (err) {
        console.error("خطأ في جلب تفاصيل الخبر:", err);
      }
    };

    fetchSingleNews();
  }, [id, userId]);

  const handleLike = async () => {
    try {
      await instacAxios.put(`/api/news/${id}/like`, { userId });

      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked(!liked);
    } catch (err) {
      console.error("فشل في تسجيل الإعجاب", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: newsItem.title,
          url: window.location.href,
        })
        .catch((error) => console.error("خطأ في المشاركة:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط للمشاركة");
    }
  };

  if (!newsItem) return <p className="text-center mt-5">جاري تحميل الخبر...</p>;

  return (
    <div className="container mt-4 text-center">
      <HeaderTwo links={[{ label: "العودة", href: "/" }]} />
      <h2 className="fw-bold mb-3">{newsItem.title}</h2>
      <img
        src={newsItem.image}
        alt={newsItem.title}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{newsItem.content}</p>
      <p className="text-muted mt-3">
        كاتب الخبر: {newsItem.writer} | التاريخ:{" "}
        {new Date(newsItem.createdAt).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="d-flex gap-3 mt-4">
        <button
          onClick={handleLike}
          className={`btn btn-sm ${liked ? "btn-success" : "btn-outline-success"}`}
        >
          {liked ? "❤️" : "🤍"} إعجاب ({likesCount})
        </button>

        <button onClick={handleShare} className="btn btn-sm btn-outline-primary">
          مشاركة
        </button>
      </div>
    </div>
  );
}

export default NewsDetails;
