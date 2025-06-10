import Post from "../../models/nwes.js";

export const getNews = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
    if (!posts.length) {
      return res.status(404).json({ success: false, message: "No posts found." });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

export const getNewsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId });
    if (!posts.length) {
      return res.status(404).json({ success: false, message: "لا توجد أخبار لهذا المستخدم." });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("خطأ في getNewsByUserId:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب الأخبار." });
  }
};
