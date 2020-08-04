import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title,
          author,
          url,
          likes: 0
        })
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>create new</h2>
            title:
            <input id='title' value={title} onChange={({ target }) => setTitle(target.value)}></input>
            <br />
            author:
            <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
            <br />
            url:
            <input id='url' value={url} onChange={({ target }) => setUrl(target.value)}></input>
            <br />
            <button id='submit-button' type="submit">create</button>
        </form>
    )
}

export default BlogForm