const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('4.8 application returns correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('4.9 id for all blog posts is defined', async () => {
    const response = await api.get('/api/blogs')
  
    await response.body.forEach(item => {
        expect(item.id).toBeDefined()
    })
})

test('4.10 a valid blog post can be added', async () => {
    const newBlog = {
        title: 'Blog Post 3',
        author: 'Author 1',
        url: 'http://blog.com/3',
        likes: 7
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZjEyOWJkZGIyM2RjNzFjZWMxMTEyMDEiLCJpYXQiOjE1OTUwNjM1Nzh9.CIAms1yPwQJSmvLmE9alq58chCjqyW3CBNi4HQLnaV0' })
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Blog Post 3'
    )
})

test('4.11 likes are defined', async () => {
    const response = await api.get('/api/blogs')
  
    await response.body.forEach(item => {
        expect(item.likes).toBeDefined()
    })
})


test('4.12 backend returns status code 400 if title/url are missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const firstNewBlog = {
        author: 'Author 1',
        url: 'http://blog.com/4',
        likes: 7,
        userId: "5f129bddb23dc71cec111201"
    }
    
    await api
        .post('/api/blogs')
        .send(firstNewBlog)
        .set({ Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZjEyOWJkZGIyM2RjNzFjZWMxMTEyMDEiLCJpYXQiOjE1OTUwNjM1Nzh9.CIAms1yPwQJSmvLmE9alq58chCjqyW3CBNi4HQLnaV0' })
        .expect(400)
    

    const secondNewBlog = {
        title: 'Blog Post 4',
        author: 'Author 1',
        likes: 7,
        userId: "5f129bddb23dc71cec111201"
    }
    
    await api
        .post('/api/blogs')
        .send(secondNewBlog)
        .set({ Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZjEyOWJkZGIyM2RjNzFjZWMxMTEyMDEiLCJpYXQiOjE1OTUwNjM1Nzh9.CIAms1yPwQJSmvLmE9alq58chCjqyW3CBNi4HQLnaV0' })
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('4.22 adding a blog fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: 'Blog Post 10',
        author: 'Author 2',
        url: 'http://blog.com/10',
        likes: 15
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer 123' })
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})


afterAll(() => {
    mongoose.connection.close()
})