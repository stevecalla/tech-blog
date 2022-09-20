const router = require("express").Router();
// const { nextTick } = require('process');
const { Gallery, Painting, Post, Comment, User } = require("../models");
const middleware = require("../utils/auth");

// GET all galleries for homepage
// router.get('/', async (req, res) => {

//   console.log('GET ALL = ', req.session);

//   try {
//     const dbGalleryData = await Gallery.findAll({
//       include: [
//         {
//           model: Painting,
//           attributes: ['filename', 'description'],
//         },
//       ],
//     });

//     const galleries = dbGalleryData.map((gallery) =>
//       gallery.get({ plain: true })
//     );

//     console.log(galleries);

//     res.render('homepage', {
//       galleries,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one gallery

// TODO: Replace the logic below with the custom middleware
router.get("/gallery/:id", middleware, async (req, res) => {
  // section middleware in above line replaces original if else logic
  // middleware(req, res); //section also did it this way

  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            "id",
            "title",
            "artist",
            "exhibition_date",
            "filename",
            "description",
          ],
        },
      ],
    });
    const gallery = dbGalleryData.get({ plain: true });
    res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get("/painting/:id", middleware, async (req, res) => {
  // section middleware in above line replaces original if else logic

  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render("painting", { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

  req.session.save(() => {
    req.session.dashboard = true;
  });

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

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    console.log(posts);

    res.render("userPosts", { 
      posts, 
      loggedIn: req.session.loggedIn 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/create-posts/", middleware, async (req, res) => {
  res.render("createPost", {
    loggedIn: req.session.loggedIn 
  });
});

router.get("/update-posts/", middleware, async (req, res) => {
  res.render("updatePost", {
    loggedIn: req.session.loggedIn 
  });
});

module.exports = router;
