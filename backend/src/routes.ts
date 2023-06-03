import {z} from 'zod';
import {prisma} from './lib/prisma';
import { FastifyInstance } from 'fastify';

export async function AppRoutes(server: FastifyInstance){
    server.get('/messages', async () => {
        const messages = await prisma.message.findMany()
        return messages
    })
}