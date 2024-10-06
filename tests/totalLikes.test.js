const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/list_helper')
const { dummy_blogs } = require('./data')

describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {

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
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
        
    test('when list has many blogs, equals the likes of that', () => {
        const result = totalLikes(dummy_blogs)
        assert.strictEqual(result, 36)
    })

    test('when list is empty, equals zero', () => {
        const result = totalLikes([])
        assert.strictEqual(result, 0)
    })
})