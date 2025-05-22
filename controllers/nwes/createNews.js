import News from "../../models/nwes.js";

 const createNews = async (req, res) => {
  try {
    const {userId, title,category,writer,image,content } = req.body;

  //   if (req.user.role !== "journalist") {
  //     return res.status(403).json({ success: false, message: "Access Denied. journalist only." });
  // }

    if (!userId|| !title || !content || !category || !writer || !image) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

const existingPost = await News.findOne({ title }).exec();
if (existingPost) {
  return res.status(400).json({ success: false, message: "A news with this title already exists." });
}


    const news = new News({userId, title,category,writer,image,content });
    
    await news.save();

    res.status(201).json({ success: true, news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default createNews;