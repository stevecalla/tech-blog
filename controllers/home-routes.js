const router = require("express").Router();
// const { nextTick } = require('process');
const { Gallery, Painting, Post, Comment, User } = require("../models");
const middleware = require("../utils/auth");

router.get("/login", (req, res) => {
  console.log("login = ", req, req.session);

  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  console.log("signup = ", req.session);

  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// router.get('/posts', middleware, async (req, res) => {
router.get("/", middleware, async (req, res) => {
  // router.get('/posts', (req, res) => {

  console.log("dashboard = ", req.session);

  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;

  // }

  // res.render('posts', {
  //   loggedIn: req.session.loggedIn,
  // });

  console.log("GET ALL POSTS = ", req.session);

  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }]
  });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    console.log(posts);

    // res.render('posts', {
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", middleware, async (req, res) => {
  // router.get('/post/abc', middleware, async (req, res) => {

  // res.render('comment', {
  //   loggedIn: req.session.loggedIn,
  // });

  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }]
  });

    const posts = dbPostData.get({ plain: true });

    console.log('post by id = ', posts);

    res.render("comment", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/posts", middleware, async (req, res) => {
  console.log("dashboard = ", req.session);

  // req.session.save(() => {
  //   req.session.dashboard = true;
  // });

  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }]
  });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    console.log(posts);

    // res.render('posts', {
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      dashboard: req.session.dashboard,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/comment", middleware, async (req, res) => {
  console.log("comment = ", req.session);

  // CREATE new comment
  console.log(req.body);

  try {
    const dbCommentData = await Comment.create({
      content: req.body.comment,
      user_id: req.session.userId,
      post_id: req.body.postId,
    });

    // console.log('1 ====== HHHHHHHHHHHHHHHHHH')

    res.status(200).json(dbCommentData);

    // console.log('2 ====== HHHHHHHHHHHHHHHHHH')
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/comment/:id", middleware, async (req, res) => {
  console.log("AAAAAAAAAAAAA =====", req.params);

  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, where: { user_id: req.session.userId }, include: { model: User } }, { model: User }],
    });

    const posts = dbPostData.get({ plain: true });
    const comments = posts.comments;

    console.log(posts, comments);
    // console.log(posts.comments);

    res.render("commentSaved", {
      posts,
      comments,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user-posts/", middleware, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
      where: { user_id: req.session.userId }
    });

    req.session.save(() => {
      req.session.dashboard = true;
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    console.log(posts);

    res.render("userPosts", { 
      posts, 
      loggedIn: req.session.loggedIn,
      dashboard: req.session.dashboard = true,
    });

  } catch (err) {
    console.log(err);
    console.log('--------HHHHHHHHHHHHHHH---------')
    res.status(500).json(err);
  }
});

router.get("/create-posts/", middleware, async (req, res) => {
  res.render("createPost", {
    loggedIn: req.session.loggedIn ,
    dashboard: req.session.dashboard = true,
  });
});

router.get("/update-posts/:id", middleware, async (req, res) => {

  console.log('update post id AAAA = ', req.params.id);

  try{ 
    const postData = await Post.findByPk(req.params.id);
    
    if(!postData) {
        res.status(404).json({message: 'No post with this id!'});
        return;
    };

    const post = postData.get({ plain: true });

    console.log('update post data = ', post);

    res.render('updatePost', {
      post,
      loggedIn: req.session.loggedIn,
      dashboard: req.session.dashboard = true,
    });

  } catch (err) {
      res.status(500).json(err);
  }; 
});

router.post('/create-post', async (req, res) => {

  console.log('create post = ', req.body);

  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/update/:id", middleware, async (req, res) => {

  console.log('update put id = ', req.params.id);

  // res.send('hello')

  try {
    const updatedPost = await Post.update({ title: req.body.title, content: req.body.content }, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedPost || updatedPost[0] === 0) {
      res.status(404).json({ message: 'Can\'t update. No product found with that id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", middleware, async (req, res) => {

  console.log('update delete id = ', req.params.id);

  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedPost || deletedPost[0] === 0) {
      res.status(404).json({ message: 'Can\'t delete. No product found with that id!' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
