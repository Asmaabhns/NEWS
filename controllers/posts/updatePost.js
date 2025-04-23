import Post from "../../models/post.js";

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied. Admins only." });
    }

    // Validate title and content
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    // Find the post by id and update it
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content }, // The fields to update
      { new: true } // This ensures the updated post is returned
    );

    // If the post doesn't exist, return a 404 error
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Return the updated post
    res.status(200).json({ success: true, message: "Post updated successfully", post });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default updatePost;
