import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    authorId: string
  }
}>()

// blogRouter.use('/*',async(c, next) => {
//   const header = await c.req.header("authorization") || "";
//   const token = header.split(" ")[1];
//   const response = await verify(token, c.env.JWT_SECRET);
//   if(response.id) {
//     c.set('authorId', response.id);
//     await next();
//   } else {
//     c.status(403);
//     return c.json({error: "unauthorized"})
//   }
// });


blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try{
       const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId:  c.get('authorId')
            }
        })

        return c.json({id: blog?.id});
    } catch(e) {
        c.status(411);
        return c.json({error: 'Unable to post the blog'});
    }

  
    
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try{
        const blog = await prisma.blog.update({
            where:{
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({id: blog?.id})
    } catch(e) {
        c.status(411);
        return c.json({error: 'Unable to Update the blog'});
    }
  

})

blogRouter.get('/bulk', async(c) => {
     const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
    const blogs =   await prisma.blog.findMany({
        select: {
            content: true,
            id: true,
            title: true,
            author: {
                select: {
                    username: true
                }
            }
        }
    });
  return c.json({blogs})
    } catch(e) {
        c.status(411);
        return c.json({message: 'Unable to fetch blogs posts'})
    }

})

blogRouter.get(':id', async(c) => {
  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = await c.req.param("id");

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id
            }
        })

        return c.json({blog});
    } catch(e) {
        c.status(411);
        return c.json({error: 'Unable to GET the blog'});
    }
})

