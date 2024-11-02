const { Post } = require('../models');

module.exports.getPosts = async (req, res, next) => {
  try {
    // links:
    // - https://mongoosejs.com/docs/populate.html
    // - https://mongoosejs.com/docs/api/model.html#Model.populate()
    // populate працює як SQL LEFT JOIN:
    // зліва Post, справа модель, що вказана в userId.ref
    const foundPosts = await Post.find().populate('userId');
    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};
