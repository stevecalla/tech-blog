const router = require('express').Router();
const { nextTick } = require('process');
const { Gallery, Painting } = require('../models');
// TODO: Import the custom middleware
const middleware = require("../utils/auth");

// GET all galleries for homepage
router.get('/', async (req, res) => {

  console.log('GET ALL = ', req.session);

  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// TODO: Replace the logic below with the custom middleware
router.get('/gallery/:id', middleware, async (req, res) => {
  // section middleware in above line replaces original if else logic
  // middleware(req, res); //section also did it this way

  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });
    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

// GET one painting
// TODO: Replace the logic below with the custom middleware
router.get('/painting/:id', middleware, async (req, res) => {
  // section middleware in above line replaces original if else logic

  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  console.log('login = ', req.session);

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

  console.log('signup = ', req.session);

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/posts', middleware, (req, res) => {
// router.get('/posts', (req, res) => {

  console.log('dashboard = ', req.session);

  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;
    
  // }

  res.render('posts', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
