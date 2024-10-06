const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.length === 0 ? null : blogs.reduce((a, b) => a.likes > b.likes ? a : b)

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    else {
        const authors = _.countBy(blogs, 'author')
        const most_auth = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
        return {
            author: most_auth,
            blogs: authors[most_auth]
        }
    }
}

const mostLiked = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    else {
        const authorsLikes = blogs.reduce((result, blog) => {
            if (result[blog.author]) {
                return {
                    ...result,
                    [blog.author]: result[blog.author] + blog.likes
                }
            }
            else {
                return {
                    ...result,
                    [blog.author]: blog.likes
                }
            }
        }, {})

        const mostLikedAuthor = Object.keys(authorsLikes).reduce((a, b) => authorsLikes[a] > authorsLikes[b] ? a : b)
        return {
            author: mostLikedAuthor,
            likes: authorsLikes[mostLikedAuthor]
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}
