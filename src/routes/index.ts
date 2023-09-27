import { FastifyInstance, RouteOptions } from 'fastify';
import { healthCheckRoute } from './health-check';
import { routersRoutes } from './ssh';

const routes: RouteOptions[] = [
  healthCheckRoute,
  ...routersRoutes
];

export const registerRoutes = (server: FastifyInstance) => {
  server.log.warn('Registering routes');

  routes.map(route => {
    server.route(route);
  });
};
