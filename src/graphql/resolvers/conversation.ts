import { GraphQLContext } from '../../util/types';

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ) => {
      console.log('Inside conversation mutation', args);
    },
  },
};

export default resolvers;
