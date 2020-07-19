const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Blog Post 1',
      author: 'Author 1',
      url: 'http://blog.com/1',
      likes: 5,
      userId: "5f129bddb23dc71cec111201"
    },
    {
        title: 'Blog Post 2',
        author: 'Author 1',
        url: 'http://blog.com/2',
        likes: 9,
        userId: "5f129bddb23dc71cec111201"
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}