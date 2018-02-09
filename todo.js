var graphql = require('graphql')

var TODOs = [
  {
    'id': 1,
    'title': 'Read emails',
    'completed': false
  },
  {
    'id': 2,
    'title': 'Buy orange',
    'completed': true
  }
]

var TodoType = new graphql.GraphQLObjectType({
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLInt
      },
      title: {
        type: graphql.GraphQLString
      },
      completed: {
        type: graphql.GraphQLBoolean
      }
    }
  }
})

var queryType = new graphql.GraphQLObjectType({
  name: 'TodoQuery',
  fields: function () {
    return {
      todos: {
        type: new graphql.GraphQLList(TodoType),
        resolve: function () {
          return TODOs
        }
      },

      todo: {
        type: TodoType,
        args: {
          id: {
            type: graphql.GraphQLNonNull(graphql.GraphQLInt)
          }
        },
        resolve: (root, { id }) => {
          return new Promise(resolve => {
            for (var i = 0; i < TODOs.length; i++) {
              if (TODOs[i].id === id) return resolve(TODOs[i])
            }
            return resolve(null)
          })
        }
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: queryType
})
