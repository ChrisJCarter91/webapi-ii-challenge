const express = require('express');

const db = require('./db');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: 'There was an error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post && post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the requested post',
    });
  }
});

router.post('/:id/comments', (req, res) => {
    if (!isValidComment(req.body)) {
      res.status(400).json({
        message: 'Please include post_id and text',
      });
    } else {
      db.insertComment(req.body)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await db.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({
        message: 'The post you want to update cannot be found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error updating the post',
    });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const postId = await db.remove(req.params.id);
      if (postId > 0) {
        res.status(200).json({
          message: 'This post was successfully deleted',
        });
      } else {
        res.status(404).json({
          message: 'The post you want to delete cannot be found',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'There was an error deleting the post',
      });
    }
  });
  
  const isValidComment = comment => {
    const { post_id, text } = comment;
  
    return post_id && text;
  };

module.exports = router;