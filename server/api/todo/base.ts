import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  if (event.node.req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    console.debug('Get todos', todos);
    return todos;
  }
  if (event.node.req.method === 'POST') {
    const body = await readBody(event);
    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
        isCompleted: false,
      },
    });
    return newTodo;
  }
  if (event.node.req.method === 'PUT') {
    const body = await readBody(event);
    const newTodo = await prisma.todo.update({
      where: {
        id: Number(body.id),
      },
      data: {
        title: body.title,
      },
    });
    return newTodo;
  }
  if (event.node.req.method === 'DELETE') {
    const body = await readBody(event);
    const newTodo = await prisma.todo.delete({
      where: {
        id: Number(body.id),
      },
    });
    return newTodo;
  }
});