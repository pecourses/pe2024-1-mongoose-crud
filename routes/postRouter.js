const { Router } = require('express');
const { postController } = require('../controller');

const postRouter = Router();

postRouter.get('/', postController.getPosts);

module.exports = postRouter;
