const { Post } = require('../models');

const postdata = [
  {

    title: 'Cosmos Flowers 1',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 2',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 3',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 4',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 5',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 6',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 7',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 8',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers 9',
    content: 'Branches with pink apricot blossoms against a blue background.',
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
