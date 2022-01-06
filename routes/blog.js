const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blogController');
const is_auth = require('../middlewares/is_auth');

router.get('/post',  blogController.showPosts);
router.post('/post/create', blogController.createPost);
router.put('/post/:postId', blogController.editPost);
router.delete('/post/:postId', blogController.deletePost);
module.exports = router;