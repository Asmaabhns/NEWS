import News from "../../models/nwes.js"; // تأكد من مسار الموديل

const likeNews = async (req, res) => {
  const { userId } = req.body;
  const newsId = req.params.id;

  try {
    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: "الخبر غير موجود" });

    // Toggle like
    const index = news.likes.indexOf(userId);
    if (index === -1) {
      news.likes.push(userId);
    } else {
      news.likes.splice(index, 1);
    }

    await news.save();

    res.status(200).json({
      likes: news.likes.length,
      likedByUser: index === -1,
    });
  } catch (err) {
    console.error("خطأ في تحديث الإعجابات", err);
    res.status(500).json({ message: "فشل في تحديث الإعجاب" });
  }
};

export default likeNews;
