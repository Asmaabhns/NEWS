// import News from "../../models/nwes.js";


//  const createNews = async (req, res) => {
//   try {
//     const {userId, title,category,writer,image,content } = req.body;

//   //   if (req.user.role !== "journalist") {
//   //     return res.status(403).json({ success: false, message: "Access Denied. journalist only." });
//   // }

//     if (!userId|| !title || !content || !category || !writer || !image) {
//       return res.status(400).json({ success: false, message: "Title and content are required." });
//     }

// const existingPost = await News.findOne({ title }).exec();
// if (existingPost) {
//   return res.status(400).json({ success: false, message: "A news with this title already exists." });
// }


//     const news = new News({userId, title,category,writer,image,content });
//     const newNews = new News({userId, title,category,writer,image,content ,createdAt: new Date()});
    
//     await news.save();

//     res.status(201).json({ success: true, newNews });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

// export default createNews;
import News from "../../models/nwes.js";

const createNews = async (req, res) => {
  try {
    const { userId, title, category, writer, image, content,region } = req.body;

    // تحقق من البيانات المطلوبة
    if (!userId || !title || !content || !category || !writer || !image || !region) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (userId, title, content, category, writer, image)."
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
      region
 // أو تسيبه و MongoDB هيتعامل معها لو schema معرف فيه timestamps
    });

    await news.save();

    res.status(201).json({ success: true, news });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default createNews;
