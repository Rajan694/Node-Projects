import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  enum Status {
    TODO
    IN_PROGRESS
    COMPLETED
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
  }

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: Status!
    priority: Priority!
    dueDate: DateTime
    userId: ID!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type TaskConnection {
    tasks: [Task!]!
    total: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!

    tasks(status: Status, page: Int, limit: Int): TaskConnection!
    task(id: ID!): Task!
  }

  input CreateUserInput {
    email: String!
    password: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    password: String
    name: String
  }

  input CreateTaskInput {
    title: String!
    description: String
    status: Status
    priority: Priority
    dueDate: DateTime
    userId: ID!
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: Status
    priority: Priority
    dueDate: DateTime
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!

    createTask(data: CreateTaskInput!): Task!
    updateTask(id: ID!, data: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Task!
  }
`;

