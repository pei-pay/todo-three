import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  if (event.node.req.method === 'GET') {
    const tasks = await prisma.todo.findMany();

    return tasks;
  }
});