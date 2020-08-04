import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Warning from './components/Warning'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [warning, setWarning] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      blogs.sort((first, second) => {
        return second.likes - first.likes
      })
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setWarning('wrong username or password')
      setTimeout(() => {
        setWarning(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <Togglable label="login">
      <LoginForm 
        login={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable label="new blog">
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const addLike = (event) => {
    event.preventDefault()
    const blogId = event.target.attributes.blog.value
    blogService
      .getBlog(blogId)
      .then(result => {
        const updatedBlog = { ...result, likes: result.likes + 1 }
        blogService
          .update(blogId, updatedBlog)
          .then(returnedBlog => {
            let newBlogs = [...blogs]
            newBlogs.forEach(blog => {
              if (blog.id === returnedBlog.id) {
                newBlogs[newBlogs.indexOf(blog)] = returnedBlog
              }
            })
            setBlogs(newBlogs)
          })
      })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    const blogId = event.target.attributes.blog.value

    blogService
      .getBlog(blogId)
      .then(result => {
        if (window.confirm(`Remove blog ${result.title} by ${result.author}`)) {
          blogService
            .remove(blogId)
            .then(() => {
              blogService.getAll().then(blogs =>{
                blogs.sort((first, second) => {
                  return second.likes - first.likes
                })
                setBlogs( blogs )
              })  
            })
        }
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Warning message={warning} />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogForm()}
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
        )}
      </div>
    )
  }
}

export default App