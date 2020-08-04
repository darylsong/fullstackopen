import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('5.13 Blog renders title and author, but not url or number of likes', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test URL',
        likes: 5,
        user: { name: 'name' }
    }

    const user = {
        name: 'name'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    expect(component.container).toHaveTextContent(
        'Test blog'
    )

    expect(component.container).toHaveTextContent(
        'Test author'
    )

    expect(component.container).not.toHaveTextContent(
        'Test URL'
    )

    expect(component.container).not.toHaveTextContent(
        '5'
    )
})

test('5.14 Blog renders url and number of likes after button controlling shown details is clicked', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test URL',
        likes: 5,
        user: { name: 'name' }
    }

    const user = {
        name: 'name'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'Test URL'
    )

    expect(component.container).toHaveTextContent(
        '5'
    )
})

test('5.15 if liked button is clicked twice, even handler is called twice', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test URL',
        likes: 5,
        user: { name: 'name' }
    }

    const user = {
        name: 'name'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})