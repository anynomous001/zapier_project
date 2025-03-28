import { Router } from "express";
import { authmiddleware } from "../middleware/auth";


const router = Router()

router.post('/', authmiddleware, (req, res) => {
    console.log(req.body)
    res.send('Zap received')
})
router.get('/zaps', authmiddleware, (req, res) => {
    console.log(req.body)
    res.send('Zap received')
})
router.get('/:zapId', authmiddleware, (req, res) => {
    console.log(req.body)
    res.send('Zap received')
})




export const zapRouter = router