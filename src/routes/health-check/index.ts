import { RouteOptions } from 'fastify';
// @ts-ignore
import { version, name } from '../../../package.json';
export const healthCheckRoute: RouteOptions = {
  method: 'GET',
  url: '/health-check',
  handler: async () => {
    return {
      appName: `${name} Api`,
      appVersion: version,
      status: 'ok',
      uptime: process.uptime(),
    };
  },
};
