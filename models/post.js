const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: 5,
    },
    userId: {
      type: mongoose.ObjectId,
      // властивість ref -- посилання на іншу модель
      /* подібна зовнішньому ключу, але нема проверки обмежень цілістності,
         тобто не заважає створенню поста для неіснуючого юзера
      */
      // використовується для метода Post.find().populate('userId'):
      // - find() повертає пости
      // - populate() повертає пости з пов'язаними юзерами
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true, // додавання createdAt, updatedAt
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
