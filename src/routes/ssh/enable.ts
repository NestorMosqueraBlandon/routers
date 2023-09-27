import { RouteOptions } from 'fastify';
import { handler } from '../../business-logic/ssh';

export const enableRouterRoute: RouteOptions = {
  method: 'GET',
  url: '/enable/:ip',
  handler: async (request, reply) => {
    try{
        const { params } = request;
        const { ip } = params as { ip: string };
        await handler('enable', ip);
        reply.status(200).send({message: 'OK'});
    }catch(err){
        reply.status(500).send(err);
    }
  },
};
