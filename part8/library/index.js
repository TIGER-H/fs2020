const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken')
const config = require('./config')

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      return await Book.find(filter).populate('author', { name: 1 })
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.collection.countDocuments({ author: ObjectId(root.id) })
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        // not exist, add new author
        author = Author({
          name: args.author,
        })
        try {
          author.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          })
        }
      }
      // author existed, add new book
      const book = new Book({
        ...args,
        author,
      })
      try {
        await book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        error.message,
          {
            invalidArgs: args,
          }
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'good')
        throw new UserInputError('wrong credentials')
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      // .populate(
      //   'username'
      // )
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
