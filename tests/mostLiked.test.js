const { test, describe } = require('node:test')
const assert = require('node:assert')
const initialBlogs = require('./data')
const { mostLiked } = require('../utils/list_helper')

describe('most liked', () => {
    test('when the list is empty, it is null', () => {
        const result = mostLiked([])
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog, it is the author of that', () => {
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
        const result = mostLiked(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('when list has many blogs, it returns the author with most', () => {
        const result = mostLiked(initialBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})