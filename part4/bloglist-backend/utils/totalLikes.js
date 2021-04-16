const totalLikes = (blogs) => {
    const reducer = (sum, like) => {
        return sum + like
    }
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

module.exports = totalLikes