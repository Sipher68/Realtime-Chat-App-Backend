import { Prisma } from '@prisma/client';
import { CreateUsernameResponse, GraphQLContext } from '../../util/types';

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: 'Not Authorized',
        };
      }

      const { id: userId } = session.user;

      try {
        // Check if username is available
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: 'Username already taken. Try another',
          };
        }

        // Update username
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error) {
        console.log('createUsername error', error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
