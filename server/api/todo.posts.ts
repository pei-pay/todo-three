import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);
  const newTodo = await prisma.todo.create({
    data: {
      title: body.task,
      isCompleted: false,
    },
  });
  return newTodo;
});