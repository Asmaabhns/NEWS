import News from "../../models/nwes.js";

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(id, req.body, { 
      new: true,
      runValidators: true 
    });
    
    if (!updatedNews) {
      return res.status(404).json({ success: false, message: "News not found" });
    }
    
    res.json({ 
      success: true, 
      message: "News updated successfully",
      news: updatedNews 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export default updateNews;