import z from "zod";
import type { FastifyTypedInstance } from "./types";

interface User{
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
  app.get('/users', {
    schema: {
      tags: ['users'],
      description: "Puxa todos os usuários",
        response: {
            200: z.array(z.object({
                id: z.string().uuid(),
                name : z.string(),
                email: z.string(),
            }))
        }
    },
  }, () => {
    return []
  })


  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      response: {
        201: z.null().describe('Usuário criado com sucesso'),
    },
  }
}, async (request, reply) => {
    const { name, email } = request.body

    users.push({ id: crypto.randomUUID(), name, email})

    return reply.status(201).send();
  })
}