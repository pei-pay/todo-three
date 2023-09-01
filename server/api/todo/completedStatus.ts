import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  if (event.node.req.method === 'PUT') {
    const body = await readBody(event);
    const newTodo = await prisma.todo.update({
      where: {
        id: Number(body.id),
      },
      data: {
        isCompleted: body.isCompleted,
      },
    });
    return newTodo;
  }
});