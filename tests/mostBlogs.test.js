const {test, describe} = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')
const initialBlogs = require('./data')

describe('most blogs', () => {
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
        const result = mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('when list has many blogs, it returns the author with most', () => {
        const result = mostBlogs(initialBlogs)
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })

    test('when list is empty, it is null', () => {
        const result = mostBlogs([])
        assert.deepStrictEqual(result, null)
    })
})
