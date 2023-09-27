import { RouteOptions } from 'fastify';
import { enableRouterRoute } from './enable';
import { disableRouterRoute } from './disable';

export const routersRoutes: RouteOptions[] = [
    enableRouterRoute,
    disableRouterRoute
];
