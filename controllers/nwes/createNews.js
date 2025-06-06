import News from "../../models/nwes.js";

const createNews = async (req, res) => {
  try {
    const { userId, title, category, writer, image, content, region, isBreaking = false } = req.body;

    // تحقق من البيانات المطلوبة
    if (!userId || !title || !content || !category || !writer || !image || !region) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (userId, title, content, category, writer, image, region)."
      });
    }

    // تحقق من عدم تكرار العنوان
    const existingPost = await News.findOne({ title }).exec();
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: "A news post with this title already exists."
      });
    }

    // إنشاء الخبر
    const news = new News({
      userId,
      title,
      category,
      writer,
      image,
      content,
      region,
      isBreaking // ✅ إضافة الحالة "عاجل"
    });

    await news.save();

    res.status(201).json({ success: true, news });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default createNews;
