import "dotenv/config";
import fastify from 'fastify'
import fastifyCors from "@fastify/cors";
import { registerRoutes } from "../routes";

const { PORT, HOST } = process.env;

const main = async () => {
    const server = fastify({
        logger: true
    });


  server.register(fastifyCors, {
    origin: "*",
  });

  server.register(
    (instance, options, next) => {
      registerRoutes(instance);
      next();
    },
    { prefix: "api/v1" }
  );
    await server.listen({port: Number(PORT), host: HOST}, (err, address) => {
        console.info(`Backend App is running at http://localhost:${PORT}`);
        console.info("Press CTRL-c to stop");
    });
}

void main();