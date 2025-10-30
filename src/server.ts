import 'dotenv/config';
import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, jsonSchemaTransform} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {origin: '*'});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "ING API",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform
})

const port = Number(process.env.PORT);

app.register(fastifySwaggerUi as any, {
    routePrefix: `/docs`,
    swagger: {
        url: '/documentation/json'
    },
    staticCSP: true
} as any)

app.register(routes);

app.listen({ port }).then(() => {
    console.log(`Server is running on ${process.env.URL}:${port}`);
    console.log(`API docs is available at ${process.env.URL}:${port}/docs`);
});