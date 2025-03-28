import express from 'express';
import { userRouter } from './router/userRouter';

const app = express()
const port = 3000

app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/zap', userRouter)



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
// Compare this snippet from primary_backend/src/router/userRouter.ts: