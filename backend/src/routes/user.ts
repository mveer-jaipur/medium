import { signinInput, signupInput } from '@100xdevs/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if(!success) {
    c.status(411);
    c.json({
      message: "Please provide correct input"
    })
  }

  try{
    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)

    return c.json({
        jwt: token
    })
  } catch(e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: 'unable to create user'
    })
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const login = await c.req.json();
  const { success } = signinInput.safeParse(login);

  console.log('Test----------', success)

  if(!success) {
    c.status(411);
    return c.json({
      message: "Please provide correct input"
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      username: login.username,
      password: login.password
    }
  });

  if(!user) {
    c.status(403);
    return c.json({error: "user not found"})
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({jwt});
})

