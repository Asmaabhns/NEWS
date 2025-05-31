import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instacAxios from "../components/Axios/Axios";
import HeaderTwo from "../components/HeaderTwo";

function NewsDetails() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const response = await instacAxios.get(`/api/news`);
        const post = response.data.posts.find(p => p._id === id);
        setNewsItem(post);
      } catch (err) {
        console.error("خطأ في جلب تفاصيل الخبر:", err);
      }
    };

    fetchSingleNews();
  }, [id]);

  if (!newsItem) return <p className="text-center mt-5">جاري تحميل الخبر...</p>;

  return (
    <div className="container mt-4">
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
    </div>
  );
}

export default NewsDetails;
