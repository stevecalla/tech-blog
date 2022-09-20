const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedPaintings = require('./paintingData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');
const seedUsers = require('./userData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedPaintings();

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
