const { test, describe } = require('node:test');
const { strictEqual } = require('node:assert');
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helpers.js');

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d12f8',
      title: 'Velocity of Harmful medication',
      author: 'schneider arjen',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d14f8',
      title: 'Intelligence of generative rag',
      author: 'abdulwahab abbas',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    },
];

test('dummy returns one', () => {
    const blogs = [];
    const result = dummy(blogs);

    strictEqual(result, 1);
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog); 
        strictEqual(result, 22);
    })
})

describe('favorite  blog', () => {
    test('empty list is zero', () => {
        strictEqual(favoriteBlog([]), 0)
    })

    test('highest likes assign to  favorite  blog', () => {
        const result = favoriteBlog(listWithOneBlog);
        strictEqual(result, listWithOneBlog[2])
    })
})