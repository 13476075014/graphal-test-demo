const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  # 写和改数据
  type Mutation {
    addBook(title: String!, author: String!): Book
  }
  
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
/**对实际数据从哪儿来的做处理 */
const resolvers = {
  /**对数据查询的处理 */
  Query: {
    books: () => books,
  },
  /**对数据更改的处理 */
  Mutation:{
    /**
     * parent, args, context, info 一共接收四个参数
     * 参考：https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
     * @param {*} parent 
     * @param {*} args 
     */
    addBook:(root,{title, author})=>{
      books.push({title, author})
      return {title, author}
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  debug: false,
  context: (req) => ({ //上下文，类似于全局变量使用
    authScope: (req.headers&&req.headers.authorization)||''
  }),
  formatError: error => {
    console.log(error);
    return new Error('Internal server error');
  },
 });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

