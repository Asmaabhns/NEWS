import Post from "../../models/post.js";

 const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied. Admins only." });
  }

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

const existingPost = await Post.findOne({ title }).exec();
if (existingPost) {
  return res.status(400).json({ success: false, message: "A post with this title already exists." });
}


    const post = new Post({ title, content });
    
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default createPost;