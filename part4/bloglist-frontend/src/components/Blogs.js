import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBLog, updateBlog } from '../reducer/blogReducer'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  // const addLike = () => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   }
  //   // updateBlog(updatedBlog, blog.id)
  //   console.log(updatedBlog)
  //   dispatch(updateBlog(updatedBlog))
  // }

  return (
    <div>
      <h2>blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell>
                <b>Author</b>
              </TableCell>
            </TableRow>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
