import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  id: 'blogid',
  likes: 8,
  title: 'test title',
  author: 'test author',
  url: 'testUrl',
  user: 'userid',
}

const user = {
  id: 'userid',
  blogs: ['blogid'],
  username: 'testusername',
  name: 'testname',
}

describe('5.13-5.16', () => {
  test('5.13 render title and author', () => {
    const component = render(<Blog blog={blog} />)
    // component.debug()

    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).not.toHaveTextContent('url')
    expect(component.container).not.toHaveTextContent('like')
  })

  test('5.14 render url and likes when click the button', () => {
    const component = render(<Blog blog={blog} user={user} />)
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testUrl')
    expect(component.container).toHaveTextContent(8)
    // component.debug()
  })

  test('5.15 click like twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )

    const showBtn = component.getByText('show')
    fireEvent.click(showBtn)
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('5.16 creating a new blog', () => {
    const newBlog = {
      title: 'newTitle',
      author: 'newAuthor',
      url: 'newUrl',
    }
    const addBlog = jest.fn()
    const component = render(<CreateBlog addBlog={addBlog} />)

    const button = component.getByText('create new')
    fireEvent.click(button)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'newAuthor' },
    })
    fireEvent.change(title, {
      target: { value: 'newTitle' },
    })
    fireEvent.change(url, {
      target: { value: 'newUrl' },
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toMatchObject(newBlog)
  })
})
