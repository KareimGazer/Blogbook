const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const {initialBlogs, nonExistingId, blogsInDb} = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const BASE_URL = '/api/blogs'

beforeEach(async () => {
  try {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  }
  catch ({ message }) {
    throw new Error(message)
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    // defining the content type as a regex as
    // when using a string, the value of the header must be exactly the same
    // but it could be application/json; charset=utf-8
    .expect('Content-Type', /application\/json/)
})

test('recieved all blogs', async () => {
  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('blogs are from the test data', async () => {
  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map(e => e.title)
  assert(titles.includes('First class tests'))
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "The Best of the best",
    author: "Kisho Tata",
    url: "http://kisho.com",
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  assert(titles.includes('The Best of the best'))
})

test('Blog without a title is not added', async () => {
  const newBlog = {
    author: "Kisho Tata",
    url: "http://kisho.com",
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await blogsInDb()

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length) // remember the before each
})

test('Blog with no like defualts to zero', async () => {
  const newBlog = {
    title: "The Best of the best",
    author: "Kisho Tata",
    url: "http://kisho.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('ID is id not _id', async () => {
  const blogs = await blogsInDb()
  const blog = blogs[0]
  assert('id' in blog)
  assert(!('_id' in blog))
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultBlog = await api
    .get(`${BASE_URL}/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`${BASE_URL}/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
