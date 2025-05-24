// Comment Schema (Mongoose Example)

{
  _id: ObjectId,
  user: {
    _id: ObjectId,
    name: String,
    // ممكن تضيف صورة أو أي بيانات تانية
  },
  content: String, // التعليق نفسه
  replies: [
    {
      _id: ObjectId,
      user: {
        _id: ObjectId,
        name: String,
      },
      content: String, // الرد على التعليق
      createdAt: Date
    }
  ],
  createdAt: Date
}