const Book = require("./models/Book")
const Author = require("./models/Author")
const User = require("./models/User")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const jwt = require("jsonwebtoken") 
const { GraphQLError, subscribe } = require("graphql")

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {   

      const books = await Book.find({}).populate("author")

      if (!args.author && !args.genre) {
        return books
      }

      if (args.author && args.genre) {
        return books.filter(b => b.author.name === args.author && b.genres.includes(args.genre))
      }

      if (args.author) {
        return books.filter(b => b.author.name === args.author)
      }

      return books.filter(b => b.genres.includes(args.genre))
    },
    allAuthors: async () => {
      return Author.find({}).populate("books")
    },
    genres: async () => {
      const books = await Book.find({})

      const genres = books.map(b => b.genres)

      return [...new Set(genres.flat())]
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("User not logged in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      if (await Book.findOne({ title: args.title })) {
        throw new GraphQLError("Book is already in the library", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author, born: null }) 

        author = await newAuthor.save()
      }

      const newBook = new Book({ ...args, author: author._id })

      const savedBook = await newBook.save()

      // add book to author
      author.books = author.books.concat(savedBook.id)
      
      await author.save()

      pubsub.publish("BOOK_ADDED", { bookAdded: savedBook })

      return await savedBook.populate("author")
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("User not logged in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      return author.save()
    },
    createUser: async (root, args) => {
      if (!args.username || !args.favoriteGenre) {
        throw new GraphQLError("Missing data to register user", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const user = new User({ ...args })

      return user.save()
    },
    login: async (root, args) => {

      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "library1234") {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
    }
  }
}

module.exports = resolvers