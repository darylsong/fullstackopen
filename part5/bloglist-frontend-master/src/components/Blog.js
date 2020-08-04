import React, { useState, useEffect } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
    const [visible, setVisible] = useState(false)
    const [canRemove, setCanRemove] = useState(false)

    useEffect(() => {
      if (user.name === blog.user.name) {
        setCanRemove(true)
      } else {
        setCanRemove(false)
      }
    }, [])

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const toggleVisibility = (event) => {
      event.preventDefault()
      setVisible(!visible)
    }
  
    if (!visible) {
      return (
      <div id='hiddenBlog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      )
    } else {
      return (
        <div id='normalBlog' style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button id='like-button' onClick={addLike} blog={blog.id}>like</button>
          <br />
          {blog.user.name}
          <br />
          {canRemove ?
            <div>
              <button id='remove-button' onClick={removeBlog} blog={blog.id}>remove</button>
            </div>
            :
            <div></div> }
          
        </div>
      )
    }
}

export default Blog
