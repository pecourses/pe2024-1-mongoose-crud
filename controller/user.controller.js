const createHttpError = require('http-errors');
const { User } = require('../models');
const { default: mongoose } = require('mongoose');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      next(createHttpError(400, 'Bad Request'));
    }

    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const {
    query: { page = 1, results = 10, sort = '_id' },
  } = req;

  // TODO move to middleware
  const limit = results;
  const offset = (page - 1) * limit;

  try {
    const foundUsers = await User.find()
      .sort({ [sort]: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).send({
      data: foundUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId).lean();

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    // TODO move to middleware
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createHttpError(422, 'Invalid User ID format'));
    }

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUserById = await User.findByIdAndDelete(userId);

    if (!foundUserById) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports.createUserPost = async (req, res, next) => {};

module.exports.getUserPosts = async (req, res, next) => {};
