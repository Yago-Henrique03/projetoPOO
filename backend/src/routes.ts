import {z} from 'zod';
import {prisma} from './lib/prisma';
import { FastifyInstance } from 'fastify';

export async function AppRoutes(server: FastifyInstance){
    server.get('/messages', async () => {
        const messages = await prisma.message.findMany()
        return messages
    })
    
    server.get('/messages/:id', async (req) => {
        const idParam = z.object({
            id: z.string().uuid()
        });

        const {id} = idParam.parse(req.params);
        const message = prisma.message.findFirst({
            where: {
                id
            }
        })
        return message
    })

    server.post('/message', async (req) => {
        const messageBody = z.object({
            title: z.string(),
            content: z.string(),
        });

        const { title, content } = messageBody.parse(req.body);

        const newMessage = prisma.message.create({
            data: {
                title: title,
                content: content,
                published: true,
                qtdeLikes: 0
            }
        })

        return newMessage
    })

    server.patch('/message/addLikes', async (req) => {
        const likesBody = z.object({
            id: z.string().uuid(),
            qtdeLikes: z.number(),
        });

        const { id, qtdeLikes } = likesBody.parse(req.body);

        const likesAdded = await prisma.message.update({
            where: {
                id
            },
            data: {
                qtdeLikes: {
                    increment: qtdeLikes
                }
            }
        });

        return likesAdded
    })

    server.patch('/message/remLikes', async (req) => {
        const removelikesBody = z.object({
            id: z.string().uuid(),
            qtdeLikes: z.number(),
        });

        const { id, qtdeLikes } = removelikesBody.parse(req.body);

        const resp = await prisma.message.updateMany({
            where: {
                id: id,
                qtdeLikes: {
                    gte: qtdeLikes
                }
            },
            data: {
                qtdeLikes: {
                    decrement: qtdeLikes
                }
            }
        })
        if(resp.count >= 1){
            let aux = {
                "status": "Venda realizada com sucesso"
            }
            return aux;
        }
        else {
            let aux = {
                "status": "Não é possivel retirar mais likes"
            }
            return aux;
        }
    })

    server.put('/message/:id', async (req) => {
        const idParam = z.object({
            id: z.string().uuid()
        });

        const putBody = z.object({
            title: z.string(),
            content: z.string(),
            published: z.boolean()
        });

        const { id } = idParam.parse(req.params)

        const { title, content, published } = putBody.parse(req.body)

        const messageUpdated = await prisma.message.update({
            where: {
                id: id
            },
            data: {
                title,
                content,
                published
            }
        })

        return messageUpdated
    })

    server.delete('/message/:id', async (req) => {
        const idParam = z.object({
            id: z.string().uuid()
        })

        const { id } = idParam.parse(req.params);

        const messageRemoved = await prisma.message.delete({
            where: {
                id
            }
        })

        return messageRemoved
    })
}