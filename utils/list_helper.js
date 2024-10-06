const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.length === 0 ? null : blogs.reduce((a, b) => a.likes > b.likes ? a : b)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}