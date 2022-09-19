const { Comment } = require('../models');

const commentdata = [
  {
    content: 'Cosmos Flowers 1',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'Cosmos Flowers 2',
    user_id: 2,
    post_id: 2,
  },
  {
    content: 'Cosmos Flowers 3',
    user_id: 3,
    post_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
