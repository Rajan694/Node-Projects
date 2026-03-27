import { GraphQLScalarType, Kind } from 'graphql';
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from '../services/user.service';
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from '../services/task.service';
import { prisma } from '../lib/prisma';
import { AppErrorType } from '../utils/AppError';

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 compliant DateTime scalar',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }
    throw new TypeError('DateTime value is not an instance of Date or string');
  },
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || value instanceof Date) {
      return new Date(value);
    }
    throw new TypeError('DateTime value must be a string or Date');
  },
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new TypeError('DateTime value must be a string');
  },
});

type GraphQLContext = {
  prisma: typeof prisma;
};

export const resolvers = {
  DateTime: DateTimeScalar,

  User: {
    tasks: async (parent: { id: string }, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.task.findMany({ where: { userId: parent.id } });
    },
  },

  Task: {
    user: async (parent: { userId: string }, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.user.findUniqueOrThrow({ where: { id: parent.userId } });
    },
  },

  Query: {
    users: async () => {
      return getAllUsersService();
    },
    user: async (_: unknown, args: { id: string }) => {
      return getUserByIdService(args.id);
    },
    tasks: async (_: unknown, args: { status?: string; page?: number; limit?: number }) => {
      const { status, page, limit } = args;
      const result = await getAllTasksService(status as any, page, limit);
      return result;
    },
    task: async (_: unknown, args: { id: string }) => {
      return getTaskByIdService(args.id);
    },
  },

  Mutation: {
    createUser: async (_: unknown, args: { data: any }) => {
      return createUserService(args.data);
    },
    updateUser: async (_: unknown, args: { id: string; data: any }) => {
      return updateUserByIdService(args.id, args.data);
    },
    deleteUser: async (_: unknown, args: { id: string }) => {
      return deleteUserByIdService(args.id);
    },

    createTask: async (_: unknown, args: { data: any }) => {
      return createTaskService(args.data);
    },
    updateTask: async (_: unknown, args: { id: string; data: any }) => {
      return updateTaskService(args.id, args.data);
    },
    deleteTask: async (_: unknown, args: { id: string }) => {
      return deleteTaskService(args.id);
    },
  },
};

export const formatGraphQLError = (formattedError: any, originalError: unknown) => {
  const appError = originalError as AppErrorType;
  if (appError && typeof appError.statusCode === 'number') {
    return {
      message: appError.message,
      extensions: {
        code: 'APP_ERROR',
        statusCode: appError.statusCode,
        success: appError.success ?? false,
      },
    };
  }

  return formattedError;
};

