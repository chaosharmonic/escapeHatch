#!/usr/bin/env -S deno run --allow-read=. --allow-write=. --allow-env --allow-net --watch

import 'dotenv/load'
import { Application } from 'oak/application'
import { Router } from 'oak/router'
import jobsRouter from './routes/job.js'

const port = Deno.env.get('SERVER_PORT') ||
  3000

const app = new Application()

// TODO: find a better way to specify this, including localhost
app.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  return next()
})

const router = new Router()

router.use('/jobs', jobsRouter.routes())
router.get('/', (ctx) => {
  ctx.response.body = 'good news everyone!'
})

app.use(router.routes())

console.log(`listening on port ${port}`)

app.listen({ port })
