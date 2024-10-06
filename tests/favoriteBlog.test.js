const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/list_helper')
const { dummy_blogs } = require('./data')

describe('favorite blog', () => {
    test('when list has only one blog, it is the favorite', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]
        const fav_blog = favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(fav_blog, listWithOneBlog[0])
    })

    test('when list has many blogs, it returns the favorite', () => {
        const fav_blog = favoriteBlog(dummy_blogs)
        assert.deepStrictEqual(fav_blog, dummy_blogs[2])
    })

    test('when list is empty, it is null', () => {
        const fav_blog = favoriteBlog([])
        assert.deepStrictEqual(fav_blog, null)
    })
})
