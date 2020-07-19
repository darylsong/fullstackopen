var lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
  
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (firstItem, secondItem) => {
        if (secondItem.likes > firstItem.likes) {
            return secondItem
        } else {
            return firstItem
        }
    }

    return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
    const authorBlogCount = lodash.countBy(blogs.map(blog => blog.author))

    let currentHighest = 0
    let authorHighest = ''

    Object.values(authorBlogCount).forEach(count => {
        if (count > currentHighest) {
            currentHighest = count
            authorHighest = Object.keys(authorBlogCount)[Object.values(authorBlogCount).indexOf(count)]
        }
    })

    return { author: authorHighest, blogs: currentHighest }
}

const mostLikes = (blogs) => {
    const authorLikesCount = lodash(blogs).groupBy('author').map((blogObject, author) => {
        return {
            author: author,
            likes: lodash.sumBy(blogObject, "likes")
        }
    }).value()

  const mostLikedAuthor = lodash.maxBy(authorLikesCount, "likes");
  return mostLikedAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}