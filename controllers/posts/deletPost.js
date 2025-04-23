import Post from "../../models/post.js";

const deletePost = async (req, res) => {
  try {
    // Retrieve the post id from the request parameters
    const { id } = req.params;

    // Find the post by its id and delete it
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Optionally, log the deletion or handle related data

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default deletePost;
