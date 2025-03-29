import express from 'express';
import { userRouter } from './router/userRouter';
import { zapRouter } from './router/zapRouter';
import cors from 'cors';
import { triggerRouter } from './router/triggerRouter';
import { actionsRouter } from './router/actionsRouter';

const app = express()
const port = 3000
app.use(cors())

app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/zap', zapRouter)
app.use('/api/v1/trigger', triggerRouter)
app.use('/api/v1/actions', actionsRouter)


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
// Compare this snippet from primary_backend/src/router/userRouter.ts: