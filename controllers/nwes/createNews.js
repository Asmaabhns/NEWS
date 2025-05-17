import News from "../../models/nwes.js";

 const createNews = async (req, res) => {
  try {
    const { title,classification,Writer,image,content } = req.body;

    if (req.user.role !== "journalist") {
      return res.status(403).json({ success: false, message: "Access Denied. journalist only." });
  }

    if (!title || !content || !classification || !Writer || !image) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

const existingPost = await News.findOne({ title }).exec();
if (existingPost) {
  return res.status(400).json({ success: false, message: "A news with this title already exists." });
}


    const news = new News({ title,classification,Writer,image,content });
    
    await news.save();

    res.status(201).json({ success: true, news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default createNews;